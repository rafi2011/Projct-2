const User = require('./User');
const Meal = require('./Meal');

// User to Meal


// Meal to User
Meal.belongsToMany(User, {
  through: 'UserMeal'
});


module.exports = { Meal, User };
