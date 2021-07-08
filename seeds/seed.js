const sequelize = require('../config/connection');
const { User, Meal, Category} = require('../models');

const userData = require('./userData.json');
const mealData = require('./mealData.json');
const categoryData = require('./categoryData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  // seed users
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  // seed categories
  const categories = await Category.bulkCreate(categoryData);

  // add meals with Users and Categories
  for (const meal of mealData) {
    await Meal.create({
      ...meal,
      user_id: users[Math.floor(Math.random() * users.length)].id
    });
  }

  

  process.exit(0);
};

seedDatabase();
