var mongoose = require("mongoose");
var passport = require("passport");
var User = require("../models/user.js");
var bcrypt = require("bcrypt");
var userController = {};

// Restrict access to root page
userController.home = function(req, res) {
  res.render("index", { user: req.user });
};

// Go to registration page
userController.register = function(req, res) {
  res.render("signup");
};







userController.doRegister = function (req, res) {
  var db = req.db;
var data = req.body;

  var userCollection = db.collection("user");
  var data = req.body;





  User.register(new User({ username: data.username }), data.password, function(
    err,
    user
  ) {
    if (err) {
      console.log(err);
      return res.render("index", user);
    }
    res.redirect('/login');
  });

      // });

 
};


// Go to login page
userController.login = function(req, res) {
  res.render("signin");
};


// Post login


userController.doLogin = function(req, res) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { console.log("Error",err); }
    if (!user) { 
   
      return res.redirect('/'); }

    // req / res held in closure
    req.logIn(user, function(err) {
      if (err) { console.log("Error",err);return 0; }
      return res.cookie("userid", user.username);;
    });

  })(req, res);

};
// logout
userController.logout = function(req, res) {
  req.logout();
  res.redirect("/");
};

module.exports = userController;


