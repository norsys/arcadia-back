'use strict';

module.exports = function (sequelize, DataTypes) {
  const Category = sequelize.define('Category', {
    name: {
      type: DataTypes.STRING
    },
      timestamps: false,
  });
  Category.associate = function (models) {
    Category.hasMany(models.Question, { as: 'Questions', foreignKey: 'category_id' });
  };
  return Category;
};