'use strict';

const morgan = require('morgan');

/**
 * morgan wrapper
 * @returns {morgan}
 */
module.exports = () => {
  let tokens = ':method :url :body :status :res[content-length] :response-time ms';
  let options = {
    'skip': (req) => /^\/swagger/.test(req.baseUrl)
  };

  if (process.env.NODE_ENV === 'production') {
    tokens = `:remote-addr - :remote-user [:date[clf]] ${tokens}`;
  }

  // Create a token for request body
  morgan.token('body', (req) => {
    if (req.method.toUpperCase() === 'POST' || req.method.toUpperCase() === 'PUT') {
      return `[Body]`;
    }
  });

  // return morgan(':method :url :status :response-time ms :body', {
  return morgan(tokens, options);
};
