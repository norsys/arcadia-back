'use strict';

const Question = require('../../../lib/question');
const errors = require('../../../components/errors');

module.exports = {
  index(options) {
    return Promise.resolve()
      .then(() => Question.index(options));
  },
  show(options) {
    return Promise.resolve()
      .then(() => Question.show(options))
      .then(question => {
        if (!question) return Promise.reject(errors.NotFound('question is not found'));
        return question;
      });
  },
  create(options) {
    return Promise.resolve()
      .then(() => Question.create(options))
      .then(question => Object.assign(question, { statusCode: 201 }))
      .catch(err => {
        if (err === errors.code('Conflict'))
          return Promise.reject(errors.Conflict(`${options.name} is already existed`));
        throw err;
      });
  },
  update(options) {
    return Promise.resolve()
      .then(() => Question.update(options))
      .catch(err => {
        if (err === errors.code('NotFound'))
          return Promise.reject(errors.NotFound(`question id: ${options.id} is not found`));
        throw err;
      });
  },
  destroy(options) {
    return Promise.resolve()
      .then(() => Question.destroy(options))
      .then(() => ({ statusCode: 204 }))
      .catch(err => {
        if (err === errors.code('NotFound'))
          return Promise.reject(errors.NotFound(`question id: ${options.id} is not found`));
        throw err;
      });
  }
};
