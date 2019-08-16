const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('passport')
router.get('/users/signin', (req, res) => {
  res.render('users/signIn')
});

router.post('/users/signin', passport.authenticate('local',{
  successRedirect: '/notes',
  failureRedirect: '/users/signin',
  failureFlash: true
}));

router.get('/users/signup', (req, res) => {
  res.render('users/signUp')
});

router.post('/users/signup', async(req, res) => {
  const { name, email, password, confirm_password } = req.body
  const errors =[]
  if(name.length <=0){
    errors.push({text: 'Please insert your Name'})
  }
  if(password !== confirm_password){
    errors.push({text: "Password don't match "})
  }
  if(password.length < 4){
    errors.push({text: 'Password must be at least 4 characters'})
  }
  if(errors.length){
    res.render('users/signup',{ errors, name, email, password, confirm_password })
  }else{
    const emailUser = await User.findOne({email: email})
    if(emailUser){
      req.flash('error_msg', 'The email is already in use')
      res.redirect('/users/signup')
    };
    const newUser = new User({ name, email, password });
    newUser.password = await newUser.encryptPassword(password)
    await newUser.save();
    req.flash('success_msg', 'You are registered');
    res.redirect('/users/signin');
  }
});

module.exports = router