const mongoose = require("mongoose");
// const ObjectId = mongoose.Schema.ObjectId;

const Book = new mongoose.Schema({
  //   author: ObjectId,
  title: String,
  desc: String,
  status: String,
  email: { type: String, unique: true, dropDups: true },
});

module.exports = Book;
