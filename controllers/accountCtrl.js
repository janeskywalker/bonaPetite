const db = require('../models');
const bcrypt = require('bcryptjs');
// --------------------- LOGIN -------------------- //

const newSession = (req, res) => {
  console.log('rendering login')
  res.render('accounts/login');
}


const createSession = (req, res) => {
  const errors = [];

  if (!req.body.email) {
    errors.push({
      field: 'email',
      message: 'Please enter your email'
    })
  }

  if (!req.body.password) {
    errors.push({
      field: 'password',
      message: 'Please enter your password'
    })
  }

  if (errors.length) {
    return res.render('accounts/login', {
      errors
    })
  }

  db.User.findOne({
    email: req.body.email
  }, (err, foundUser) => {
    if (err) return res.render('accounts/login', {
      errors: [{
        message: 'Something went wrong, please try again'
      }]
    });

    if (!foundUser) {
      return res.render('accounts/login', {
        errors: [{
          message: 'Username or password is incorrect'
        }]
      })
    }

    bcrypt.compare(req.body.password, foundUser.password, (err, isMatch) => {
      if (err) return res.render('accounts/login', {
        errors: [{
          message: 'Something went wrong, please try again'
        }]
      });

      if (isMatch) {
        req.session.currentUser = {
          _id: foundUser._id,
          name: foundUser.name,
          email: foundUser.email
        };
        return res.redirect('/profile');
      } else {
        return res.render('accounts/login', {
          errors: [{
            message: 'Username or password is incorrect'
          }]
        })
      }
    });
  });
}

const deleteSession = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.render('profile/show', {
      errors: [{
        message: 'Something went wrong, please try again'
      }]
    });
  })

  res.redirect('/accounts/login')
}




module.exports = {
  newSession,
  createSession,
  deleteSession,
};
