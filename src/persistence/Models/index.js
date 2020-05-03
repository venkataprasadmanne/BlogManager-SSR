const mongoose = require("mongoose");
const Schemas = require("../schemas");

const { ArticleSchema, AuthorSchema } = Schemas;

const Author = mongoose.model("Author", AuthorSchema);

const Article = mongoose.model("Article", ArticleSchema);

module.exports = { Author, Article };
