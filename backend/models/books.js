const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const BooksSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  writer: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  price: {
    type: Buffer,
    required: true
  },
  tag: {
    type: String,
    enum: ['fiction', 'non-fiction', 'science', 'essay'],
    required: true
  }
});

const Books =  mongoose.model("Books", BooksSchema);

module.exports = Books;