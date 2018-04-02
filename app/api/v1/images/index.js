'use strict';

const router = require('express').Router();
const ctrl = require('./images.ctrl');
const api = require('../../');

router.get('/:name',
  api.isAuthenticated(),
  ctrl.show);

router.post('/',
  api.isAuthenticated(),
  api.http(ctrl.create));

  router.get('/delete/:name', ctrl.delete);


module.exports = router;