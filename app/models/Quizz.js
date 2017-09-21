'use strict';

const util = require('../components/util');

module.exports = function (sequelize, DataTypes) {
  const Quizz = sequelize.define('Quizz', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING
    }
  });
  Quizz.associate = function (models) {
    Quizz.hasMany(models.Category, {as: 'Categories',foreignKey: 'quizz_id'})    
  }
  return Quizz;
};