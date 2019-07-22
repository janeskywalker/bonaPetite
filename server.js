// Modules
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const db = require('./models')
console.log(db)
// Instance Modules
const app = express();
const routes = require('./routes');
app.set('view engine','ejs');

// Global Variables
const PORT = 3000;

//Middleware
app.use(express.json());

app.use(express.static(`${__dirname}/public`));


// BodyParser Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// use the express Session
app.use(session({
  secret: 'thi is used to encryp the sesscion obj!',
  resave: false,
  saveUninitialized: false // Only save the session if a property has been added to req.session
}));


//main page
app.get('/',(req,res)=> {
  res.render('index');
});

app.use('/accounts',routes.signUp);
// app.use('/profile',routes.profile);

app.listen(PORT, ()=> {
  console.log("Server is working");
})
