const mongoose = require("mongoose");

const { Schema } = mongoose;
// const { ObjectId } = mongoose.Types;

const AuthorSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  bioDescription: String,
  username: String,
  password: String,
  token: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = AuthorSchema;
