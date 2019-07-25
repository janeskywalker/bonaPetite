const db = require('../models');

// find user's profile on db and render show page and plans
const profile = (req,res) => {
  if(!req.session.currentUser) {
    return res.redirect('/accounts/login');
  }
  // console.log('Profile') temp

  db.User.findById(req.session.currentUser._id, (error, foundUser) => {
    if (error) {
      return res.render('index',{errors: [{message:'User id is not found in database.'}]});
    }
    // console.log('currentUser: ', foundUser) temp
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
// Render search page
const newSearch = (req, res) => {
  if(!req.session.currentUser) {
    return res.redirect('/accounts/login');
  } else {
    console.log(req.session.currentUser);
    res.render('profile/search', { currentUser: req.session.currentUser });
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

const addNewPlan = (req,res) => {
  const newPlan = req.body;
  // db.User.findById({_id: req.body.id},(e,foundUser)=> {
  //   // if(e) return console.log(e);
  //   foundUser.push()
  //   console.log("updating");
  // })
  //
  // console.log({body:req.body.id});
  // req.session.currentUser._id
  userId = req.session.currentUser._id;
  db.Plan.create(newPlan,(err,createdPlan)=> {
    db.User.findById(userId,(e,foundUser)=> {

      foundUser.plans.push(newPlan);
      foundUser.save()
      res.json({foundUser})
    })
  })


}

const updateCalories = (req,res) => {
  const newGoal = req.body;
  userId = req.session.currentUser._id;
    db.User.findById(userId,(e,foundUser)=> {
      foundUser.goal = (newGoal);
      foundUser.save()
      res.json({foundUser})
    })
}

module.exports = {
  profile,
  newPlan,
  addNewPlan,
  newSearch,
  updateCalories
  //showPlan
}
