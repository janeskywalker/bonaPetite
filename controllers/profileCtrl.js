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
    let calories = 0;
    for(item of foundUser.items) {
      if(item.calories) {
        calories += parseInt(item.calories);
      }
    }
    // console.log('currentUser: ', foundUser) temp
    // found user, render user name and plans
    res.render('profile/show', { currentUser: foundUser, calories });
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
  const newItem = req.body;
  console.log(req.body)
  // db.User.findById({_id: req.body.id},(e,foundUser)=> {
  //   // if(e) return console.log(e);
  //   foundUser.push()
  //   console.log("updating");
  // })
  //
  // console.log({body:req.body.id});
  // req.session.currentUser._id
  userId = req.session.currentUser._id;
    db.User.findById(userId,(e,foundUser)=> {
      console.log(newItem);
      foundUser.items.push(newItem);
      foundUser.save()
      res.json({foundUser})
    })


}

const updateCalories = (req,res) => {
  console.log(req.body)
  const newGoal = req.body.goal;
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
