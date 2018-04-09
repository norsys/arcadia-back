'use strict';

const User = require('../../../lib/User');
const errors = require('../../../components/errors');
const crypto = require('crypto');
const util = require('../../../components/util');
var nodemailer = require('nodemailer');

module.exports = {
  index(options) {
    return Promise.resolve()
      .then(() => User.index(options));
  },
  show(options) {
    return Promise.resolve()
      .then(() => User.show(options))
      .then(user => {
        if (!user) return Promise.reject(errors.NotFound('user is not found'));
        return user;
      });
  },
  showByEmail(options) {
    return Promise.resolve()
      .then(() => User.showByEmail(options))
      .then(user => {
        if (!user) return Promise.reject(errors.NotFound('user is not found'));
        return user;
      });
  },
  create(options) {
    return Promise.resolve()
      .then(() => User.create(options))
      .then(user => Object.assign(user, { statusCode: 201 }))
      .catch(err => {
        if (err === errors.code('Conflict'))
          return Promise.reject(errors.Conflict(`${options.name} is already existed`));
        throw err;
      });
  },
  update(options) {
    return Promise.resolve()
      .then(() => User.update(options))
      .catch(err => {
        if (err === errors.code('NotFound'))
          return Promise.reject(errors.NotFound(`user id: ${options.id} is not found`));
        throw err;
      });
  },
  destroy(options) {
    return Promise.resolve()
      .then(() => User.destroy(options))
      .then(() => ({ statusCode: 204 }))
      .catch(err => {
        if (err === errors.code('NotFound'))
          return Promise.reject(errors.NotFound(`user id: ${options.id} is not found`));
        throw err;
      });
  },
  resetPassword(options) {
    options.password = Math.random().toString(36).slice(-8);
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'arcadianorsys@gmail.com',
        pass: 'MDP2Naf*'
      }
    });
    var mailOptions = {
      from: 'arcadianorsys@gmail.com',
      to: options.email,
      subject: 'Changement du mot de passe sur Arcadia',
      text: 'Bonjour '+options.nickName +' , '+
              '  \n \n Vous-avez réinitialiser le mot de passe  '+
              '  \n Votre nouveau mot de passe sur la plateforme Arcadia est : '+options.password + 
              ' \n \n \n \n Group Norsys '
    };
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    console.log('new password after reset >> = == = = = = = = =' + options.password)
    return Promise.resolve()
      .then(() => User.updatePassword(options))
      .catch(err => {
        if (err === errors.code('NotFound'))
          return Promise.reject(errors.NotFound(`user id: ${options.id} is not found`));
        throw err;
      });
      
  }
};
