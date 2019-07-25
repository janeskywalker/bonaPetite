// Modules
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const PORT = 3000;

// routes
const routes = require('./routes');

// Set View Engine
app.set('view engine', 'ejs');


// ------------------------------- MIDDLEWARE  -------------------------------- //

// Serve Public Directory
app.use(express.static(`${__dirname}/public`));

// BodyParser Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// use the express Session
app.use(session({
  secret: 'watashiwa secret',
  resave: false,
  saveUninitialized: false // Only save the session if a property has been added to req.session
}));

// Method Override
// app.use(methodOverride('_method'));

// Custom Logger Middleware
// app.use((req, res, next) => {
//   const url = req.url;
//   const method = req.method;
//   const requestedAt = new Date().toLocaleString();
//   console.table({ url, method, requestedAt });
//   next();
// });


// ------------------------------- HTML ENDPOINTS -------------------------------- //
//main page
app.get('/',(req,res)=> {
  res.render('index');
});

// app.get('/search',(req,res)=> {
//   res.render('profile/search');
// })




// acountes routes
app.use('/accounts',routes.accounts);

// profile routes
app.use('/profile',routes.profile);


// ------------------------------- API ENDPOINTS -------------------------------- //




// ------------------------------- START SERVER  -------------------------------- //
app.listen(PORT, ()=> {
  console.log("Server is working");
})
