const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Item = require('./Item');

const PlanSchema = new Schema({
  title:String,
  items:[Item.schema],
  Calories:String
});

const Plan = mongoose.model('Plan',PlanSchema);

module.exports = Plan;
