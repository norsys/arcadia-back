'use strict';

const router = require('express').Router();
const ctrl = require('./user.ctrl');
const api = require('../../');
const v = require('../../../components/param-validator');
const e = require('../../../components/errors');

router.get('/',
  api.isAuthenticated(),
  api.http(ctrl.index, true));

router.get('/:id',
  api.isAuthenticated(),
  api.checkParams(v.genChecker('id', e.get('BadRequest'), v.num)),
  api.http(ctrl.show, false, true));

router.post('/',
  api.checkParams(v.genChecker('email', e.get('NameLength'), v.lenGt(2))),
  api.http(ctrl.create));

router.put('/:id',
  api.isAuthenticated(),
  api.checkParams(
    v.genChecker('id', e.get('BadRequest'), v.num)),
  api.http(ctrl.update));

router.delete('/:id',
  api.isAuthenticated(),
  api.checkParams(v.genChecker('id', e.get('BadRequest'), v.num)),
  api.http(ctrl.destroy));

router.put('/passwordupdate/:id',
  api.http(ctrl.resetPassword));

router.get('/getbyemail/:email', 
  api.http(ctrl.showByEmail));


module.exports = router;