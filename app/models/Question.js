'use strict';

module.exports = function (sequelize, DataTypes) {
  const Question = sequelize.define('Question', {
    question: {
      type: DataTypes.STRING
    },
    response: {
      type: DataTypes.STRING
    },
    isEnable: {
      type: DataTypes.BOOLEAN
    },
    inputType: {
      type: DataTypes.ENUM('CAMERA')
    }
  });
  return Question;
};