const mongoose = require('mongoose');
const DB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/bonapetite';

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(()=> {
  console.log(`MongoDB connected on port 27017`);
}).catch((err)=> {
  console.log(err);
});

module.exports = {
  Item: require('./Item'),
  Plan: require('./Plan'),
  User: require('./User')
};
