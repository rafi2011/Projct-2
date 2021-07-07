const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Meal extends Model {};

Meal.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    calories: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
          model: 'user',
          key: 'id'
      }
  }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'meal',
  }
);

module.exports = Meal;
