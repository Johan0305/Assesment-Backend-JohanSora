const clonServer = require("supertest");
const { connect, disconnected, cleanup } = require("../db");
const app = require("../app");
const User = require("../model/user.model");

describe("user", () => {
  beforeAll(async () => {
    await connect();
  });

  beforeEach(async () => {
    await cleanup();
  });

  afterAll(async () => {
    await disconnected();
  });

  it("should create a user correctly", async () => {
    const user = { email: "test@test.com", password: "12345" };
    const res = await clonServer(app).post("/users/register").send(user);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
    expect(res.body.token).toMatch(
      /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/
    );
  });
  it("should not create user when there is no email", async () => {
    const user = { password: "12345" };
    const res = await clonServer(app).post("/users/register").send(user);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/User could not be registered/i);
  });
  it("should not create user when email is invalid", async () => {
    const user = { email: "test", password: "12345" };
    const res = await clonServer(app).post("/users/register").send(user);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/User could not be registered/i);
  });
  it("should not create user when email already exists", async () => {
    const user = { email: "test@test.com", password: "12345" };
    await User.create(user);
    const res = await clonServer(app).post("/users/register").send(user);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/User could not be registered/i);
  });

  it("should signin user correctly", async () => {
    const user = { email: "test@test.com", password: "12345" };
    await clonServer(app).post("/users/register").send(user);
    const res = await clonServer(app).post("/users/login").send(user);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });
  it("Should not sigin if incorrect password", async () => {
    const user = { email: "test@test.com", password: "Abcd12345" };
    await clonServer(app).post("/users/register").send(user);

    const res = await clonServer(app)
      .post("/users/login")
      .send({ ...user, password: "1" });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/User or password not valid/i);
  });

  it("should not signin user if email does not exist", async () => {
    const user = { email: "test@test.com", password: "12345" };
    const res = await clonServer(app).post("/users/login").send(user);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(
      /User could not login: error: Error: User or password not valid/i
    );
  });
});
