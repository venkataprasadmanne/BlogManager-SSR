const express = require("express");

const app = express();

const path = require("path");

const bodyParser = require("body-parser");

app.use(express.static("public"));
app.use(bodyParser.json());
const ArticleController = require("./ArticleController");

// article related a pi's
app.post("/api/articles", ArticleController.addArticle);
app.get("/api/articles", ArticleController.fetchAllArticles);
app.post("/api/articles/:articleId", ArticleController.updateArticle);
app.delete("/api/articles/:articleId", ArticleController.removeArticle);

// users related api's
app.post("/api/users", ArticleController.addUser);
app.get("/api/users", ArticleController.fetchUsers);
app.post("/api/users/:userId", ArticleController.updateUser);
app.delete("/api/users/:userId", ArticleController.removeUser);

// comments related API
app.post("/api/articles/:articleId/comments", ArticleController.addComment);
app.delete(
  "/api/articles/:articleId/comments/:commentId",
  ArticleController.removeComment
);
app.post(
  "/api/articles/:articleId/comments/:commentId",
  ArticleController.updateComment
);

app.get("*", function index(req, res) {
  console.log("is this being used");
  res.sendFile(path.resolve(__dirname, "../", "public/index.html"));
});

app.listen(4000, () => {
  console.log("server started at 4000");
});
