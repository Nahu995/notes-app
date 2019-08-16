const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User  ')

passport.use(new LocalStrategy({
  usernameField: 'email',

}, async (email, password, done) => { 
  const user = await User.findOne({email: email});
  if(!user) {
    //        error, user , { message : string}
    return done(null, false, { message: 'Not user found'});
  } else {
    const match = await User.matchPassword(password);
    if(match) {
      return done(null, user);
    } else {
      return done(null, false, {message: 'Incorrect password'});
    }
  }
}));