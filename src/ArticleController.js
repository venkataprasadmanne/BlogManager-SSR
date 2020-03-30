const repo = require("./persistence/repository");

module.exports = {
  addArticle: (req, res) => {
    repo
      .addArticle(req.body.authorId, req.body.title, req.body.description)
      .then(record => {
        res.send(record);
      })
      .catch(err => {
        res.send(err);
      });
  },

  fetchAllArticles: (req, res) => {
    repo
      .fetchAllArticles()
      .then(articles => {
        res.send(articles);
      })
      .catch(err => {
        res.send(err);
      });
  },

  updateArticle: (req, res) => {
    repo
      .updateArticle(
        req.params.articleId,
        req.body.title,
        req.body.description,
        req.body.likes
      )
      .then(savedArticle => {
        res.send(savedArticle);
      })
      .catch(err => {
        res.send(err);
      });
  },
  removeArticle: (req, res) => {
    repo
      .removeArticle(req.params.articleId)
      .then(message => {
        res.send(message);
      })
      .catch(err => {
        res.send(err);
      });
  },
  addUser: (req, res) => {
    repo
      .addUser(req.body.username, req.body.password)
      .then(savedUser => {
        res.send(savedUser);
      })
      .catch(err => {
        res.send(err);
      });
  },

  fetchUsers: (req, res) => {
    repo
      .fetchUsers()
      .then(users => {
        res.send(users);
      })
      .catch(err => {
        res.send(err);
      });
  },
  updateUser: (req, res) => {
    repo
      .updateUser(req.params.userId, req.body.password)
      .then(updatedUser => {
        res.send(updatedUser);
      })
      .catch(err => {
        res.send(err);
      });
  },
  removeUser: (req, res) => {
    repo
      .removeUser(req.params.userId)
      .then(message => {
        res.send(message);
      })
      .catch(err => {
        res.send(err);
      });
  },
  addComment: (req, res) => {
    repo
      .addComment(req.params.articleId, req.body.description, req.body.authorId)
      .then(savedArticle => {
        res.send(savedArticle);
      })
      .catch(err => {
        res.send(err);
      });
  },
  updateComment: (req, res) => {
    repo
      .updateComment(
        req.params.articleId,
        req.params.commentId,
        req.body.description
      )
      .then(savedArticle => {
        res.send(savedArticle);
      })
      .catch(err => {
        res.send(err);
      });
  },
  removeComment: (req, res) => {
    repo
      .removeComment(req.params.articleId, req.params.commentId)
      .then(savedArticle => {
        res.send(savedArticle);
      })
      .catch(err => {
        res.send(err);
      });
  }
};
