const router = require('express').Router();
const { Meal, User, Category } = require('../../models');
const withAuth  = require('../../utils/auth');

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
