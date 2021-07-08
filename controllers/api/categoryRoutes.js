const router = require('express').Router();
const { Meal, User, Category } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

router.get("/", withAuth, async (req, res) => {
  try{
    const categoryData = Category.findAll({
    attribute:[
      "id",
      "type"
    ]
  })

  res.json(categoryData);
  } catch(err){
    res.status(500).json(err);
  }
});

router.get("/:id", withAuth, async (req, res) => {
  try{
    const categoryData = Category.findOne({
      where: {
        id: req.params.id
      },
      attribute:[
        "id",
        "type"
      ]
  })

  res.json(categoryData);
  } catch(err){
    res.status(500).json(err);
  }
});

router.post('/', withAuth, async (req, res) => {
  try {
    const newMeal = await Category.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newMeal);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', withAuth, (req, res) => {
  Meal.update(req.body,
      {
          where: {
              id: req.params.id
          }
      }
  )
  .then(categoryData => {
      if (!categoryData) {
          res.status(404).json({ message: 'No meal found with this id' });
          return;
      }
      res.json(categoryData);
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err)
  });
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No meal found with this id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
