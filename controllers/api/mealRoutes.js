const router = require('express').Router();
const { Meal, User } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

router.get("/", withAuth, async (req, res) => {
  try{
    const mealData = Meal.findAll({
    attribute:[
      "id",
      "name",
      "calories"
    ],
    include: [
      {
        model: User,
        attributes: ["name"]
      }
    ]
  })

  res.json(mealData);
  } catch(err){
    res.status(500).json(err);
  }
});

router.get("/:id", withAuth, async (req, res) => {
  try{
    const mealData = Meal.findOne({
      where: {
        id: req.params.id
      },
      attribute:[
        "id",
        "name",
        "calories"
      ],
      include: [
        {
          model: User,
          attributes: ["name"]
        }
      ]
  })

  res.json(mealData);
  } catch(err){
    res.status(500).json(err);
  }
});

router.post('/', withAuth, async (req, res) => {
  try {
    const newMeal = await Meal.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newMeal);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const mealData = await Meal.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!mealData) {
      res.status(404).json({ message: 'No meal found with this id!' });
      return;
    }

    res.status(200).json(mealData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
