const clonServer = require("supertest");
const jwt = require("jsonwebtoken");
const { connect, disconnected, cleanup } = require("../db");
const app = require("../app");
const User = require("../model/user.model");
const List = require("../model/list.model");

describe("list", () => {
  let user;
  let token;

  beforeAll(async () => {
    await connect();
  });

  beforeEach(async () => {
    await cleanup();

    const data = { email: "test@test.com", password: "Juan12345" };
    user = await User.create(data);
    token = jwt.sign({ id: user._id }, process.env.K3Y, {
      expiresIn: 60 * 60 * 24 * 365,
    });
  });

  afterAll(async () => {
    await disconnected();
  });

  it("Should not create list if user is not authenticated", async () => {
    const list = { name: "Sports" };
    const res = await clonServer(app).post("/lists").send(list);

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toMatch(/Session expired/i);
  });

  it("Should not create list if token is empty", async () => {
    const list = { name: "Sports" };
    const res = await clonServer(app)
      .post("/lists")
      .send(list)
      .set("Authorization", "Bearer ")
      .set("Content-Type", "application/json");

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toMatch(/Session expired/i);
  });

  it("Should not create list if token is invalid", async () => {
    const list = { name: "Sports" };
    const res = await clonServer(app)
      .post("/lists")
      .send(list)
      .set("Authorization", "Bearer 12345")
      .set("Content-Type", "application/json");

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toMatch(/jwt malformed/i);
  });

  it("Should create list if user is authenticated", async () => {
    const list = { name: "Sports" };
    const res = await clonServer(app)
      .post("/lists")
      .send(list)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(201);
    expect(res.body.data.name).toBe(list.name);
    expect(res.body.data.done).toBeFalsy();
    expect(res.body.data.user).toBe(user._id.toString());
    expect(res.body.message).toMatch(/list created/i);
  });

  it("Should delete list if user is authenticated and is owner", async () => {
    const list = { name: "Sports" };
    const { _id } = await List.create({ ...list, user });

    const res = await clonServer(app)
      .delete(`/lists/${_id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/list destroyed/i);
  });
});
