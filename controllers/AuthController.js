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
  // console.log("db ----> ", db)
var data = req.body;
// hashingpass(req);
  var userCollection = db.collection("user");

  console.log(".//./././././././././.",data.username,data.id,data.password)


  var data = req.body;



console.log("////////////////////////",req.password);
  console.log(data);
  var hashedpassword;

 bcrypt.hash(data.password, 10, function(err, hash) {
          if (err) {
            console.log("Error in hashing")
          };

          console.log("%%%%%%%%%%%%%%%%%%%%%%%%",hash);
          // override the cleartext password with the hashed one
       hashedpassword=hash;
          // data.password=hashedpassword;
  console.log("------", data.id, data.password);

  User.register(new User({ username: data.username, name:data.name }), data.password, function(
    err,
    user
  ) {
    if (err) {
      console.log(err);
      return res.render("index", user);
    }
    console.log("!@!@!@!@@@@@@@@@@@@@@@",user);
    console.log("lklklklkl", req.body.id, req.body.password);
    res.redirect('/login');
  });

      });

 
};


// Go to login page
userController.login = function(req, res) {
  res.render("signin");
};


// Post login


userController.doLogin = function(req, res) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { console.log("KLKLKL",err); }
    if (!user) { return res.redirect('/'); }

    // req / res held in closure
    req.logIn(user, function(err) {
      if (err) { return 0; }
      return res.send(user);
    });

  })(req, res);

};
// logout
userController.logout = function(req, res) {
  req.logout();
  res.redirect("/");
};

module.exports = userController;


