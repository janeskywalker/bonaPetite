const mongoose = require('mongoose');
const mongoURL = process.env.MONGODB_URI || 'mongodb://localhost:27017/bonapetite';

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() => {
  console.log(`MongoDB connected on port 27017`);
}).catch((err) => {
  console.log(err);
});

module.exports = {
  Item: require('./Item'),
  User: require('./User')
};
