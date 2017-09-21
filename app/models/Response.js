'use strict';

const util = require('../components/util');

module.exports = function (sequelize, DataTypes) {
  const Response = sequelize.define('Response', {
    response: {
      type: DataTypes.STRING,
    }

  });
  Response.associate = function (models) {
    Response.belongsTo(models.Challenge, { foreignKey: 'challenge_id', targetKey: 'id' });
  }
  return Response;
};