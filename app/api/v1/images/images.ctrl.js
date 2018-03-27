'use strict';
const fs = require('fs');
const config = require('../../../config/environment');
const path = require('path');
const im = require('imagemagick');

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
    console.log('options :' + JSON.stringify(options));
    var base64Data = options.image.replace(/^data:image\/.*;base64,/, '');
    if (!fs.existsSync(config.imagesFolder)){
      fs.mkdirSync(config.imagesFolder);
    }
    try {
      fs.writeFileSync(path.join(config.imagesFolder, options.name + '.tmp'), base64Data, 'base64');
      im.resize({
        srcData: fs.readFileSync(path.join(config.imagesFolder, options.name + '.tmp'), 'binary'),
        width:   256
      }, function(err, stdout){
        if (err) throw err;
        fs.writeFileSync(path.join(config.imagesFolder, options.name), stdout, 'binary');
        console.log('resized image to fit within 256x256px');
      });
      return Promise.resolve()
        .then(() => Object.assign({ statusCode: 200 }));
    } catch (err) {
      console.log(err);
      return Promise.resolve()
        .then(() => Object.assign({ statusCode: 500 }));
    }
  }
};
