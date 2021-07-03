const router = require('express').Router();
const { Meal, User, Category } = require('../../models');
const withAuth  = require('../../utils/auth');


router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

module.exports = router;
