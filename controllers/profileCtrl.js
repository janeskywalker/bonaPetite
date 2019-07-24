const db = require('../models');

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
    
    res.render('profile/show', { currentUser: foundUser });
  });
}


const showPlan = (req, res) => {
      db.Trainer.find({})
          .populate('pokemon')
          .exec((error, foundTrainers) => {
              if (error) return response.sendErrorResponse(res, error);
              response.sendResponse(res, foundTrainers);
          });
  }

const newPlan = (req, res) => {
  if(!req.session.currentUser) {
    return res.redirect('/accounts/login');
  }

  console.log('New Plan')

  db.User.findById(req.session.currentUser._id, (error, foundUser) => {
    if (error) {
      return res.render('index',{errors: [{message:'User id is not found in database.'}]});
    }

    console.log('currentUser: ', foundUser)
    
    res.render('profile/newPlan', { currentUser: foundUser });
  });
}




module.exports = {
  profile,
  newPlan,
  //showPlan
}
