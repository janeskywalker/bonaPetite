const bcrypt = require('bcryptjs');
const db = require('../models');

const newUser = (req, res) => {
  res.render('accounts/signup');
}


// post create new User
const createUser = (req, res) => {

  console.log("req.body", req.body)

  const errors = [];
  if (!req.body.name) {
    errors.push({
      field: 'name',
      message: 'Please enter your name'
    })
  };

  if (!req.body.email) {
    errors.push({
      field: 'email',
      message: 'Please enter your email'
    })
  };

  if (!req.body.password) {
    errors.push({
      field: 'password',
      message: 'Please enter your password'
    })
  };



  // Generate Hash Salt
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return res.render('accounts/signup', {
      errors: [{
        message: 'Something went wrong, please try again'
      }]
    });

    // Hash User Password with generated Salt
    bcrypt.hash(req.body.password, salt, (err, hash) => {
      if (err) return res.render('accounts/signup', {
        errors: [{
          message: 'Something went wrong, please try again'
        }]
      });

      // Create New User Object and add hashed password
      const newUser = req.body;
      newUser.password = hash;
      console.log({newUser})

      // Create New User record in database
      db.User.create(newUser, (err, savedUser) => {
        if (err) {
          console.log(err)
          res.render('accounts/signup', {
            errors: [{
              message: 'Something went wrong, please try again'
            }]
          })
        }


        // Redirect to Login page on Success
        console.log({savedUser});
        res.redirect('/accounts/login');
      });
    });
  });
};

module.exports = {
  newUser,
  createUser
};
