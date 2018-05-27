const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: { type: String },
  price: {type: Number},
  quantity: { type: Number },
  url: { type: String },
  picture: { type: String },
  vendor: { type: String }
});

mongoose.model('product', ProductSchema);
