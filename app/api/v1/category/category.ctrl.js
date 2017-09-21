'use strict';

const Category = require('../../../lib/Category');
const errors = require('../../../components/errors');

module.exports = {
  index(options) {
    return Promise.resolve()
        .then(() => Category.index(options))
  },
  show(options) {
    return Promise.resolve()
        .then(() => Category.show(options))
        .then(agency => {
          if (!agency) return Promise.reject(errors.NotFound('agency is not found'));
          return agency;
        })
  },
  create(options) {
    return Promise.resolve()
        .then(_=> Category.create(options))
        .then(agency => Object.assign(agency, {statusCode: 201}))
        .catch(err => {
          if (err === errors.code('Conflict'))
            return Promise.reject(errors.Conflict(`${options.name} is already existed`));
          throw err;
        });
  },
  update(options) {
    return Promise.resolve()
        .then(_=> Category.update(options))
        .catch(err => {
          if (err === errors.code('NotFound'))
            return Promise.reject(errors.NotFound(`agency id: ${options.id} is not found`));
          throw err;
        });
  },
  destroy(options) {
    return Promise.resolve()
        .then(_ => Category.destroy(options))
        .then(() => ({statusCode: 204}))
        .catch(err => {
          if (err === errors.code('NotFound'))
            return Promise.reject(errors.NotFound(`agency id: ${options.id} is not found`));
          throw err;
        });
  }
};
