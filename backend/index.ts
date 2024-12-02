import dotenv from "dotenv";
import express, { Request, Response } from "express";
import cors from "cors";
import path from "path";
import { Client } from "pg";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const client = new Client({
  connectionString: process.env.PGURI,
});

client.connect().catch((error) => {
  console.error("Failed to connect to the database:", error);
});

app.get("/api/tasks", async (req, res) => {
  try {
    const { rows } = await client.query("SELECT * FROM tasks");
    res.send({ success: true, tasks: rows });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).send({ success: false, message: "Internal server error" });
  }
});

app.post("/api/tasks", async (req, res) => {
  const { title, status } = req.body;
  try {
    const result = await client.query(
      "INSERT INTO tasks (title, status) VALUES ($1, $2) RETURNING *",
      [title, status]
    );
    res.status(201).send(result.rows[0]);
  } catch (error) {
    console.error("Error creating task:", error);
  }
});

app.put("/api/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const { title, status } = req.body;
  try {
    const result = await client.query(
      "UPDATE tasks SET title = $1, status = $2 WHERE id = $3 RETURNING *",
      [title || "", status, id]
    );
    res.send(result.rows[0]);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).send({ error: "Internal server error" });
  }
});

app.delete("/api/tasks/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await client.query("DELETE FROM tasks WHERE id = $1", [id]);

    res.send({ success: true, message: "Task deleted" });
  } catch (error) {
    console.error("Error deleting task:", error);
  }
});

app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
