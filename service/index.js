const express = require("express");
const axios = require("axios");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const uuid = require("uuid");

const app = express();
const port = process.argv.length > 2 ? process.argv[2] : 3000;

let users = [];
const passwords = {};

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
  if (passwords[req.body.email]) {
    res.status(400).send("User already exists");
    return;
  }
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const newToken = uuid.v4();
  users.push({
    email: req.body.email,
    password: hashedPassword,
    token: newToken,
    completedAssignments: [],
    calendars: [],
  });
  res.cookie("token", newToken);
  res.send({ user: req.body.email });
});

apiRouter.put("/login", async (req, res) => {
  let user = users.find((user) => user.email === req.body.email);
  // const hashedPassword = user.password;
  if (
    user &&
    user.password &&
    (await bcrypt.compare(req.body.password, user.password))
  ) {
    const newToken = uuid.v4();
    user.token = newToken;
    res.cookie("token", newToken);
    res.send({ user: req.body.email });
  } else {
    res.status(401).send("Invalid email or password");
  }
});

apiRouter.put("/logout", (req, res) => {
  res.clearCookie("user");
  res.send({});
});

apiRouter.put("/assignmentCompleted", (req, res) => {
  console.log(users);
  let user = users.find((user) => user.token === req.cookies.token);
  if (!user) {
    res.status(401).send("Unauthorized");
    return;
  }
  let id = req.body.completedAssignmentId;
  if (req.body.done) {
    if (!user.completedAssignments.includes(id)) {
      user.completedAssignments.push(id);
    }
  } else {
    user.completedAssignments = users[
      req.cookies.user
    ].completedAssignments.filter((assignmentId) => assignmentId !== id);
  }
  res.send({ completedAssignments: user.completedAssignments });
});

apiRouter.get("/completedAssignments", (req, res) => {
  let user = users[req.cookies.user];
  if (!user) {
    res.status(401).send("Unauthorized");
    return;
  }
  if (!user.completedAssignments) {
    users[req.cookies.user].completedAssignments = [];
  }
  res.send({ completedAssignments: user.completedAssignments });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
