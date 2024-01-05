const app = require("../app");
const request = require("supertest");
const { sequelize } = require("../models");
const { signToken } = require("../helpers/jwt");
const { hash } = require("../helpers/bcrypt");
const { queryInterface } = sequelize;

beforeAll(async () => {
  const data = require("../data/admin.json");
  data.forEach((user) => {
    delete user.id;
    user.password = hash(user.password);
    user.createdAt = new Date();
    user.updatedAt = new Date();
  });
  await queryInterface.bulkInsert("Users", data, {});
  const payload = {
    id: 1,
    email: "maul@gmail.com",
    role: "admin",
  };
  access_token = signToken(payload);
});
afterAll(async () => {
  await queryInterface.bulkDelete("Users", null, {
    restartIdentity: true,
    truncate: true,
    cascade: true,
  });
});

// describe("POST /login"),
//   () => {
describe("POST /login - succeed", () => {
  it("should return an access token", async () => {
    const body = {
      email: "maul@gmail.com",
      password: "maulana11",
    };
    const response = await request(app).post("/login").send(body);
    console.log(response.body);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("token", expect.any(String));
    console.log(response.body);
  });
});

describe("POST /login - error", () => {
  it("if client password or email null,should return an code error ", async () => {
    const body = {
      email: "maul@gmail.com",
      password: null,
    };
    const response = await request(app).post("/login").send(body);
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty(
      "msg",
      "please Input email or password"
    );
  }),
    it("if password wrong,should return an code error ", async () => {
      const body = {
        email: "maul@gmail.com",
        password: "wlwllwlw",
      };
      const response = await request(app).post("/login").send(body);
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("msg", "INVALID EMAIL/PASSWORD");
    });
});

describe("POST /register - succeed", () => {
  it("should be return message success add staff", async () => {
    const body = {
      email: "ul@gmail.com",
      password: "maulana11",
      phoneNumber: "08765608",
      address: "bjong",
    };
    let payload = {
      id: 1,
      email: "maul@gmail.com",
      password: 123456,
      role: "admin",
    };
    let access_token = signToken(payload);
    const response = await request(app)
      .post("/regist")
      .send(body)
      .set("Authorization", `Bearer ${access_token}`);
    expect(response.status).toBe(201);
    console.log(response.body);
  });
});

describe.only("POST /register - failed", () => {
  it("if password input is null or empty ", async () => {
    const body = {
      email: "maulll@gmail.com",
      password: null,
      phoneNumber: "08765608",
      address: "bjong",
    };
    let payload = {
      id: 1,
      email: "maul@gmail.com",
      password: 123456,
      role: "admin",
    };
    let access_token = signToken(payload);
    const response = await request(app)
      .post("/regist")
      .send(body)
      .set("Authorization", `Bearer ${access_token}`);
    expect(response.status).toBe(400);
  });
  it("if email input is null or empty ", async () => {
    const body = {
      email: null,
      password: "maulana11",
      phoneNumber: "08765608",
      address: "bjong",
    };
    let payload = {
      id: 1,
      email: "maul@gmail.com",
      password: 123456,
      role: "admin",
    };
    let access_token = signToken(payload);
    const response = await request(app)
      .post("/regist")
      .send(body)
      .set("Authorization", `Bearer ${access_token}`);
    expect(response.status).toBe(400);
  });
  it("if email input is empty string", async () => {
    const body = {
      email: "",
      password: "maulana11",
      phoneNumber: "08765608",
      address: "bjong",
    };
    let payload = {
      id: 1,
      email: "maul@gmail.com",
      password: 123456,
      role: "admin",
    };
    let access_token = signToken(payload);
    const response = await request(app)
      .post("/regist")
      .send(body)
      .set("Authorization", `Bearer ${access_token}`);
    expect(response.status).toBe(400);
  });
  it("if password input is empty string", async () => {
    const body = {
      email: "anaaa@gmail.com",
      password: "",
      phoneNumber: "08765608",
      address: "bjong",
    };
    let payload = {
      id: 1,
      email: "maul@gmail.com",
      password: 123456,
      role: "admin",
    };
    let access_token = signToken(payload);
    const response = await request(app)
      .post("/regist")
      .send(body)
      .set("Authorization", `Bearer ${access_token}`);
    expect(response.status).toBe(400);
  });
  it("if access token is empty", async () => {
    const body = {
      email: "anaaa@gmail.com",
      password: "123456",
      phoneNumber: "08765608",
      address: "bjong",
    };
    let payload = {
      id: 1,
      email: "maul@gmail.com",
      password: 123456,
      role: "admin",
    };
    let access_token = undefined;
    const response = await request(app)
      .post("/regist")
      .send(body)
      .set("Authorization", `Bearer ${access_token}`);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("msg", expect.any(String));
  });
  it("if access token is random input", async () => {
    const body = {
      email: "anaaa@gmail.com",
      password: "123456",
      phoneNumber: "08765608",
      address: "bjong",
    };
    let payload = {
      id: 1,
      email: "maul@gmail.com",
      password: 123456,
      role: "admin",
    };
    let access_token = "adawdadkakkd";
    const response = await request(app)
      .post("/regist")
      .send(body)
      .set("Authorization", `Bearer ${access_token}`);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("msg", expect.any(String));
  });
});
