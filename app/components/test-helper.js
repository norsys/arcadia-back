'use strict';

const syncDatabase = require('../../bin/sync-database');
const models = require('../models');
const request = require('supertest');
const app = require('../index');

const testHelper = {
  agency: { id: 1, name: 'Lille' },

  type: { id: 1, name: 'FREE' },

  quizz: { id: 1, name: 'INTEGRATION' },

  category: { id: 1, quizz_id: 1, name: 'FONDATION' },

  challenge: { id: 1, category_id: 1, question: 'C\'est la saint xxx, A toi de jouer en trouvant un collaborateur et en lui souhaitant sa fête ?', response: 'toto', isEnable: true, type_id: 1 },

  response: { id: 1, response: 'Lille' },

  user: { id: 1, email: 'albator@pirate.fr', password: 'albator', firstName: 'Franklin', lastName: 'Harlock', nickname: 'albator', sex: 'M', agency_id: 1, city: 'Lille', avatar: 'pirate' },
  syncDb() {
    return Promise.resolve()
      .then(() => syncDatabase({ force: true }))
      .then(() => models.Agency.create(this.agency))
      .then(() => models.User.create(this.user))
      .then(() => models.Type.create(this.type))
      .then(() => models.Quizz.create(this.quizz))
      .then(() => models.Category.create(this.category))
      .then(() => models.Challenge.create(this.challenge))
      .then(() => models.Response.create(this.response))
      .then(() => this.login())
      .then(user => this.user = Object.assign(this.user, user));
  },

  login() {
    return new Promise((resolve, reject) => {
      request(app)
        .post('/v1/auth')
        .send(this.user)
        .end((err, res) => {
          if (err) throw err;
          resolve(res.body.user);
        });
    })
  },

  insertSeed(model, seed) { return model.bulkCreate(seed); },

  deleteSeed(model, seed) {
    let whereCondition = {}
    let truncateCondition = {}
    switch (model.name) {
      case models.User.name:
        whereCondition = {
          where: {
            email: {
              in: seed.map(u => u.email)
            }
          }
        };
        truncateCondition = { truncate: model !== models.User }
        break;
      case models.Agency.name:
        whereCondition = {
          where: {
            name: {
              in: seed.map(u => u.name)
            }
          }
        };
        truncateCondition = { truncate: model !== models.Agency }
        break;
      case models.Challenge.name:
        whereCondition = {
          where: {
            question: {
              in: seed.map(u => u.question)
            }
          }
        };
        truncateCondition = { truncate: model !== models.Challenge }
        break;
      case models.Category.name:
        whereCondition = {
          where: {
            name: {
              in: seed.map(u => u.name)
            }
          }
        };
        truncateCondition = { truncate: model !== models.Category }
        break;
      case models.Type.name:
        whereCondition = {
          where: {
            name: {
              in: seed.map(u => u.name)
            }
          }
        };
        truncateCondition = { truncate: model !== models.Type }
        break;
      case models.Response.name:
        whereCondition = {
          where: {
            response: {
              in: seed.map(u => u.response)
            }
          }
        };
        truncateCondition = { truncate: model !== models.Response }
        break;
      case models.Quizz.name:
        whereCondition = {
          where: {
            name: {
              in: seed.map(u => u.name)
            }
          }
        };
        truncateCondition = { truncate: model !== models.Quizz }
        break;
    }
    return model.destroy(whereCondition, truncateCondition);
  },

  bindAccessToken(path) {
    return path.match(/\?/) ?
      path.replace(/\?/, `?accessToken=${this.user.accessToken}&`) :
      `${path}?accessToken=${this.user.accessToken}`;
  }
};

module.exports = testHelper;
