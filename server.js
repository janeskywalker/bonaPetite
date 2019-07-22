// Modules
const express = require('express');

// Instance Modules
const app = express();
// const routes = require('./routes');

// Global Variables
const PORT = 3000;

//Middleware
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.get('/',(req,res)=> {
  console.log("hello");;
});

//main page
// app.use('/',routes.views);
//
// app.use('/signup',routes.signup);
// app.use('/profile',routes.profile);

app.listen(PORT, ()=> {
  console.log("Server is working");
})
