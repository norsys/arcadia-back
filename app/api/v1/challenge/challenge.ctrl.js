'use strict';

const Challenge = require('../../../lib/Challenge');
const errors = require('../../../components/errors');

module.exports = {
  index(options) {
    return Promise.resolve()
      .then(() => Challenge.index(options));
  },
  show(options) {
    return Promise.resolve()
      .then(() => Challenge.show(options))
      .then(challenge => {
        if (!challenge) return Promise.reject(errors.NotFound('challenge is not found'));
        return challenge;
      });
  },
  create(options) {
    return Promise.resolve()
      .then(() => Challenge.create(options))
      .then(challenge => Object.assign(challenge, { statusCode: 201 }))
      .catch(err => {
        if (err === errors.code('Conflict'))
          return Promise.reject(errors.Conflict(`${options.name} is already existed`));
        throw err;
      });
  },
  update(options) {
    return Promise.resolve()
      .then(() => Challenge.update(options))
      .catch(err => {
        if (err === errors.code('NotFound'))
          return Promise.reject(errors.NotFound(`challenge id: ${options.id} is not found`));
        throw err;
      });
  },
  destroy(options) {
    return Promise.resolve()
      .then(() => Challenge.destroy(options))
      .then(() => ({ statusCode: 204 }))
      .catch(err => {
        if (err === errors.code('NotFound'))
          return Promise.reject(errors.NotFound(`challenge id: ${options.id} is not found`));
        throw err;
      });
  }
};
