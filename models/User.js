const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Item = require('./Item');

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  goal: {
    type: Number,
    default: 2000
  },
  // embeded
  items: [Item.schema],

  // plans: [
	// 	{
	// 		type: Schema.Types.ObjectId,
	// 		// collection
	// 		ref: 'Plan'
	// 	}
  // ],

  sign_up_date: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
