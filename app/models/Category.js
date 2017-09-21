'use strict';

module.exports = function (sequelize, DataTypes) {
  const Category = sequelize.define('Category', {
    name: {
      type: DataTypes.STRING
    }
  });
  Category.associate = function (models) {
    Category.hasMany(models.Challenge, { as: 'Challenges', foreignKey: 'category_id' });
  };
  return Category;
};