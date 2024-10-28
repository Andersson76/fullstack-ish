const express = require("express"),
  path = require("path");

const app = express();

//API rutten
app.get("/api", (_request, response) => {
  response.send({ hello: "World" });
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
