'use strict';

const models = require('../models');
const errors = require('../components/errors');

const parseStr = str => {
  const ret = parseInt(str, 10);
  return isNaN(ret) ? undefined : ret;
};
const index = options => {
  return models['Response'].findAll({
    limit: parseStr(options.limit),
    offset: parseStr(options.offset),
    where: {
      user_id: parseStr(options.context.user.id)
    }
  });
};
const show = options => {
  return models['Response'].findOne({
    where: {
      user_id: parseStr(options.context.user.id),
      question_id: parseStr(options.question_id)
    }
  });
};
const create = options => {
  return models['Response'].create(options).catch(err => {
    if (err.name === 'SequelizeUniqueConstraintError') {
      return Promise.reject(errors.code('Conflict'));
    }
    return Promise.reject(err);
  });
};
const update = (options) => {
  return Promise.resolve()
    .then(() => show(options))
    .then(response => {
      if (!response) throw errors.NotFound();

      for (let key in options) response[key] = options[key];
      return response.save();
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
  return models['Response'].destroy({
    where: {
      user_id: options.context.user.id,
      question_id:  parseStr(options.question_id)
    }
  }).then(count => {
    return count ? Promise.resolve() : Promise.reject(errors.code('NotFound'));
  });
};
module.exports = { index, show, create, update, destroy };
