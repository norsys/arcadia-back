'use strict';

const util = require('../components/util');

module.exports = function (sequelize, DataTypes) {
  const Type = sequelize.define('Type', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING
    }
  });
  return Type;
};