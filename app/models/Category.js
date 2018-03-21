'use strict';

module.exports = function (sequelize, DataTypes) {
  const Category = sequelize.define('Category', {
    name: {
      type: DataTypes.STRING
    }
  });
  Category.associate = function (models) {
    Category.hasMany(models.Question, { as: 'Questions', foreignKey: 'category_id' });
  };
  return Category;
};