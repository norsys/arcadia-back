'use strict';

module.exports = {
  port: process.env.PORT || 80,
  imagesFolder: './/tmp',
  database: {
    username:  'root',
    password: 'root',
    database: 'arcadia',
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql',
    logging: false,
    syncForce: false
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
