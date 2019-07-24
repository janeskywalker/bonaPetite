const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Plan = require('./Plan');

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
  // embeded 
  plans: [Plan.schema],

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
