'use strict';

module.exports = function (sequelize, DataTypes) {
  const Challenge = sequelize.define('Challenge', {
    question: {
      type: DataTypes.STRING
    },
    response: {
      type: DataTypes.STRING
    },
    isEnable: {
      type: DataTypes.BOOLEAN
    }
  });
  Challenge.associate = function (models) {
    Challenge.belongsTo(models.Type, { foreignKey: 'type_id', targetKey: 'id' });
  };
  return Challenge;
};