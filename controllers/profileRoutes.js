const router = require('express').Router();
const sequelize = require('../config/connection');
const { Meal, User, Category } = require('../models');
const withAuth = require('../utils/auth');

// router.get('/', withAuth, (req, res) => {
//     Meal.findAll({
//       where: {
//         user_id: req.session.user_id
//       },
//       attributes: [
//         'id',
//         'name',
//         'calories',
//       ],
//       include: [
//         {
//           model: User,
//           attributes: ['name']
//         },
//         {
//           model: Category,
//           attributes: ["type"]
//         },
//       ]
//     })
//     .then(mealData => {
//       const meals = mealData.map(meal => meal.get({ plain: true }));
//       const categories = categoryData.map((Category) => Category.get({ plain: true }));
//       res.render('profile', { meals, logged_in: true });
//     })
//      .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//       });
//   });

router.get('/', withAuth, async (req, res) => {
  try{
    const mealData = await Meal.findAll({
      where: {
        user_id: req.session.user_id
      },
      attributes: [
        'id',
        'name',
        'calories',
        'mealDate'
      ],
      include: [
        {
          model: User,
          attributes: ['name']
        },
        {
          model: Category,
          attributes: ["type"]
        },
      ]
    });

    const categoryData = await Category.findAll({
        attributes: [
          "id",
          "type"
        ]
    });

    const meals = mealData.map(meal => meal.get({ plain: true }));
    const categories = categoryData.map((Category) => Category.get({ plain: true }));
    res.render('profile', { meals, categories, logged_in: true });
  }catch(err){
    console.log(err);
    res.status(500).json(err);
  }
})

router.get('/edit/:id', withAuth, (req, res) => {
  Meal.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'name',
      'calories',
      'mealDate'
    ],
    include: [
      {
        model: User,
        attributes: ['name']
      },
      {
        model: Category,
        attributes: ["type"]
      },
    ]
  })
    .then(mealData => {
      if (!mealData) {
        res.status(404).json({ message: 'No meal found with this id' });
        return;
      }
      const meal = mealData.get({ plain: true });
      res.render('edit-meal', { meal, logged_in: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;