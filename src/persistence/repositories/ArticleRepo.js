const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27019/blogdb");

const Models = require("../Models");

const { Article } = Models;

module.exports = {
  addArticle: (authorId, title, description) => {
    const article = new Article({
      author: authorId,
      title,
      description
    });
    return new Promise(async (resolve, reject) => {
      try {
        const articleRecord = await article.save();
        resolve(articleRecord);
      } catch (err) {
        reject(err);
      }
    });
  },
  removeArticle: articleId => {
    return new Promise((resolve, reject) => {
      Article.remove({ _id: articleId }, err => {
        if (err) {
          reject(err);
        } else {
          resolve("article removed");
        }
      });
    });
  },
  updateArticle: (articleId, title, description, likes) => {
    return new Promise((resolve, reject) => {
      Article.findOne({ _id: articleId })
        .exec()
        .then(article => {
          if (title) {
            article.title = title;
          }
          if (description) {
            article.description = description;
          }
          if (likes) {
            article.likes += 1;
          }
          return article.save();
        })
        .then(savedArticle => {
          resolve(savedArticle);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  fetchAllArticles: () => {
    return new Promise((resolve, reject) => {
      Article.find({})
        .then(articles => {
          resolve(articles);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  addComment: (articleId, description, authorId) => {
    return new Promise((resolve, reject) => {
      Article.findOne({ _id: articleId })
        .exec()
        .then(article => {
          article.comments.push({
            description,
            author: authorId
          });
          return article.save();
        })
        .then(savedArticle => {
          resolve(savedArticle);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  removeComment: (articleId, commentId) => {
    return new Promise((resolve, reject) => {
      Article.findOne({ _id: articleId })
        .exec()
        .then(article => {
          const commentIndex = article.comments.findIndex(comment => {
            return comment._id === commentId;
          });
          article.comments.splice(commentIndex, 1);
          return article.save();
        })
        .then(savedArticle => {
          resolve(savedArticle);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  updateComment: (articleId, commentId, description) => {
    return new Promise((resolve, reject) => {
      Article.findOne({ _id: articleId })
        .exec()
        .then(article => {
          article.comments = article.comments.map(comment => {
            if (comment._id == commentId) {
              comment.description = description;
            }
            return comment;
          });
          return article.save();
        })
        .then(savedArticle => {
          resolve(savedArticle);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  fetchArticlesByAuthor: userId => {
    return new Promise((resolve, reject) => {
      Article.find({ author: userId })
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};
