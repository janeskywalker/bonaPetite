const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Item = require('./Item');

const PlanSchema = new Schema({
  title:String,
  items:[Items.schema],
  Calories:String
});

const Plan = mongoose.model('Plan',ItemSchema);

module.exports = Plan;
