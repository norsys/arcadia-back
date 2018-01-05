'use strict';

const models = require('../app/models');
const logTags = require('../app/components/log-tags');
const Sequelize = require('sequelize');
const config = require('../app/config/environment').database;
const sequelize = new Sequelize(config.database, config.username, config.password, config);


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
  { id: 1, name: 'CONVIVALITE' },
  { id: 2, name: 'BUSINESS AGENCE' },
  { id: 3, name: 'PRATIQUES' },
  { id: 4, name: 'CONNEXION' },
  { id: 5, name: 'FONDATION' },
  { id: 6, name: 'VIE DE GROUPE' },
  { id: 7, name: 'RH' },
	{ id: 8, name: 'NAF' }
];

const questions = [
  { id: 1, category_id: 1, question: 'Prends un café avec ton voisin', response: null, inputType: 'CAMERA' },
  { id: 2, category_id: 1, question: 'Prendre une photo d\'un déjeuner en équipe', response: null, inputType: 'CAMERA' },
  { id: 3, category_id: 1, question: 'Quel est la passion commune que tu partages avec ton parrain', response: null, inputType: 'TEXT' },
  { id: 4, category_id: 2, question: 'Selfie avec ton IA', response: null, inputType: 'CAMERA' },
  { id: 5, category_id: 2, question: 'Cite les 3 projets en cours + ton préféré', response: null, inputType: 'TEXT' },
  { id: 6, category_id: 2, question: 'Cites 3 plus petits clients de ton agence', response: null, inputType: 'TEXT' },
  { id: 7, category_id: 3, question: 'Citez les 4 piliers du QP', response: null, inputType: 'TEXT' },
  { id: 8, category_id: 3, question: 'Nommer la dernière formation UE', response: null, inputType: 'TEXT' },
  { id: 9, category_id: 3, question: 'Contacter un pirat pour  ?', response: null, inputType: 'TEXT' },
  { id: 10, category_id: 4, question: 'Créer son compte sur rocket', response: null, inputType: 'TEXT' },
  { id: 11, category_id: 4, question: 'Télécharger applis mobile norsys', response: null, inputType: 'TEXT' },
  { id: 12, category_id: 4, question: 'Liker une des pages norsys', response: null, inputType: 'TEXT' },
  { id: 13, category_id: 5, question: 'Nommer un membre du bureau fondation', response: null, inputType: 'TEXT' },
  { id: 14, category_id: 5, question: 'Contacter anne pour les actions en cours', response: null, inputType: 'TEXT' },
  { id: 15, category_id: 5, question: 'Le projet qui te semble le plus interessant', response: null, inputType: 'TEXT' },
  { id: 16, category_id: 6, question: 'Quel est l\'objet du kit d\'intégration que tu préfères ?', response: null, inputType: 'TEXT' },
  { id: 17, category_id: 6, question: 'Rébus sur les CRA ?', response: null, inputType: 'TEXT' },
  { id: 18, category_id: 6, question: 'EN %, combien de personnes ont suivi une formation en 2016 ?', response: null, inputType: 'TEXT' },
  { id: 19, category_id: 7, question: 'Cites le nom de la RH agence ?', response: null, inputType: 'TEXT' },
  { id: 20, category_id: 7, question: 'Cites au moins 3 vidéos norsys ?', response: null, inputType: 'TEXT' },
  { id: 21, category_id: 7, question: 'Cites un dispositif mis en place au sein de norsys pour favoriser l\'équilibre vie pro/vie perso ?', response: null, inputType: 'TEXT' },
  { id: 22, category_id: 8, question: 'oui ou non ?', response: null, inputType: 'BOOLEAN' },
  { id: 23, category_id: 8, question: 'plate préférer ?', response: null, inputType: 'TEXT' }
];

const users = [
  { id: 1, email: 'albator@pirat.fr', password: 'albator', firstName: 'Franklin', lastName: 'Harlock', nickName: 'albator', sex: 'M', agence_id: 1, city: 'Lille', avatar: 'avatar-1' },
  { id: 2, email: 'yaittaleb@pirat.fr', password: 'yaittaleb', firstName: 'yaittaleb', lastName: 'yaittaleb', nickName: 'yaittaleb', sex: 'M', agence_id: 8, city: 'Marrakech', avatar: 'avatar-1' }
];


module.exports = () => {
  const bulkCreate = (data, model) => model.bulkCreate(data);

  return Promise.resolve()
    .then(() => {
      sequelize.query('SELECT * FROM `agencies`', { type: sequelize.QueryTypes.SELECT})
        .then(agenciesResult => {
          console.log('agencies count: '+agenciesResult.length);
          if (agenciesResult.length == 0)
            bulkCreate(agencies, models.Agency);
        })
        .then(() => {
          sequelize.query('SELECT * FROM `users`', { type: sequelize.QueryTypes.SELECT})
            .then(usersResult => {
              console.log('users count: '+usersResult.length);
              if (usersResult.length == 0)
                bulkCreate(users, models.User);
            })
            .then(() => {
              sequelize.query('SELECT * FROM `categories`', { type: sequelize.QueryTypes.SELECT})
                .then(categoriesResult => {
                  console.log('categories count: '+categoriesResult.length);
                  if (categoriesResult.length == 0)
                    bulkCreate(categories, models.Category);
                })
                .then(() => {
                  sequelize.query('SELECT * FROM `questions`', { type: sequelize.QueryTypes.SELECT})
                    .then(questionsResult => {
                      console.log('questions count: '+questionsResult.length);
                      if (questionsResult.length == 0)
                        bulkCreate(questions, models.Question);
                    })
                    .then(() => {
                      sequelize.query('SELECT * FROM `responses`', { type: sequelize.QueryTypes.SELECT})
                        .then(responsesResult => {
                          console.log('questions count: '+responsesResult.length);
                          if (responsesResult.length == 0)
                            bulkCreate([], models.Response);
                        });
                    });

                });
            });
        });




    })
    .then(() => `${logTags.StartupInfo} Seed data inserted`);

};
