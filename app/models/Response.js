'use strict';

module.exports = function (sequelize, DataTypes) {
  const Response = sequelize.define('Response', {
    response: {
      type: DataTypes.STRING,
    },
      timestamps: false,

  });
  Response.associate = function (models) {
    Response.belongsTo(models.Question, { foreignKey: 'question_id', targetKey: 'id' });
    Response.belongsTo(models.User, { foreignKey: 'user_id', targetKey: 'id' });
  };
  return Response;
};