const User = require('./User');
const Meal = require('./Meal');
const Category = require('./Category');

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

Category.hasMany(Meal, {
  foreignKey: "category_id"
})

Meal.belongsTo(Category, {
  foreignKey: "category_id"
});

module.exports = { Meal, User, Category};
