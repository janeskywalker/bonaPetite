const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: String,
  carbohydrate: String,
  calories: String,
  protein: String,
  fat: String,
  serving: String
});

const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;
