const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const OrderSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  products: {
    type: Array,
    required: true
  },
  totalprice: {
    type: Number,
    required: true
  },
  orderstatus: {
    type: String,
    required: true
  }
});

const Orders =  mongoose.model("Orders", OrderSchema);

module.exports = Orders;