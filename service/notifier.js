const { WebSocketServer } = require("ws");
const uuid = require("uuid");
const DB = require("./database.js");
const ICAL = require("ical.js");

function notifier(httpServer) {
  const wss = new WebSocketServer({ noServer: true });

  httpServer.on("upgrade", (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, function done(ws) {
      wss.emit("connection", ws, request);
    });
  });

  let connections = [];

  wss.on("connection", (ws, request) => {
    const cookies = request.headers.cookie
      ?.split("; ")
      .reduce((acc, cookie) => {
        const [key, value] = cookie.split("=");
        acc[key] = value;
        return acc;
      }, {});

    const token = cookies?.token;

    const connection = {
      id: token || uuid.v4(),
      alive: true,
      ws: ws,
    };
    connections.push(connection);
    // Remove the closed connection so we don't try to forward anymore
    ws.on("close", () => {
      const pos = connections.findIndex((o, i) => o.id === connection.id);

      if (pos >= 0) {
        connections.splice(pos, 1);
      }
    });

    // Respond to pong messages by marking the connection alive
    ws.on("pong", () => {
      connection.alive = true;
    });
    notifyUser(connection);
  });

  // Keep active connections alive
  setInterval(() => {
    connections.forEach((c) => {
      // Kill any connection that didn't respond to the ping last time
      if (!c.alive) {
        c.ws.terminate();
      } else {
        c.alive = false;
        c.ws.ping();
      }
    });
  }, 10000);

  // Check for upcoming assignments
  setInterval(async () => notifyUsers(connections), 1000 * 60 * 60);
}

async function notifyUsers(connections) {
  for (let connection of connections) {
    await notifyUser(connection);
  }
}

async function notifyUser(connection) {
  const user = await findUserByToken(connection.id); // Assume `connection.user` contains the user data
  if (!user) return;
  const remainingAssignments = await getUncompletedAssignments(user);

  console.log(
    `Remaining assignments for user ${user.email}: ${remainingAssignments.length}`
  );
  if (remainingAssignments.length === 0) return;
  const message = {
    message: "REMAINING_ASSIGNMENTS",
    remainingAssignments: remainingAssignments,
  };
  connection.ws.send(JSON.stringify(message));
}

async function getUncompletedAssignments(user) {
  let calendars = user.calendars;
  let assignments = [];
  for (let i = 0; i < calendars.length; i++) {
    let calendar = calendars[i];
    let calendarAssignments = await getAssignments(calendar);
    assignments.push(...calendarAssignments);
  }
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  assignments = assignments.filter(
    (assignment) =>
      !user.completedAssignments.includes(assignment.id) &&
      new Date(assignment.dueDate) < new Date()
  );
  return assignments;
}

async function getAssignments(calendar) {
  const response = await fetch(calendar);
  const data = await response.text();
  const jcalData = ICAL.parse(data);
  const component = new ICAL.Component(jcalData);
  if (calendar.startsWith("https://learningsuite.byu.edu")) {
    let assignments = component
      .getAllSubcomponents("vevent")
      .map((assignment) => {
        return {
          dueDate: assignment
            .getFirstPropertyValue("dtstart")
            .toJSDate()
            .toLocaleDateString(),
          classTitle: calendar.class,
          title: assignment.getFirstPropertyValue("summary"),
          id: assignment.getFirstPropertyValue("uid"),
        };
      });
    // Remove duplicate assignments
    assignments = assignments.filter(
      (assignment, index, self) =>
        index === self.findIndex((a) => a.id === assignment.id)
    );
    return assignments;
  } else {
    let assignments = component
      .getAllSubcomponents("vevent")
      .map((assignment) => {
        // Take class name from assignment title
        let assignmentTitle = assignment.getFirstPropertyValue("summary");
        assignmentTitle = assignmentTitle.split("[");
        let className = assignmentTitle.pop();
        // Remove end bracket from class name
        className = className.replace("]", "");
        assignmentTitle = assignmentTitle.join(" ");
        return {
          dueDate: assignment
            .getFirstPropertyValue("dtstart")
            .toJSDate()
            .toLocaleDateString(),
          classTitle: className,
          title: assignmentTitle,
          id: assignment.getFirstPropertyValue("uid"),
        };
      });
    // Remove duplicate assignments
    assignments = assignments.filter(
      (assignment, index, self) =>
        index === self.findIndex((a) => a.id === assignment.id)
    );
    return assignments;
  }
}

async function findUserByToken(token) {
  if (!token) return null;
  return DB.getUserByToken(token);
}

module.exports = { notifier };
