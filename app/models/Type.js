'use strict';

module.exports = function (sequelize, DataTypes) {
  const Type = sequelize.define('Type', {
    name: {
      type: DataTypes.STRING,
      unique: true
    }
  });
  return Type;
};