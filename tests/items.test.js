import app from "../src/app.js";
import supertest from "supertest";
import connection from "../src/database.js";

beforeEach(async () => {
  await connection.query(`DELETE FROM items WHERE text = 'teste'`);
});

afterAll(async () => {
  await connection.query(`DELETE FROM items WHERE text = 'teste'`);
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
