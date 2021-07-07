const User = require('./User');
const Meal = require('./Meal');

// User to Meal
User.hasMany(Meal, {
  foreignKey: 'userID',
  onDelete: 'cascade',
  hooks:true
});

// Meal to User
Meal.belongsToMany(User, {
  through: 'user_id'
});


module.exports = { Meal, User };
