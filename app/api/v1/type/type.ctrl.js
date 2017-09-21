'use strict';

const Type = require('../../../lib/Type');
const errors = require('../../../components/errors');

module.exports = {
  index(options) {
    return Promise.resolve()
      .then(() => Type.index(options));
  },
  show(options) {
    return Promise.resolve()
      .then(() => Type.show(options))
      .then(type => {
        if (!type) return Promise.reject(errors.NotFound('type is not found'));
        return type;
      });
  },
  create(options) {
    return Promise.resolve()
      .then(() => Type.create(options))
      .then(type => Object.assign(type, { statusCode: 201 }))
      .catch(err => {
        if (err === errors.code('Conflict'))
          return Promise.reject(errors.Conflict(`${options.name} is already existed`));
        throw err;
      });
  },
  update(options) {
    return Promise.resolve()
      .then(() => Type.update(options))
      .catch(err => {
        if (err === errors.code('NotFound'))
          return Promise.reject(errors.NotFound(`type id: ${options.id} is not found`));
        throw err;
      });
  },
  destroy(options) {
    return Promise.resolve()
      .then(() => Type.destroy(options))
      .then(() => ({ statusCode: 204 }))
      .catch(err => {
        if (err === errors.code('NotFound'))
          return Promise.reject(errors.NotFound(`type id: ${options.id} is not found`));
        throw err;
      });
  }
};
