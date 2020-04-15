const express = require("express");

const app = express();

const path = require("path");

const bodyParser = require("body-parser");

app.use(express.static("public"));
app.use(bodyParser.json());
const jwt = require("jsonwebtoken");
const ArticleController = require("./ArticleController");

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.sendStatus(401);
  }
  return jwt.verify(token, "shhhhh", (err, user) => {
    if (err) return res.sendStatus(403);
    console.log("user", user);
    req.body.authorId = user.username;
    return next();
  });
}

app.post("/login", ArticleController.loginUser);

app.post("/checktoken", (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.send(false);
  }
  console.log("token", token);
  jwt.verify(token, "shhhhh", (err, user) => {
    if (err) {
      console.log("err", err);
      return res.sendStatus(403);
    }
    res.send(true);
  });
});

// article related a pi's
app.post("/api/articles", authenticateToken, ArticleController.addArticle);
app.get("/api/articles", authenticateToken, ArticleController.fetchAllArticles);
app.post(
  "/api/articles/:articleId",
  authenticateToken,
  ArticleController.updateArticle
);
app.delete(
  "/api/articles/:articleId",
  authenticateToken,
  ArticleController.removeArticle
);

// users related api's
app.post("/api/users", ArticleController.addUser);
app.get("/api/users", authenticateToken, ArticleController.fetchUsers);
app.post("/api/users/:userId", authenticateToken, ArticleController.updateUser);
app.delete(
  "/api/users/:userId",
  authenticateToken,
  ArticleController.removeUser
);
app.get("/api/userinfo", authenticateToken, ArticleController.fetchUserInfo);

// comments related API
app.post(
  "/api/articles/:articleId/comments",
  authenticateToken,
  ArticleController.addComment
);
app.delete(
  "/api/articles/:articleId/comments/:commentId",
  authenticateToken,
  ArticleController.removeComment
);
app.post(
  "/api/articles/:articleId/comments/:commentId",
  authenticateToken,
  ArticleController.updateComment
);

app.get("*", authenticateToken, function index(req, res) {
  console.log("is this being used");
  res.sendFile(path.resolve(__dirname, "../", "public/index.html"));
});

app.listen(4000, () => {
  console.log("server started at 4000");
});
