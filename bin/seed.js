'use strict';

const models = require('../app/models');
const logTags = require('../app/components/log-tags');

const agencies = [
  { id: 1, name: 'Ennevelin' },
  { id: 2, name: 'Nice' },
  { id: 3, name: 'Paris' },
  { id: 4, name: 'Lyon' },
  { id: 5, name: 'Nantes' },
  { id: 6, name: 'Angers' },
  { id: 7, name: 'Grenoble' },
  { id: 8, name: 'Marrakech' }
];

const categories = [
  { id: 1, name: 'LIEN SOCIAL' }
];

const questions = [
  { id: 1, category_id: 1, question: 'Take a capture with Sylvain !', response: null, isEnable: true, inputType: 'CAMERA' }
];

const users = [
  { email: 'albator@pirat.fr', password: 'albator', firstName: 'Franklin', lastName: 'Harlock', nickname: 'albator', sex: 'M', agence_id: 1, city: 'Lille', avatar: 'avatar-1' }
];


module.exports = () => {
  const bulkCreate = (data, model) => model.bulkCreate(data);

  return Promise.resolve()
    .then(() => bulkCreate(agencies, models.Agency))
    .then(() => bulkCreate(users, models.User))
    .then(() => bulkCreate(categories, models.Category))
    .then(() => bulkCreate(questions, models.Question))
    .then(() => bulkCreate([], models.Circuit))
    .then(() => bulkCreate([], models.Response))
    .then(() => `${logTags.StartupInfo} Seed data inserted`);
};
