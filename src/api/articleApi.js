const jwt = require("jsonwebtoken");
const controllers = require("../controllers");

const { ArticleController } = controllers;

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.sendStatus(401);
  }
  return jwt.verify(token, "shhhhh", (err, user) => {
    if (err) return res.sendStatus(403);
    req.body.authorId = user.username;
    return next();
  });
}

module.exports = app => {
  // article related a pi's
  app.post("/api/articles", authenticateToken, ArticleController.addArticle);
  app.get(
    "/api/articles",
    authenticateToken,
    ArticleController.fetchAllArticles
  );
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
};
