const db = require('../models');

// find user's profile on db and render show page and plans
const profile = (req, res) => {
  if (!req.session.currentUser) {
    return res.redirect('/accounts/login');
  }

  db.User.findById(req.session.currentUser._id, (error, foundUser) => {
    if (error) {
      return res.render('index', {
        errors: [{
          message: 'User id is not found in database.'
        }]
      });
    }
    let calories = 0;
    for (item of foundUser.items) {
      if (item.calories) {
        calories += parseInt(item.calories);
      }
    }
    res.render('profile/show', {
      currentUser: foundUser,
      calories
    });
  });
}

// render newPlan page
const newPlan = (req, res) => {
  if (!req.session.currentUser) {
    return res.redirect('/accounts/login');
  } else {
    console.log(req.session.currentUser);
    res.render('profile/newPlan', {
      currentUser: req.session.currentUser
    });
  }
}
// Render search page
const newSearch = (req, res) => {
  if (!req.session.currentUser) {
    return res.redirect('/accounts/login');
  } else {
    console.log(req.session.currentUser);
    res.render('profile/search', {
      currentUser: req.session.currentUser
    });
  }
}

const addNewPlan = (req, res) => {
  const newItem = req.body;
  userId = req.session.currentUser._id;
  db.User.findById(userId, (e, foundUser) => {
    console.log(newItem);
    foundUser.items.push(newItem);
    foundUser.save()
    res.json({
      foundUser
    })
  })
}

const updateCalories = (req, res) => {
  console.log(req.body)
  const newGoal = req.body.goal;
  userId = req.session.currentUser._id;
  db.User.findById(userId, (e, foundUser) => {
    foundUser.goal = (newGoal);
    foundUser.save()
    res.json({
      foundUser
    })
  })
}

const getItems = (req, res) => {
  db.User.findById(req.session.currentUser._id, (e, foundUser) => {
    console.log(foundUser.items);
  })
}
const deleteItem = (req, res) => {
  console.log("item id to delete", req.params.id)
  console.log("currentUser.id", req.session.currentUser._id)
  db.User.findById(req.session.currentUser._id, (e, foundUser) => {
    console.log("curren user.items", foundUser.items)
    foundUser.items.forEach((item, i) => {
      console.log('item id:', item._id)
      if (item._id == req.params.id) {
        console.log("found item:", item)
        foundUser.items.splice(i, 1);
        foundUser.save()
        res.sendStatus(200);
      }
    })
  })
}

module.exports = {
  profile,
  newPlan,
  addNewPlan,
  newSearch,
  updateCalories,
  getItems,
  deleteItem
}
