// Modules
const express = require('express');

// Instance Modules
const app = express();
const routes = require('./routes');
app.set('view engine','ejs');

// Global Variables
const PORT = 3000;

//Middleware
app.use(express.json());


//main page
app.get('/',(req,res)=> {
  res.render('index');
});

app.use('/accounts',routes.signUp);
// app.use('/profile',routes.profile);

app.listen(PORT, ()=> {
  console.log("Server is working");
})
