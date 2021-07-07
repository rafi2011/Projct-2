const router = require('express').Router();
const { Meal, User, Category } = require('../models');
const withAuth  = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const mealData = await Meal.findAll({
      include: [
        {
          model: User,
          model: Category,
          attributes: ['name'],
        },
      ],
    });

    const Meals = mealData.map((Meal) => Meal.get({ plain: true }));

    res.render('homepage');
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.get('/Meal/:id', async (req, res) => {
  try {
    const mealData = await Meal.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const Meal = mealData.get({ plain: true });

    res.render('Meal', {
      ...Meal,
        logged_in: req.session.logged_in
      });
  } catch (err) {
  res.status(500).json(err);
  }
});

router.get('/profile', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Meal }],
    });
 
    const user = userData.get({ plain: true });

    res.render('profile', {
      ...userData,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
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
