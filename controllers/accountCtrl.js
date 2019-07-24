const db = require('../models');
const bcrypt = require('bcryptjs');

// --------------------- LOGIN -------------------- //


// signup
// serve New User Form
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
      console.log({
        newUser
      })

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
        res.redirect('/accounts/login');
      });
    });
  });
};


// login
// serve the login page 
const newSession = (req, res) => {
  res.render('accounts/login');
}


// POST Login
// authentication, verify if the user is the the one claimed
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
      db.User.update({ _id: foundUser._id }, { plans: [{
        title:"lunch",
        items:[
          {
            name:"chicken",
            carbohydrate:"15g",
            fat:"1g"
          },
          {
            name:"ketchup",
            fat:"0g",
            carbohydrate:"1g"
          }
        ],
        Calories:"2kcal"
      }, {
        title:"dinner",
        items:[],
        Calories:"3kcal"
      }]}, (err, raw) => {
        console.log('err: ', err)
        console.log('raw: ', raw)

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

          // verified user, serve profile page 
          return res.redirect('/profile');
        } else {
          return res.render('accounts/login', {
            errors: [{
              message: 'Username or password is incorrect'
            }]
          })
        }
      })
    });
  });
}


//logout
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
  newUser,
  newSession,
  createSession,
  deleteSession,
  createUser
};
