const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Item = require('./Item');

const PlanSchema = new Schema({
  title: {type:String,default: "My Meal Plan"},
  items: [Item.schema],
  calories: String
});

const Plan = mongoose.model('Plan',PlanSchema);

module.exports = Plan;
