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
            type: DataTypes.ENUM('CAMERA','TEXT')
        }
    });
    Question.associate = function (models) {
        Question.belongsTo(models.Category, { foreignKey: 'category_id', targetKey: 'id' });

    };

    return Question;
};