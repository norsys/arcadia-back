'use strict';

const util = require('../components/util');

module.exports = function (sequelize, DataTypes) {
  const Agency = sequelize.define('Agency', {
    name: {
      type: DataTypes.STRING,
      unique: true
    }
  });
  return Agency;
};