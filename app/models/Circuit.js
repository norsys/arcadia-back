'use strict';

module.exports = function (sequelize, DataTypes) {
  const Circuit = sequelize.define('Circuit', {
    started: {
      type: DataTypes.BOOLEAN
    },
    finished: {
      type: DataTypes.BOOLEAN
    }
  });
  Circuit.associate = function (models) {
    Circuit.hasMany(models.Response, { as: 'Responses', foreignKey: 'response_id' });
  };
  return Circuit;
};