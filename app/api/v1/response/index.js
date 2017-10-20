'use strict';

const router = require('express').Router();
const ctrl = require('./response.ctrl');
const api = require('../../');
const v = require('../../../components/param-validator');
const e = require('../../../components/errors');

router.get('/',
  api.isAuthenticated(),
  api.http(ctrl.index));

router.get('/:question_id',
  api.isAuthenticated(),
  api.http(ctrl.show));

  
router.post('/',
  api.isAuthenticated(),
  api.checkParams(v.genChecker('response', e.get('NameLength'), v.lenGt(2))),
  api.http(ctrl.create));


module.exports = router;