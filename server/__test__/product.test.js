const app = require("../app");
const request = require("supertest");
const { sequelize } = require("../models");
const { signToken } = require("../helpers/jwt");
const { hash } = require("../helpers/bcrypt");
const { queryInterface } = sequelize;
const fs = require("fs");

beforeAll(async () => {
  const dataAdmin = require("../data/admin.json");
  dataAdmin.forEach((user) => {
    delete user.id;
    user.password = hash(user.password);
    user.createdAt = new Date();
    user.updatedAt = new Date();
  });
  await queryInterface.bulkInsert("Users", dataAdmin, {});
  const dataCategory = require("../data/category.json");
  dataCategory.forEach((category) => {
    category.createdAt = new Date();
    category.updatedAt = new Date();
  });
  await queryInterface.bulkInsert("Categories", dataCategory, {});
  const dataProduct = require("../data/product.json");
  dataProduct.forEach((product) => {
    product.createdAt = new Date();
    product.updatedAt = new Date();
  });
  await queryInterface.bulkInsert("Products", dataProduct, {});

  const payload = {
    id: 1,
    email: "maul@gmail.com",
    role: "admin",
  };
  access_token = signToken(payload);
});
afterAll(async () => {
  await queryInterface.bulkDelete("Products", null, {
    restartIdentity: true,
    truncate: true,
    cascade: true,
  });
  await queryInterface.bulkDelete("Categories", null, {
    restartIdentity: true,
    truncate: true,
    cascade: true,
  });
  await queryInterface.bulkDelete("Users", null, {
    restartIdentity: true,
    truncate: true,
    cascade: true,
  });
});

describe("POST /product - succeed", () => {
  it("should be return object success add product", async () => {
    const body = {
      name: "HAUGA",
      description: "meja kuat",
      price: 2000000,
      stock: 21,
      imgUrl:
        "https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/157/1115791_PE872255_S4.webp",
      categoryId: 3,
      authorId: 1,
    };
    let payload = {
      id: 1,
      email: "maul@gmail.com",
      role: "admin",
    };
    let access_token = signToken(payload);
    const response = await request(app)
      .post("/product")
      .send(body)
      .set("Authorization", `Bearer ${access_token}`);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("addData", expect.any(Object));
  });
});

describe("POST /product - failed", () => {
  it("if access token is empty", async () => {
    const body = {
      name: "HAUGA",
      description: "meja kuat",
      price: 2000000,
      stock: 21,
      imgUrl:
        "https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/157/1115791_PE872255_S4.webp",
      categoryId: 3,
      authorId: 1,
    };
    let payload = {
      id: 1,
      email: "maul@gmail.com",
      role: "admin",
    };
    let access_token = null;
    const response = await request(app)
      .post("/product")
      .send(body)
      .set("Authorization", `Bearer ${access_token}`);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("msg", expect.any(String));
  });
  it("if access token is random input", async () => {
    const body = {
      name: "HAUGA",
      description: "meja kuat",
      price: 2000000,
      stock: 21,
      imgUrl:
        "https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/157/1115791_PE872255_S4.webp",
      categoryId: 3,
      authorId: 1,
    };
    let payload = {
      id: 1,
      email: "maul@gmail.com",
      role: "admin",
    };
    let access_token = "adwlwlw";
    const response = await request(app)
      .post("/product")
      .send(body)
      .set("Authorization", `Bearer ${access_token}`);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("msg", expect.any(String));
  });
  it("if input Prodcut is wrong", async () => {
    const body = {
      name: "HAUGA",
      description: "meja kuat",
      price: -1,
      stock: 21,
      imgUrl:
        "https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/157/1115791_PE872255_S4.webp",
      categoryId: 3,
      authorId: 1,
    };
    let payload = {
      id: 1,
      email: "maul@gmail.com",
      role: "admin",
    };
    let access_token = signToken(payload);
    const response = await request(app)
      .post("/product")
      .send(body)
      .set("Authorization", `Bearer ${access_token}`);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("msg", expect.any(String));
  });
});

