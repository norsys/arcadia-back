"use strict";

module.exports = {
  port: process.env.PORT || 80,

  database: {
    username: process.env.DB_NAME || 'root',
    password: process.env.DB_USER ||'root',
    database: process.env.DB_PASS ||'arcadia_back',
    host: process.env.DB_HOST ||'127.0.0.1',
    dialect: 'mysql',
    logging: false,
    syncForce: true
  },

  apiKey: process.env.API_KEY || 'arcadia_backApiKey',

  accessToken: {
    secret: 's3cr2t-producsion',
    expireSeconds: 60 * 60 * 24 * 30 * 12 // 12 months
  },

  checkList: [
    'API_KEY',
    'DB_NAME',
    'DB_USER',
    'DB_PASS',
    'DB_HOST'
  ]
};
