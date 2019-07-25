const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Item = require('./Item');

const PlanSchema = new Schema({
  title: String,
  items: [],
  Calories: String
});

const Plan = mongoose.model('Plan',PlanSchema);

module.exports = Plan;