describe("GET /product - succeed", () => {
  it("should be return array of object", async () => {
    let payload = {
      id: 1,
      email: "maul@gmail.com",
      role: "admin",
    };
    let access_token = signToken(payload);
    const response = await request(app)
      .get("/product")
      .set("Authorization", `Bearer ${access_token}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("dataProduct", expect.any(Array));
  });
});

describe("GET /product - failed", () => {
  it("if access token is empty", async () => {
    let payload = {
      id: 1,
      email: "maul@gmail.com",
      role: "admin",
    };
    let access_token = null;
    const response = await request(app)
      .get("/product")
      .set("Authorization", `Bearer ${access_token}`);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("msg", expect.any(String));
  });
  it("if access token is random input", async () => {
    let payload = {
      id: 1,
      email: "maul@gmail.com",
      role: "admin",
    };
    let access_token = "adwlwlw";
    const response = await request(app)
      .get("/product")
      .set("Authorization", `Bearer ${access_token}`);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("msg", expect.any(String));
  });
});
describe("GET /product/productId - succeed", () => {
  it("should be return object", async () => {
    let payload = {
      id: 1,
      email: "maul@gmail.com",
      role: "admin",
    };
    let access_token = signToken(payload);
    const response = await request(app)
      .get("/product/1")
      .set("Authorization", `Bearer ${access_token}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("dataProduct", expect.any(Object));
  });
});
describe("GET /product/productId - failed", () => {
  it("if access token is empty", async () => {
    let payload = {
      id: 1,
      email: "maul@gmail.com",
      role: "admin",
    };
    let access_token = null;
    const response = await request(app)
      .get("/product/1")
      .set("Authorization", `Bearer ${access_token}`);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("msg", expect.any(String));
  });
  it("if access token is random input", async () => {
    let payload = {
      id: 1,
      email: "maul@gmail.com",
      role: "admin",
    };
    let access_token = "adwlwlw";
    const response = await request(app)
      .get("/product/1")
      .set("Authorization", `Bearer ${access_token}`);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("msg", expect.any(String));
  });
  it("if productId not found should return 404 status code", async () => {
    let payload = {
      id: 1,
      email: "maul@gmail.com",
      role: "admin",
    };
    let access_token = signToken(payload);
    const response = await request(app)
      .get("/product/100")
      .set("Authorization", `Bearer ${access_token}`);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("msg", expect.any(String));
  });
});
describe("put /product/productId - succeed", () => {
  it("should be return updated product in object", async () => {
    const body = {
      name: "KLIPPAN",
      description: "meja kuat",
      price: 2000000,
      stock: 21,
      imgUrl:
        "https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/157/1115791_PE872255_S4.webp",
      categoryId: 2,
      authorId: 1,
    };
    let payload = {
      id: 1,
      email: "maul@gmail.com",
      role: "admin",
    };
    let access_token = signToken(payload);
    const response = await request(app)
      .get("/product/1")
      .send(body)
      .set("Authorization", `Bearer ${access_token}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("dataProduct", expect.any(Object));
  });
});
describe("put /product/productId - failed", () => {
  it("if access token is empty", async () => {
    const body = {
      name: "KLIPPAN",
      description: "meja kuat",
      price: 2000000,
      stock: 21,
      imgUrl:
        "https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/157/1115791_PE872255_S4.webp",
      categoryId: 2,
      authorId: 1,
    };
    let payload = {
      id: 1,
      email: "maul@gmail.com",
      role: "admin",
    };
    let access_token = null;
    const response = await request(app)
      .put("/product/1")
      .send(body)
      .set("Authorization", `Bearer ${access_token}`);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("msg", expect.any(String));
  });
  it("if access token is random token input", async () => {
    const body = {
      name: "KLIPPAN",
      description: "meja kuat",
      price: 2000000,
      stock: 21,
      imgUrl:
        "https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/157/1115791_PE872255_S4.webp",
      categoryId: 2,
      authorId: 1,
    };
    let payload = {
      id: 1,
      email: "maul@gmail.com",
      role: "admin",
    };
    let access_token = "adwada";
    const response = await request(app)
      .put("/product/1")
      .send(body)
      .set("Authorization", `Bearer ${access_token}`);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("msg", expect.any(String));
  });
  it("if productId not found should return 404 status code", async () => {
    const body = {
      name: "KLIPPAN",
      description: "meja kuat",
      price: 2000000,
      stock: 21,
      imgUrl:
        "https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/157/1115791_PE872255_S4.webp",
      categoryId: 2,
      authorId: 1,
    };
    let payload = {
      id: 1,
      email: "maul@gmail.com",
      role: "admin",
    };
    let access_token = signToken(payload);
    const response = await request(app)
      .put("/product/1000")
      .send(body)
      .set("Authorization", `Bearer ${access_token}`);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("msg", expect.any(String));
  });
  it("if login to staff but updated product other Product", async () => {
    const body = {
      name: "KLIPPAN",
      description: "meja kuat",
      price: 2000000,
      stock: 21,
      imgUrl:
        "https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/157/1115791_PE872255_S4.webp",
      authorId: 4,
      categoryId: 2,
    };
    let payload = {
      id: 2,
      email: "ana@gmail.com",
      role: "staff",
    };
    let access_token = signToken(payload);
    const response = await request(app)
      .put("/product/1")
      .send(body)
      .set("Authorization", `Bearer ${access_token}`);
    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("msg", expect.any(String));
    console.log(response.body);
  });
  it("if input product not valid", async () => {
    const body = {
      name: "KLIPPAN",
      description: "meja kuat",
      price: -1,
      stock: 21,
      imgUrl:
        "https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/157/1115791_PE872255_S4.webp",
      authorId: 1,
      categoryId: 2,
    };
    let payload = {
      id: 1,
      email: "maul@gmail.com",
      role: "admin",
    };
    let access_token = signToken(payload);
    const response = await request(app)
      .put("/product/1")
      .send(body)
      .set("Authorization", `Bearer ${access_token}`);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("msg", expect.any(String));
    console.log(response.body);
  });
});
describe("delete /product/productId - succeed", () => {
  it("should be return message name product has deleted", async () => {
    let payload = {
      id: 1,
      email: "maul@gmail.com",
      role: "admin",
    };
    let access_token = signToken(payload);
    const response = await request(app)
      .delete("/product/1")
      .set("Authorization", `Bearer ${access_token}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
});
describe("delete /product/productId - failed", () => {
  it("if access token is empty", async () => {
    let payload = {
      id: 2,
      email: "ana@gmail.com",
      role: "staff",
    };
    let access_token = null;
    const response = await request(app)
      .delete("/product/1")
      .set("Authorization", `Bearer ${access_token}`);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("msg", expect.any(String));
  });
  it("if access token is random input/malform token", async () => {
    let payload = {
      id: 2,
      email: "ana@gmail.com",
      role: "staff",
    };
    let access_token = "adwadsadaw";
    const response = await request(app)
      .delete("/product/1")
      .set("Authorization", `Bearer ${access_token}`);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("msg", expect.any(String));
  });
  it("if prodouct in database not found should return 404 status", async () => {
    let payload = {
      id: 2,
      email: "ana@gmail.com",
      role: "staff",
    };
    let access_token = signToken(payload);
    const response = await request(app)
      .delete("/product/245")
      .set("Authorization", `Bearer ${access_token}`);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("msg", expect.any(String));
  });
  it("if staff try to delete other product", async () => {
    let payload = {
      id: 2,
      email: "ana@gmail.com",
      role: "staff",
    };
    let access_token = signToken(payload);
    const response = await request(app)
      .delete("/product/2")
      .set("Authorization", `Bearer ${access_token}`);
    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("msg", expect.any(String));
  });
});
describe("patch /product/productId - succeed", () => {
  it("return message has update img with entity name", async () => {
    let payload = {
      id: 1,
      email: "maul@gmail.com",
      role: "admin",
    };
    let access_token = signToken(payload);
    const response = await request(app)
      .patch("/product/2")
      .attach("img", fs.readFileSync("./data/test.png"), "test.png")
      .set("Authorization", `Bearer ${access_token}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
});
describe("patch /product/productId - failed", () => {
  it("if access token is empty", async () => {
    let payload = {
      id: 1,
      email: "maul@gmail.com",
      role: "admin",
    };
    let access_token = null;
    const response = await request(app)
      .patch("/product/1")
      .attach("img", fs.readFileSync("./data/test.png"), "test.png")
      .set("Authorization", `Bearer ${access_token}`);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("msg", expect.any(String));
  });
  it("if access token input a random or malform token", async () => {
    let payload = {
      id: 1,
      email: "maul@gmail.com",
      role: "admin",
    };
    let access_token = "wkkwkwkw";
    const response = await request(app)
      .patch("/product/1")
      .attach("img", fs.readFileSync("./data/test.png"), "test.png")
      .set("Authorization", `Bearer ${access_token}`);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("msg", expect.any(String));
  });
  it("if data product not found in database should return 404", async () => {
    let payload = {
      id: 1,
      email: "maul@gmail.com",
      role: "admin",
    };
    let access_token = signToken(payload);
    const response = await request(app)
      .patch("/product/90")
      .attach("img", fs.readFileSync("./data/test.png"), "test.png")
      .set("Authorization", `Bearer ${access_token}`);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("msg", expect.any(String));
  });
  it("if staff try to update other product", async () => {
    let payload = {
      id: 2,
      email: "ana@gmail.com",
      role: "staff",
    };
    let access_token = signToken(payload);
    const response = await request(app)
      .patch("/product/2")
      .attach("img", fs.readFileSync("./data/test.png"), "test.png")
      .set("Authorization", `Bearer ${access_token}`);
    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("msg", expect.any(String));
  });
  it("if input file not valid", async () => {
    let payload = {
      id: 1,
      email: "maul@gmail.com",
      role: "admin",
    };
    let access_token = signToken(payload);
    const response = await request(app)
      .patch("/product/1")
      .attach(null)
      .set("Authorization", `Bearer ${access_token}`);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("msg", expect.any(String));
  });
});
