const express = require("express"),
  path = require("path");

const app = express();

//Frontend vill ha /
app.get("/api", (_request, response) => {
  response.send({ hello: "World" });
});

//Backend vill ha/
app.use(express.static(path.join(path.resolve(), "dist")));
console.log(path.resolve());

//Det som kommer först vinner

app.listen(3000, () => {
  console.log("Redo på http://localhost:3000/");
});
