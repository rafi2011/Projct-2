const User = require('./User');
const Meal = require('./Meal');

// User to Meal
User.hasMany(Meal, {
  foreignKey: 'user_id',
  onDelete: 'cascade',
  hooks:true
});

// Meal to User
Meal.belongsTo(User, {
  foreignKey: "user_id"
});


module.exports = { Meal, User };
