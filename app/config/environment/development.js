'use strict';

module.exports = {
  port: process.env.PORT || 3000,
  imagesFolder: './/tmp',
  database: {
    dialect: 'sqlite',
    storage: 'db.development.sqlite',
    logging: console.log,
    syncForce: false
  },

  accessToken: {
    secret: 's3cr2t-develobment',
    expireSeconds: 60 * 60 * 24 * 30 * 12 // 12 months
  },

  checkList: [
  ]

};
