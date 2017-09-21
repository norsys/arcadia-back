'use strict';

const Quizz = require('../../../lib/Quizz');
const errors = require('../../../components/errors');

module.exports = {
  index(options) {
    return Promise.resolve()
        .then(() => Quizz.index(options))
  },
  show(options) {
    return Promise.resolve()
        .then(() => Quizz.show(options))
        .then(quizz => {
          if (!quizz) return Promise.reject(errors.NotFound('quizz is not found'));
          return quizz;
        })
  },
  create(options) {
    return Promise.resolve()
        .then(_=> Quizz.create(options))
        .then(quizz => Object.assign(quizz, {statusCode: 201}))
        .catch(err => {
          if (err === errors.code('Conflict'))
            return Promise.reject(errors.Conflict(`${options.name} is already existed`));
          throw err;
        });
  },
  update(options) {
    return Promise.resolve()
        .then(_=> Quizz.update(options))
        .catch(err => {
          if (err === errors.code('NotFound'))
            return Promise.reject(errors.NotFound(`quizz id: ${options.id} is not found`));
          throw err;
        });
  },
  destroy(options) {
    return Promise.resolve()
        .then(_ => Quizz.destroy(options))
        .then(() => ({statusCode: 204}))
        .catch(err => {
          if (err === errors.code('NotFound'))
            return Promise.reject(errors.NotFound(`quizz id: ${options.id} is not found`));
          throw err;
        });
  }
};
