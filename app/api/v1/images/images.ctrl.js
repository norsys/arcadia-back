'use strict';
const fs = require('fs');
const config = require('../../../config/environment');
const path = require('path');
const im = require('imagemagick');

module.exports = {

  show(req, res) {
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
      fs.writeFileSync(path.join(config.imagesFolder, options.name), base64Data, 'base64');
      
      return Promise.resolve()
        .then(() => Object.assign({ statusCode: 200 }));
    } catch (err) {
      console.log(err);
      return Promise.resolve()
        .then(() => Object.assign({ statusCode: 500 }));
    }
  },
  delete(req,res){
    console.log('delete image back ctrl');
    fs.unlinkSync('.//tmp\\'+req.params.name, (err) => {
      if (err) throw err;
      return res.end(200);
    } )
  }
};
