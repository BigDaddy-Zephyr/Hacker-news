var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost/EmployeeDB';
var bcrypt=require('bcrypt');
var mongoose=require('mongoose');
var app=express();
var auth = require("../controllers/AuthController.js");
var User = require("../models/user.js");
mongoose.connect('mongodb://localhost/node-auth')
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));


var passport = require('passport');

var LocalStrategy = require('passport-local').Strategy;

router.use(passport.initialize());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(passport.initialize());
app.use(passport.session());

// route for register action
router.post('/register', auth.doRegister);
router.post('/login', auth.doLogin)

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// router.get('/comments', function(req, res, next) {
//   res.render('comments', { title: 'Express' });
// });



// router.get('/signup', function(req, res, next) {
//   res.render('signup', { title: 'SignUp' });
// });


// router.get('/ask', function(req, res, next) {
//   res.render('ask', { title: 'Express' });
// });

router.get('/login',function(req, res, next) {
  res.render('signin');
});
router.post('/login', auth.doLogin);


// router.get('/signin', function(req, res, next) {
//   res.render('signin', { title: 'SignIn' });
// });
router.get('/register', auth.register);
router.get('/signin', auth.login);






module.exports = router;
