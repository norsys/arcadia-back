'use strict';
const fs = require('fs');
const config = require('../../../config/environment');
const path = require('path');
module.exports = {

  show(req, res) {
    console.log(req.params.name);
    try {
      var image = fs.readFileSync(path.join(config.imagesFolder, req.params.name));

      res.writeHead(200, {
        'Content-Type': 'image',
        'Content-Length': image.length
      });
      res.end(image, 'binary');

    } catch (err) {
      console.log(err);
      res.writeHead(500);
    }
  },
  create(options) {
    var base64Data = options.image.replace(/^data:image\/.*;base64,/, '');
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
