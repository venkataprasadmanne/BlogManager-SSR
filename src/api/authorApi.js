const jwt = require("jsonwebtoken");
const controllers = require("../controllers");

const { AuthorController } = controllers;

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
  app.post("/login", AuthorController.loginUser);

  app.post("/checktoken", (req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return res.send(false);
    }
    jwt.verify(token, "shhhhh", (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      res.send(true);
    });
  });

  // users related api's
  app.post("/api/users", AuthorController.addUser);
  app.get("/api/users", authenticateToken, AuthorController.fetchUsers);
  app.post(
    "/api/users/:userId",
    authenticateToken,
    AuthorController.updateUser
  );
  app.delete(
    "/api/users/:userId",
    authenticateToken,
    AuthorController.removeUser
  );
  app.get("/api/userinfo", authenticateToken, AuthorController.fetchUserInfo);
};
