const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    shortDescription: {type: String},
    description: {type: String},
    price: {type: Number, required: true},
    discount: { type: Number, required: true},
    images: Array(String),
    categoryId:[{ type: Schema.Types.ObjectId, ref: 'category'}]
  }
  
);

const Product = mongoose.model("products", productSchema);

module.exports = Product;
