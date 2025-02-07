const mongoose = require("mongoose");

const wishlilstSchema = new mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'users'},
  productsId: Array(String)

});

const Wishlist = mongoose.model("wishlists", wishlilstSchema);

module.exports = Wishlist;