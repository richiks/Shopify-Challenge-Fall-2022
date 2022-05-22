const mongoose = require("mongoose");

var schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  vendor: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const Footweardb = mongoose.model("footweardb", schema);

module.exports = Footweardb;
