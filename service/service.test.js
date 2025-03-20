const request = require("supertest");
const app = require("./service.js");

function getRandomName(prefix) {
  return `${prefix}_${Math.random().toString(36).substring(2, 15)}`;
}

async function registerUser() {
  const email = getRandomName("email");
  const password = "toomanysecrets";
  const response = await request(app)
    .post("/api/register")
    .send({ email, password });

  return [response, email, password];
}

test("register", async () => {
  const [register, email] = await registerUser();

  expect(register.type).toBe("application/json");
  expect(register.body).toMatchObject({ user: email });
});

test("register existing user", async () => {
  const [, email, password] = await registerUser();

  const register = await request(app)
    .post("/api/register")
    .send({ email, password });

  expect(register.status).toBe(409);
});

test("register missing email", async () => {
  const register = await request(app)
    .post("/api/register")
    .send({ password: "toomanysecrets" });

  expect(register.status).toBe(400);
});

test("register missing password", async () => {
  const register = await request(app)
    .post("/api/register")
    .send({ email: getRandomName("email") });
  expect(register.status).toBe(400);
});

test("login", async () => {
  const [, email, password] = await registerUser();

  const login = await request(app).put("/api/login").send({ email, password });

  expect(login.headers["content-type"]).toMatch(
    "application/json; charset=utf-8"
  );
  expect(login.body).toMatchObject({ user: email });
});

test("login invalid email", async () => {
  const login = await request(app)
    .put("/api/login")
    .send({ email: "nonexistent", password: "toomanysecrets" });

  expect(login.status).toBe(401);
});

test("login invalid password", async () => {
  const [, email] = await registerUser();

  const login = await request(app)
    .put("/api/login")
    .send({ email, password: "wrongpassword" });

  expect(login.status).toBe(401);
});

test("logout", async () => {
  const [response, email, password] = await registerUser();

  const logout = await request(app)
    .delete("/api/logout")
    .set("Cookie", response.headers["set-cookie"]);

  expect(logout.status).toBe(204);
});

test("logout without cookie", async () => {
  const logout = await request(app).delete("/api/logout");

  expect(logout.status).toBe(401);
});

test("logout with invalid cookie", async () => {
  const logout = await request(app)
    .delete("/api/logout")
    .set("Cookie", "token=invalid");

  expect(logout.status).toBe(401);
});

test("authorized assignmentCompleted put", async () => {
  const [response, email, password] = await registerUser();

  const assignmentCompleted = await request(app)
    .put("/api/assignmentCompleted")
    .set("Cookie", response.headers["set-cookie"])
    .send({ completedAssignmentId: 5, done: true });

  expect(assignmentCompleted.status).toBe(200);
});

test("authorized assignmentCompleted remove", async () => {
  const [response, email, password] = await registerUser();

  const assignmentCompleted = await request(app)
    .put("/api/assignmentCompleted")
    .set("Cookie", response.headers["set-cookie"])
    .send({ completedAssignmentId: 5, done: false });

  expect(assignmentCompleted.status).toBe(200);
});

test("unauthorized assignmentCompleted put", async () => {
  const assignmentCompleted = await request(app).put(
    "/api/assignmentCompleted"
  );

  expect(assignmentCompleted.status).toBe(401);
});

test("authorized assignmentCompleted get", async () => {
  const [response, email, password] = await registerUser();

  const completedAssignments = await request(app)
    .get("/api/completedAssignments")
    .set("Cookie", response.headers["set-cookie"]);

  expect(completedAssignments.status).toBe(200);
});

test("unauthorized assignmentCompleted get", async () => {
  const completedAssignments = await request(app).get(
    "/api/completedAssignments"
  );

  expect(completedAssignments.status).toBe(401);
});

test("authorized calendars put", async () => {
  const [response, email, password] = await registerUser();

  const calendars = await request(app)
    .put("/api/calendars")
    .set("Cookie", response.headers["set-cookie"]);

  expect(calendars.status).toBe(200);
});

test("unauthorized calendars put", async () => {
  const calendars = await request(app).put("/api/calendars");

  expect(calendars.status).toBe(401);
});

test("authorized calendars get", async () => {
  const [response, email, password] = await registerUser();

  const calendars = await request(app)
    .get("/api/calendars")
    .set("Cookie", response.headers["set-cookie"]);

  expect(calendars.status).toBe(200);
});

test("unauthorized calendars get", async () => {
  const calendars = await request(app).get("/api/calendars");

  expect(calendars.status).toBe(401);
});

test("unauthorized authenticated", async () => {
  const authenticated = await request(app).get("/api/authenticated");

  expect(authenticated.status).toBe(401);
});

test("authorized authenticated", async () => {
  const [response, email, password] = await registerUser();

  const authenticated = await request(app)
    .get("/api/authenticated")
    .set("Cookie", response.headers["set-cookie"]);

  expect(authenticated.status).toBe(200);
});

test("authorized delete calendar", async () => {
  const [response, email, password] = await registerUser();

  const deleteCalendar = await request(app)
    .delete("/api/calendars")
    .set("Cookie", response.headers["set-cookie"]);

  expect(deleteCalendar.status).toBe(200);
});
