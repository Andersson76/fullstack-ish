const dotenv = require("dotenv"),
  { Client } = require("pg");

dotenv.config();

const express = require("express");
const cors = require("cors");

const path = require("path");

const app = express();

const client = new Client({
  connectionString: process.env.PGURI,
});

client.connect();

app.use(cors());

//API rutten
app.get("/api", async (_request, response) => {
  const { rows } = await client.query("SELECT * FROM tasks");

  response.send(rows);
});

// Servera frontendens byggda filer
app.use(express.static(path.join(__dirname, "dist")));

// Fallback för alla andra rutter
app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
