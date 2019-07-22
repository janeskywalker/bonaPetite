const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name:String,
  carbohydrate: String,
  fat: String,
  protein: String,
  serving: String
});

const Item = mongoose.model('Item',ItemSchema);

module.exports = Item;
