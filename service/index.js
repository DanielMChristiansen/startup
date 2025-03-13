const express = require("express");
const axios = require("axios");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const uuid = require("uuid");
const DB = require("./database.js");

const app = express();
const port = process.argv.length > 2 ? process.argv[2] : 3000;

app.use(express.json());
app.use(cookieParser());

app.use(express.static("public"));

var apiRouter = express.Router();
app.use("/api", apiRouter);

apiRouter.get("/corsbypass", cors(), (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) {
    return res.status(400).send("URL query parameter is required");
  }

  axios
    .get(targetUrl)
    .then((response) => {
      // res.set(response.headers);
      res.send(response.data);
    })
    .catch((error) => {
      res.status(500).send("Error fetching the requested URL");
    });
});

apiRouter.post("/register", async (req, res) => {
  if (await findUser("email", req.body.email)) {
    res.status(400).send("User already exists");
    return;
  }
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = await createUser(req.body.email, hashedPassword);
  await DB.addUser(user);
  setAuthCookie(res, user.token);
  res.send({ user: req.body.email });
});

apiRouter.put("/login", async (req, res) => {
  let user = await findUser("email", req.body.email);

  if (
    user?.password &&
    (await bcrypt.compare(req.body.password, user.password))
  ) {
    user.token = uuid.v4();
    await DB.updateUser(user);
    setAuthCookie(res, user.token);
    res.send({ user: req.body.email });
  } else {
    res.status(401).send("Invalid email or password");
  }
});

// Middleware to verify that the user is authenticated
const verifyAuth = async (req, res, next) => {
  const user = await findUser("token", req.cookies.token);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: "Unauthorized" });
  }
};

apiRouter.delete("/logout", verifyAuth, async (req, res) => {
  let user = await findUser("token", req.cookies.token);

  delete user.token;
  await DB.updateUser(user);
  res.clearCookie("token");
  res.status(204).end();
});

apiRouter.get("/authenticated", verifyAuth, (req, res) => {
  res.send({ authenticated: true });
});

apiRouter.put("/assignmentCompleted", verifyAuth, async (req, res) => {
  let user = await findUser("token", req.cookies.token);
  let id = req.body.completedAssignmentId;
  if (req.body.done) {
    if (!user.completedAssignments.includes(id)) {
      user.completedAssignments.push(id);
    }
  } else {
    user.completedAssignments = user.completedAssignments.filter(
      (assignmentId) => assignmentId !== id
    );
  }
  await DB.updateUser(user);
  res.send({ completedAssignments: user.completedAssignments });
});

apiRouter.get("/completedAssignments", verifyAuth, async (req, res) => {
  let user = await findUser("token", req.cookies.token);
  res.send({ completedAssignments: user.completedAssignments });
});

// Add calendar
apiRouter.put("/calendars", verifyAuth, async (req, res) => {
  let user = await findUser("token", req.cookies.token);
  if (!user.calendars.includes(req.body.calendar)) {
    user.calendars.push(req.body.calendar);
    DB.updateUser(user);
  }
  res.send({ calendars: user.calendars });
});

// Get calendars
apiRouter.get("/calendars", verifyAuth, async (req, res) => {
  let user = await findUser("token", req.cookies.token);
  res.send({ calendars: user.calendars });
});

// Remove calendar
apiRouter.delete("/calendars", verifyAuth, async (req, res) => {
  let user = await findUser("token", req.cookies.token);
  user.calendars = user.calendars.filter(
    (calendar) => calendar !== req.body.calendar
  );
  await DB.updateUser(user);
  res.send({ calendars: user.calendars });
});

async function createUser(email, hasjedPassword) {
  const user = {
    email: email,
    password: hasjedPassword,
    token: uuid.v4(),
    completedAssignments: [],
    calendars: [],
  };
  await DB.addUser(user);

  return user;
}

async function findUser(field, value) {
  if (!value) return null;

  if (field === "token") {
    return DB.getUserByToken(value);
  }
  return DB.getUser(value);
}

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie("token", authToken, {
    secure: true,
    httpOnly: true,
    sameSite: "strict",
  });
}

// Default error handler
app.use((err, req, res, next) => {
  res.status(500).send({ type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile("index.html", { root: "public" });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
