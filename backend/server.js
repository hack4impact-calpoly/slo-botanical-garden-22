const express = require("express");
const app = express();

function helloHandler(request, response) {
  console.log("Request Made");
  const name = request.query.name;

  response.status(200);
  response.send("Hello, " + name + "!");
}

app.get("/hello", helloHandler);

app.listen(3000, () => console.log("server running on port 3000"));
