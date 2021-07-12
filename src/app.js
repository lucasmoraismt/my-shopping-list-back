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

export default app;
