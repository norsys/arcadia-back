'use strict';

module.exports = function (sequelize, DataTypes) {
  const Agency = sequelize.define('Agency', {
    name: {
      type: DataTypes.STRING,
      unique: true
    },
      createdAt: false
  });
  return Agency;
};