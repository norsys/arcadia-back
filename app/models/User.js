'use strict';

const util = require('../components/util');

module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define('User', {

    firstName: {
      type: DataTypes.STRING
    },
    lastName: {
      type: DataTypes.STRING
    },
    nickName: {
      type: DataTypes.STRING
    },
    sex: {
      type: DataTypes.STRING
    },
    agenceId: {
      type: DataTypes.STRING
    },
    city: {
      type: DataTypes.STRING
    },
    avatar: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: [6, 50]
      },
      set(val) {
        this.setDataValue('password', util.passwordHash(val));
      }
    },
    accessToken: {
      type: DataTypes.STRING
    },
    gameIsStarted: {
      type: DataTypes.BOOLEAN
    },
    startedDate: {
      type: DataTypes.STRING
    }
  });

  User.associate = function (models) {
    User.belongsTo(models.Agency, { foreignKey: 'agence_id', targetKey: 'id' });
  };
  return User;
};