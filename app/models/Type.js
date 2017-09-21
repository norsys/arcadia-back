'use strict';

const util = require('../components/util');

module.exports = function (sequelize, DataTypes) {
  const Type = sequelize.define('Type', {
    name: {
      type: DataTypes.STRING,
      unique: true
    }
  });
  return Type;
};