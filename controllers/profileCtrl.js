// const db = require('./models');
//
// const profile = (req,res) => {
//   if(!req.session.currentUser) {
//     return res.redirect('/accounts/login');
//   }
//
//   db.User.findById(req,session,currentUser._id (error, foundUser) => {
//     if (error) return res.render('index',{errors: [{message:'Something went wrong, please try again'}]});
//
//     res.render('profile/show', {currentUser: foundUser});
//   });
//
// }
// 
// module.exports = {
//   showProfile
// }
