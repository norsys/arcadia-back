'use strict';

const models = require('../models');
const errors = require('../components/errors');
const parseStr = str => {
  const ret = parseInt(str, 10);
  return isNaN(ret) ? undefined : ret;
};
const index = options => {
  return models['Challenge'].findAll({
    limit: parseStr(options.limit),
    offset: parseStr(options.offset)
  });
};
const show = options => {
  return models['Challenge'].findOne({
    where: {
      id: parseStr(options.id)
    }
  });
};
const create = options => {
  return models['Challenge'].create(options).catch(err => {
    if (err.name  === 'SequelizeUniqueConstraintError') {
      return Promise.reject(errors.code('Conflict'));
    }
    return Promise.reject(err);
  });
};
const update = (options) => {
  return Promise.resolve()
      .then(() => show(options))
      .then(challenge => {
        if (!challenge) throw errors.NotFound();

        for (let key in options) challenge[key] = options[key]
        return challenge.save();
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
  return models['Challenge'].destroy({
    where: {
      id: parseStr(options.id)
    }
  }).then(count => {
    return count ? Promise.resolve() : Promise.reject(errors.code('NotFound'));
  });
};
module.exports = {index, show, create, update, destroy};
