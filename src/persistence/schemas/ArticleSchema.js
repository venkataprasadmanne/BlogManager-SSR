const mongoose = require("mongoose");

const { Schema } = mongoose;
// const { ObjectId } = mongoose.Types;

const ArticleSchema = new Schema({
  title: String,
  description: String,
  likes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  comments: [
    {
      description: String,
      author: String
    }
  ],
  author: String
});

module.exports = ArticleSchema;
