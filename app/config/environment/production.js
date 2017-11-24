'use strict';

module.exports = {
  port: process.env.PORT || 80,

  database: {
    username: process.env.DB_USER || 'arcadia',
    password: process.env.DB_PASS ||'arcadia',
    database: process.env.DB_NAME ||'arcadia_back',
    host: process.env.DB_HOST ||'127.0.0.1',
    port: process.env.DB_PORT ||32217,
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
