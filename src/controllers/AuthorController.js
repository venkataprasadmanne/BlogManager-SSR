const jwt = require("jsonwebtoken");

const repos = require("../persistence/repositories");

const { AuthorRepo } = repos;

module.exports = {
  addUser: (req, res) => {
    const token = jwt.sign({ username: req.body.username }, "shhhhh");
    AuthorRepo.addUser(
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      req.body.bioDescription,
      req.body.username,
      req.body.password,
      token
    )
      .then(savedUser => {
        res.send(savedUser);
      })
      .catch(err => {
        res.send(err);
      });
  },

  fetchUsers: (req, res) => {
    if (!req.query.userId) {
      AuthorRepo.fetchUsers()
        .then(users => {
          res.send(users);
        })
        .catch(err => {
          res.send(err);
        });
    } else {
      AuthorRepo.fetchUsers(req.query.userId)
        .then(users => {
          res.send(users);
        })
        .catch(err => {
          res.send(err);
        });
    }
  },

  fetchUserInfo: (req, res) => {
    const username = req.body.authorId;
    AuthorRepo.fetchUserInfo(username)
      .then(userInfo => {
        res.send(userInfo);
      })
      .catch(err => {
        res.send(err);
      });
  },
  updateUser: (req, res) => {
    AuthorRepo.updateUser(req.params.userId, req.body.data)
      .then(updatedUser => {
        res.send(updatedUser);
      })
      .catch(err => {
        res.send(err);
      });
  },
  removeUser: (req, res) => {
    AuthorRepo.removeUser(req.params.userId)
      .then(message => {
        res.send(message);
      })
      .catch(err => {
        res.sendStatus(500);
      });
  },
  loginUser: (req, res) => {
    AuthorRepo.findUserByName(req.body.username)
      .then(user => {
        if (user.password === req.body.password) {
          user.token = jwt.sign({ username: user.username }, "shhhhh");
          return user.save().then(savedUser => {
            res.send(savedUser);
          });
        }
        res.sendStatus(401);
      })
      .catch(err => {
        res.sendStatus(401);
      });
  }
};
