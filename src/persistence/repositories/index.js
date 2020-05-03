const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27019/blogdb");

const ArticleRepo = require("./ArticleRepo");
const AuthorRepo = require("./AuthorRepo");

module.exports = { ArticleRepo, AuthorRepo };
