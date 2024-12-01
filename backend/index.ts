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

app.get("/api/tasks", async (_request, response) => {
  const { rows } = await client.query("SELECT * FROM tasks");
  response.send(rows);
});

app.post("/api/tasks", async (request, response) => {
  const { title, status } = request.body;
  const result = await client.query(
    "INSERT INTO tasks (title, status) VALUES ($1, $2) RETURNING *",
    [title, status]
  );
  response.status(201).send(result.rows[0]);
});

app.put("/api/tasks/:id", async (request, response) => {
  console.log("Received PUT request for task ID:", request.params.id);
  const { id } = request.params;
  const { title, status } = request.body;

  try {
    const result = await client.query(
      "UPDATE tasks SET title = $1, status = $2 WHERE id = $3 RETURNING *",
      [title || "", status, id]
    );
    response.send(result.rows[0]);
  } catch (error) {
    console.error("Error updating task:", error);
    response.status(500).send({ error: "Internal server error" });
  }
});

app.delete("/api/tasks/:id", async (request, response) => {
  const { id } = request.params;
  await client.query("DELETE FROM tasks WHERE id = $1", [id]);
  response.send({ message: "Task deleted" });
});

app.use(express.static(path.join(__dirname, "dist")));

// Fallback för alla andra rutter
app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
