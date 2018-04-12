'use strict';

module.exports = function (sequelize, DataTypes) {
  const Question = sequelize.define('Question', {
    question: {
      type: DataTypes.STRING
    },
    response: {
      type: DataTypes.STRING
    },
    inputType: {
      type: DataTypes.ENUM('CAMERA','TEXT','MULTI','CHECK','BOOLEAN')
    }
     
  });
  Question.associate = function (models) {
    Question.belongsTo(models.Category, { foreignKey: 'category_id', targetKey: 'id' });
    Question.belongsTo(models.Agency, { foreignKey: 'agence_id', targetKey: 'id' });

  };

  return Question;
};