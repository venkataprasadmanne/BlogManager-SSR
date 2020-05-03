const express = require("express");

const app = express();

const path = require("path");

const bodyParser = require("body-parser");

app.use(express.static("public"));
app.use(bodyParser.json());

require("./api")(app);

app.get("*", function index(req, res) {
  console.log("is this being used", req.url);
  res.sendFile(path.resolve(__dirname, "../", "public/index.html"));
});

app.listen(4000, () => {
  console.log("server started at 4000");
});
