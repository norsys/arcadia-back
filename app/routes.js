'use strict';

const api = require('./api/index');
const auth = require('./components/auth-service');

module.exports = app => {
  // Insert routes below
  app.use('/v1/users', require('./api/v1/user'));
  app.use('/v1/auth', auth.checkApiKey(), require('./api/v1/auth'));
  app.use('/v1/agencies', require('./api/v1/agency'));
  app.use('/v1/types', require('./api/v1/type'));
  app.use('/v1/categories', require('./api/v1/category'));
  app.use('/v1/questions', require('./api/v1/question'));
  app.use('/v1/quizzs', require('./api/v1/quizz'));
  app.use('/v1/responses', require('./api/v1/response'));
  

  app.get('/', (req, res) => res.json({message: 'Hello aracadia-back'}));

  app.use(api.error404);
  app.use(api.error);
};
