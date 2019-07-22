// Modules
const express = require('express');

// Instance Modules
const app = express();
const routes = require('./routes');

// Global Variables
const PORT = 3000;

//Middleware
app.use(express.json());


//main page
app.use('/',routes.main);

// app.use('/signup',routes.signUp);
// app.use('/profile',routes.profile);

app.listen(PORT, ()=> {
  console.log("Server is working");
})
