'use strict';
const fs = require('fs');
const config = require('../../../config/environment');
const path = require('path');
module.exports = {

  show(req, res, options) {
    console.log(options);
    try {
      var image = fs.readFileSync(path.join(config.imageFolder, options.name));
      res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': image.length
      });
      res.end(image);
    } catch (err) {
      res.writeHead(500);
    }
  },
  create(options) {
    var base64Data = options.image.replace(/^data:image\/jpeg;base64,/, '');
    console.log(path.join(config.imagesFolder, options.name));
    try {
      fs.writeFileSync(path.join(config.imagesFolder, options.name), base64Data, 'base64');
      return Promise.resolve()
        .then(() => Object.assign({ statusCode: 200 }));
    } catch (err) {
      return Promise.resolve()
        .then(() => Object.assign({ statusCode: 500 }));
    }
  }
};
