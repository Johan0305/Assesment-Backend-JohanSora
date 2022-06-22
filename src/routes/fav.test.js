const clonServer = require("supertest");
const jwt = require("jsonwebtoken");
const { connect, disconnected, cleanup } = require("../db");
const app = require("../app");
const User = require("../model/user.model");
const Fav = require("../model/fav.model");
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

  it("Should create Fav if user is authenticated", async () => {
    const fav = {
      title: "test1",
      description: "test description",
      link: "www.test.com",
    };
    const { _id } = await List.create({ name: "testList", user });
    const res = await clonServer(app)
      .post(`/favs/${_id}`)
      .send(fav)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toMatch(/fav created/i);
  });
});
