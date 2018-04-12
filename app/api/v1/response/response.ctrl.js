'use strict';

const Response = require('../../../lib/Response');
const errors = require('../../../components/errors');

module.exports = {
  index(options) {
    return Promise.resolve()
      .then(() => Response.index(options));
  },
  show(options) {
    return Promise.resolve()
      .then(() => Response.show(options))
      .then(response => {
        if (!response) return Promise.reject(errors.NotFound('response is not found'));
        return response;
      });
  }
  ,
  showResponse(options) {
    return Promise.resolve()
      .then(() => Response.showResponse(options))
      .then(response => {
        if (!response) return Promise.reject(errors.NotFound('response is not found'));
        return response;
      });
  },
  create(options) {
    return Promise.resolve()
      .then(() => Response.create(options))
      .then(response => Object.assign(response, { statusCode: 201 }))
      .catch(err => {
        if (err === errors.code('Conflict'))
          return Promise.reject(errors.Conflict(`${options.response} is already existed`));
        throw err;
      });
  },
  update(options) {
    return Promise.resolve()
      .then(() => Response.update(options))
      .catch(err => {
        if (err === errors.code('NotFound'))
          return Promise.reject(errors.NotFound(`response id: ${options.id} is not found`));
        throw err;
      });
  },
  destroy(options) {
    return Promise.resolve()
      .then(() => Response.destroy(options))
      .then(() => ({ statusCode: 204 }))
      .catch(err => {
        if (err === errors.code('NotFound'))
          return Promise.reject(errors.NotFound(`response id: ${options.id} is not found`));
        throw err;
      });
  },
  index1(options) {
    return Promise.resolve()
      .then(() => Response.index1(options));
  }
};
