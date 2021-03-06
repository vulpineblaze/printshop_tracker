// config/passport.js

// load all the things we need
// var LocalStrategy    = require('passport-local').Strategy;
// var FacebookStrategy = require('passport-facebook').Strategy;
// var TwitterStrategy  = require('passport-twitter').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// load up the user model
// var User       = require('../app/models/user');

// load the auth variables
var configAuth = require('./auth');

module.exports = function(passport) {

   
passport.serializeUser(function(user, done) {
  // placeholder for custom user serialization
  // null is for errors
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  // placeholder for custom user deserialization.
  // maybe you are going to get the user from mongo by id?
  // null is for errors
  done(null, user);
});


var GithubStrategy = require('passport-github').Strategy;
passport.use(new GithubStrategy({
    clientID: "336a5eeb8d5737cb3fb8",
    clientSecret: "845931607e310294372a914fb4f51c89e6f70e05",
    callbackURL: "http://printshop.fusionbombsderp.com/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));


var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.use(new GoogleStrategy({
    clientID: "895194748840-8trhmq3cpashhel9ccmdidss9lrnr4b1.apps.googleusercontent.com",
    clientSecret: "Jw-k0i6JDmNdTcUs9k84weR8",
    callbackURL: "http://printshop.fusionbombsderp.com/auth/google/callback",
    returnURL: 'http://printshop.fusionbombsderp.com/auth/google/return',
    realm: 'http://printshop.fusionbombsderp.com'
  },
  function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));

};