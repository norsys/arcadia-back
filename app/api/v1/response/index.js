'use strict';

const router = require('express').Router();
const ctrl = require('./response.ctrl');
const api = require('../../');
const v = require('../../../components/param-validator');
const e = require('../../../components/errors');

router.get('/',
  api.isAuthenticated(),
  api.http(ctrl.index1));

router.get('/users/:user_id',
  api.isAuthenticated(),
  api.http(ctrl.index));

router.get('/:question_id',
  api.isAuthenticated(),
  api.http(ctrl.show));

  
router.post('/',
  api.isAuthenticated(),
  api.checkParams(v.genChecker('response', e.get('NameLength'), v.lenGt(2))),
  api.http(ctrl.create));

router.put('/:id',
  api.isAuthenticated(),
  api.checkParams(
    v.genChecker('id', e.get('BadRequest'), v.num),
    v.genChecker('response', e.get('NameLength'), v.lenGt(2))),
  api.http(ctrl.update));

router.delete('/:question_id',
  api.isAuthenticated(),
  api.checkParams(v.genChecker('question_id', e.get('BadRequest'), v.num)),
  api.http(ctrl.destroy));



module.exports = router;