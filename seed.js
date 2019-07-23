const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;

const db = require('./models');
const items = [{
  name:"chicken",
  carbohydrate:"15g",
  fat:"1g"
},
  {
    name:"ketchup",
    fat:"0g",
    carbohydrate:"1g"
  }
]

const plans = [{
  title:"lunch",
  items:[{
    name:"chicken",
    carbohydrate:"15g",
    fat:"1g"
  },
    {
      name:"ketchup",
      fat:"0g",
      carbohydrate:"1g"
    }],
    Calories:"2kcal"
},{
  title:"dinner",
  items:[],
  Calories:"3kcal"
}]

db.Item.collection.insertMany(items,(err,data)=> {
  console.log("added plans for testing");
  mongoose.connection.close;
})

db.Plan.collection.insertMany(plans,(err,data)=> {
  console.log("added items for testing");
  mongoose.connection.close;
})
