import express from "express";
import cors from "cors";

import connection from "./database.js";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/items", async (req, res) => {
  try {
    const result = await connection.query(`SELECT * FROM items`);

    res.send(result.rows);
  } catch {
    res.sendStatus(500);
  }
});

app.post("/items", async (req, res) => {
  const { text } = req.body;
  if (text && text.trim().length === 0) {
    res.sendStatus(400);
  } else if (!text) {
    res.sendStatus(400);
  } else {
    try {
      const result = await connection.query(
        `INSERT INTO items (text) VALUES ($1)`,
        [text]
      );

      res.sendStatus(201);
    } catch {
      res.sendStatus(500);
    }
  }
});
export default app;
