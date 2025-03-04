const express = require("express");
const axios = require("axios");
const bcrypt = require("bcryptjs");
const cors = require("cors");

const app = express();
const port = 80;

const passwords = {};

app.use(express.json());

app.use(cors());

app.get("/corsbypass", (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) {
    return res.status(400).send("URL query parameter is required");
  }

  axios
    .get(targetUrl)
    .then((response) => {
      res.set(response.headers);
      res.send(response.data);
    })
    .catch((error) => {
      res.status(500).send("Error fetching the requested URL");
    });
});

app.post("/register", async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  passwords[req.body.email] = hashedPassword;
  res.send({ user: req.body.email });
});

app.put("/login", async (req, res) => {
  const hashedPassword = passwords[req.body.email];
  if (
    hashedPassword &&
    (await bcrypt.compare(req.body.password, hashedPassword))
  ) {
    res.send({ user: req.body.email });
  } else {
    res.status(401).send("Invalid email or password");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
