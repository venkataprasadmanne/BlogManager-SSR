const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27019/blogdb");

const Models = require("../Models");

const { Author } = Models;

module.exports = {
  addUser: (
    firstName,
    lastName,
    email,
    bioDescription,
    username,
    password,
    token
  ) => {
    return new Promise((resolve, reject) => {
      const author = new Author({
        firstName,
        lastName,
        email,
        bioDescription,
        username,
        password,
        token
      });
      author
        .save()
        .then(savedAuthor => {
          resolve(savedAuthor);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  fetchUsers: userId => {
    return new Promise((resolve, reject) => {
      if (!userId) {
        Author.find({})
          .then(users => {
            resolve(users);
          })
          .catch(err => {
            reject(err);
          });
      } else {
        Author.find({ username: userId })
          .then(users => {
            resolve(users);
          })
          .catch(err => {
            reject(err);
          });
      }
    });
  },

  fetchUserInfo: username => {
    return new Promise((resolve, reject) => {
      console.log("username", username);
      Author.findOne({ username })
        .then(author => {
          if (author) {
            resolve(author);
          } else {
            throw "error fetching the author info";
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  updateUser: (authorId, data) => {
    return new Promise((resolve, reject) => {
      console.log("authorId", authorId);
      Author.findOne({ _id: authorId })
        .exec()
        .then(author => {
          const {
            firstName,
            lastName,
            email,
            bioDescription,
            username,
            password
          } = data;

          author.firstName = firstName;
          author.lastName = lastName;
          author.email = email;
          author.bioDescription = bioDescription;
          author.username = username;
          author.password = password;
          return author.save();
        })
        .then(savedAuthor => {
          resolve(savedAuthor);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  removeUser: authorId => {
    return new Promise((resolve, reject) => {
      Author.remove({ _id: authorId })
        .then(() => {
          resolve("User removed");
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  findUserByName: username => {
    return new Promise((resolve, reject) => {
      Author.findOne({ username })
        .then(user => {
          resolve(user);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};
