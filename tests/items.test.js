import app from "../src/app.js";
import supertest from "supertest";
import connection from "../src/database.js";

beforeEach(async () => {
  await connection.query(`DELETE FROM items`);
});

afterAll(async () => {
  await connection.query(`DELETE FROM items`);
  connection.end();
});

describe("GET /items", () => {
  it("returns an array if request is valid", async () => {
    await connection.query(`INSERT INTO items (text) VALUES ('teste')`);
    const request = await supertest(app).get("/items");
    expect(request.body[0]).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        text: expect.any(String),
      })
    );
  });
});

describe("POST /items", () => {
  it("returns status 201 if param is valid", async () => {
    const body = { text: "test" };
    const result = await supertest(app).post("/items").send(body);

    expect(result.status).toEqual(201);
  });

  it("returns status 400 for empty params", async () => {
    const body = {};
    const result = await supertest(app).post("/items").send(body);
    expect(result.status).toEqual(400);
  });
});
