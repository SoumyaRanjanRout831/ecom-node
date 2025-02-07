const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    shortDescription: {type: String},
    description: {type: String},
    purchasePrice: {type: Number, required: true},
    sellingPrice: { type: Number, required: true},
    images: Array(String),
    categoryId:[{ type: Schema.Types.ObjectId, ref: 'categories'}]
  }
  
);

const Product = mongoose.model("products", productSchema);

module.exports = Product;
