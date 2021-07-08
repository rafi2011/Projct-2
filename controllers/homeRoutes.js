const router = require('express').Router();
const { Meal, User, Category } = require('../models');
const withAuth  = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const mealData = await Meal.findAll({
      attributes: [
        "id",
        "name",
        "calories"
      ],
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Category,
          attributes: ["type"]
        },
      ],
    });

    const meals = mealData.map((Meal) => Meal.get({ plain: true }));

    res.render('homepage',{
      meals,
      logged_in: req.session.logged_in
    } );
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.get('/meals/:id', async (req, res) => {
  try {
    const mealData = await Meal.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        "id",
        "name",
        "calories"
      ],
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Category,
          attributes: ["type"]
        },
      ],
    })

    if (!mealData) {
      res.status(404).json({ message: 'No meal found with this id' });
      return;
    }

    const meal = mealData.get({ plain: true });

    res.render('single-meal', {
      meal,
      logged_in: req.session.logged_in
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
