const jwt = require("jsonwebtoken");
const repos = require("../persistence/repositories");

const { ArticleRepo } = repos;

module.exports = {
  addArticle: async (req, res) => {
    try {
      const record = await ArticleRepo.addArticle(
        req.body.authorId,
        req.body.title,
        req.body.description
      );
      res.status = 200;
      res.send(record);
    } catch (err) {
      res.status = 500;
      res.send(err);
    }
  },

  fetchAllArticles: (req, res) => {
    if (!req.query.userId) {
      ArticleRepo.fetchAllArticles()
        .then(articles => {
          res.send(articles);
        })
        .catch(err => {
          res.send(err);
        });
    } else {
      ArticleRepo.fetchArticlesByAuthor(req.query.userId)
        .then(articles => {
          res.send(articles);
        })
        .catch(err => {
          res.send(err);
        });
    }
  },

  updateArticle: (req, res) => {
    ArticleRepo.updateArticle(
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
    ArticleRepo.removeArticle(req.params.articleId)
      .then(message => {
        res.send(message);
      })
      .catch(err => {
        res.send(err);
      });
  },
  addComment: (req, res) => {
    ArticleRepo.addComment(
      req.params.articleId,
      req.body.description,
      req.body.authorId
    )
      .then(savedArticle => {
        res.send(savedArticle);
      })
      .catch(err => {
        res.send(err);
      });
  },
  updateComment: (req, res) => {
    ArticleRepo.updateComment(
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
    ArticleRepo.removeComment(req.params.articleId, req.params.commentId)
      .then(savedArticle => {
        res.send(savedArticle);
      })
      .catch(err => {
        res.send(err);
      });
  }
};
