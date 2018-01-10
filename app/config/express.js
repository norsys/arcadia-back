'use strict';

const morgan = require('./morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const expressSettings = app => {

  app.use(cors());
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({ extended: true ,limit: '50mb'}));

  // Skip logging on test mode
  if (app.get('env') !== 'test') {
    app.use(morgan());
  }

};

module.exports = expressSettings;
