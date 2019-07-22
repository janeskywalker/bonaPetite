const bcrypt = require('bcryptjs');
const db = require('../models');

const newUser = (req, res) => {
  res.render('accounts/signUp');
}

// post create new User
const createUser = (req, res) => {
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

  if (!req.body.age) {
    errors.push({
      field: 'age',
      message: 'Please enter your age'
    })
  };

  // Generate Hash Salt
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return res.render('accounts/signUp', {
      errors: [{
        message: 'Something went wrong, please try again'
      }]
    });

    // Hash User Password with generated Salt
    bcrypt.hash(req.body.password, salt, (err, hash) => {
      if (err) return res.render('accounts/signUp', {
        errors: [{
          message: 'Something went wrong, please try again'
        }]
      });

      // Create New User Object and add hashed password
      const newUser = req.body;
      newUser.password = hash;

      // Create New User record in database
      db.User.create(newUser, (err, savedUser) => {
        if (err) return res.render('accounts/signUp', {
          errors: [{
            message: 'Something went wrong, please try again'
          }]
        });

        // Redirect to Login page on Success
        res.redirect('/accounts/login');
      });
    });
  });
};


// --------------------- LOGIN -------------------- //

const newSession = (req, res) => {
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


}

module.exports = {
  createUser,
  newUser,
  newSession,
  createSession,
  deleteSession,
};
