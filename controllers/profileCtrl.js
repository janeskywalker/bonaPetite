const db = require('../models');

// find user's profile on db and render show page and plans
const profile = (req,res) => {
  if(!req.session.currentUser) {
    return res.redirect('/accounts/login');
  }
  console.log('Profile')

  db.User.findById(req.session.currentUser._id, (error, foundUser) => {
    if (error) {
      return res.render('index',{errors: [{message:'User id is not found in database.'}]});
    }
    console.log('currentUser: ', foundUser)
    // found user, render user name and plans
    res.render('profile/show', { currentUser: foundUser });
  });
}


// render newPlan page
const newPlan = (req, res) => {
  if(!req.session.currentUser) {
    return res.redirect('/accounts/login');
  } else {
    console.log(req.session.currentUser);
    res.render('profile/newPlan', { currentUser: req.session.currentUser });
  }
  //
  // console.log('New Plan')
  //
  // db.User.findById(req.session.currentUser._id, (error, foundUser) => {
  //   if (error) {
  //     return res.render('index',{errors: [{message:'User id is not found in database.'}]});
  //   }
  //   console.log(foundUser);
  //   console.log('currentUser: ', foundUser)
  //
  // });
}




module.exports = {
  profile,
  newPlan,
  //showPlan
}
