'use strict';

const util = require('../components/util');

module.exports = function (sequelize, DataTypes) {
  const Agency = sequelize.define('Agency', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING
    }
  });
  return Agency;
};