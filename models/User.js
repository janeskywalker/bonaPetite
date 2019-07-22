const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Plan = require('./Plan');

const UserSchema = new Schema({
  name:String,
  email:String,
  password:String,
  age:Number,
  plan: {Plan.schema}
});

const User = mongoose.model('User',ItemSchema);

module.exports = User;
