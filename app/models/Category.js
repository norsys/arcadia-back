'use strict';

const util = require('../components/util');

module.exports = function (sequelize, DataTypes) {
  const Category = sequelize.define('Category', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING
    }
  });
  Category.associate = function (models) {
    Category.hasMany(models.Challenge, {as: 'Challenges',foreignKey: 'category_id'})       
  }
  return Category;
};