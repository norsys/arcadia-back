'use strict';

const models = require('../models');
const errors = require('../components/errors');
const parseStr = str => {
  const ret = parseInt(str, 10);
  return isNaN(ret) ? undefined : ret;
};
const index = options => {
  return models['Question'].findAll({
    limit: parseStr(options.limit),
    offset: parseStr(options.offset)
  });
};
const show = options => {
  return models['Question'].findOne({
    where: {
      id: parseStr(options.id)
    }
  });
};
const create = options => {
  return models['Question'].create(options).catch(err => {
    if (err.name === 'SequelizeUniqueConstraintError') {
      return Promise.reject(errors.code('Conflict'));
    }
    return Promise.reject(err);
  });
};
const update = (options) => {
  return Promise.resolve()
    .then(() => show(options))
    .then(question => {
      if (!question) throw errors.NotFound();

      for (let key in options) question[key] = options[key];
      return question.save();
    })
    .then(() => show(options))
    .catch(err => {
      if (err.name === 'SequelizeValidationError') {
        return Promise.reject(errors.BadRequest(err.message));
      }

      if (err.name === 'SequelizeUniqueConstraintError') {
        return Promise.reject(errors.Conflict(err.message));
      }

      return Promise.reject(err);
    });
};
const destroy = options => {
  return models['Question'].destroy({
    where: {
      id: parseStr(options.id)
    }
  }).then(count => {
    return count ? Promise.resolve() : Promise.reject(errors.code('NotFound'));
  });
};
module.exports = { index, show, create, update, destroy };
