const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: String,
  calories: String,
  protein: String,
  fat: String,
  Carbohydrate: String
});

const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;
