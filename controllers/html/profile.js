const router = require('express').Router();
const { Meal, User, Category } = require('../../models');
const withAuth  = require('../../utils/auth');

router.get('/', withAuth, (req, res) => {
  Meal.findAll({
    where: {
      id: req.session.user_id
    },
    attributes: [
      'id',
      'name',
      'calories'
    ],
    include: [
      {
        model: User,
        attributes: ['name']
      }
    ]
  })
    .then(mealData => {
      const meals = mealData.map(meal => meal.get({ plain: true }));
      res.render('profile', { meals, logged_in: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

module.exports = router;
