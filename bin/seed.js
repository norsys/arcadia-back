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

const types = [
  { id: 1, name: 'FREE' },
  { id: 2, name: 'PHOTO' },
  { id: 3, name: 'SINGLE' },
  { id: 4, name: 'BOOLEAN' },
  { id: 5, name: 'IMAGE' },
];

const quizzs = [
  { id: 1, name: 'INTEGRATION' }
];

const categories = [
  { id: 1, quizz_id: 1, name: 'FONDATION' },
  { id: 2, quizz_id: 1, name: 'BUSINESS AGENCE' },
  { id: 3, quizz_id: 1, name: 'CONVIVIALITE' },
  { id: 4, quizz_id: 1, name: 'PRATIQUES INNOVANTES' },
  { id: 5, quizz_id: 1, name: 'RESTES CONNECTES' },
  { id: 6, quizz_id: 1, name: 'CONSEIL D\'ENTREPRISE' },
  { id: 7, quizz_id: 1, name: 'VIE DU GROUPE' },
  { id: 8, quizz_id: 1, name: 'LIEN SOCIAL' },
  { id: 9, quizz_id: 1, name: 'AUDACE' }
];

const challenges = [
  { id: 1, category_id: 9, question: 'C\'est la saint xxx, A toi de jouer en trouvant un collaborateur et en lui souhaitant sa fête ?', response: 'toto', isEnable: true, type_id: 3 },
  { id: 2, category_id: 9, question: 'Inviter un collaborateur pour son anniversaire', response: null, isEnable: true, type_id: 1 },
  { id: 3, category_id: 9, question: 'Appeler un contact inconnu pour une anecdote', response: null, isEnable: true, type_id: 1 },
  { id: 4, category_id: 8, question: 'Déterminer l\'agence d\'un collaborateur' },
  { id: 5, category_id: 8, question: 'Retrouver le nom de quelqu\'un à partir d\'une photo', response: 'tata', isEnable: true, type_id: 5 },
  { id: 6, category_id: 8, question: 'Envoi contact pour cooptation', response: null, isEnable: true, type_id: 1 },
  { id: 7, category_id: 7, question: 'Quel est l\'objet du kit d\'intégration que tu préfères ?', response: null, isEnable: true, type_id: 1 },
  { id: 8, category_id: 7, question: 'Rébus sur les CRA ?', response: 'rebus', isEnable: true, type_id: 5 },
  { id: 9, category_id: 7, question: 'Quizz égalité traitement, diversité Questions sur rapport annuel', response: null, isEnable: true, type_id: 1 },
  { id: 10, category_id: 6, question: 'mini quizz ce niveau 1', response: null, isEnable: true, type_id: 3 },
  { id: 11, category_id: 6, question: 'mini quizz ce niveau 2', response: null, isEnable: true, type_id: 3 },
  { id: 12, category_id: 6, question: 'retrouver l\'événement associé à la photo', response: null, isEnable: true, type_id: 5 },
  { id: 13, category_id: 5, question: 'Créer son compte sur rocke', response: null, isEnable: true, type_id: 4 },
  { id: 14, category_id: 5, question: 'Télécharger applis mobile', response: null, isEnable: true, type_id: 4 },
  { id: 15, category_id: 5, question: 'Liker une des pages', response: null, isEnable: true, type_id: 1 },
  { id: 16, category_id: 4, question: 'Citez les 4 piliers du QP', response: null, isEnable: true, type_id: 1 },
  { id: 17, category_id: 4, question: 'Nommer la dernière formation UE', response: null, isEnable: true, type_id: 1 },
  { id: 18, category_id: 4, question: 'Contacter un pirat pour prendre un café?', response: null, isEnable: true, type_id: 1 },
  { id: 19, category_id: 3, question: 'Prendre un café avec ton voisin', response: null, isEnable: true, type_id: 1 },
  { id: 20, category_id: 3, question: 'Photo déjeuner équipe', response: null, isEnable: true, type_id: 2 },
  { id: 21, category_id: 3, question: 'Trouver personne qui habite à moins de 10KM', response: null, isEnable: true, type_id: 1 },
  { id: 22, category_id: 2, question: 'Selfie avec ton IA', response: null, isEnable: true, type_id: 2 },
  { id: 23, category_id: 2, question: 'Cite les 3 projets en cours + ton préféré', response: null, isEnable: true, type_id: 1 },
  { id: 24, category_id: 2, question: 'Cite les 3 plus petits clients agence', response: null, isEnable: true, type_id: 1 },
  { id: 25, category_id: 1, question: 'Nommer un membre du bureau fondation', response: null, isEnable: true, type_id: 1 },
  { id: 26, category_id: 1, question: 'Contacter anne pour les actions en cours', response: null, isEnable: true, type_id: 4 },
  { id: 27, category_id: 1, question: 'Le projet qui te semble le plus interessant', response: null, isEnable: true, type_id: 1 },
];

const users = [
  { email: 'albator@pirat.fr', password: 'albator', firstName: 'Franklin', lastName: 'Harlock', nickname: 'albator', sex: 'M', agence_id: 1, city: 'Lille', avatar: 'pirate' }
];


module.exports = () => {
  const bulkCreate = (data, model) => model.bulkCreate(data);

  return Promise.resolve()
    .then(() => bulkCreate(agencies, models.Agency))
    .then(() => bulkCreate(users, models.User))
    .then(() => bulkCreate(types, models.Type))
    .then(() => bulkCreate(quizzs, models.Quizz))
    .then(() => bulkCreate(categories, models.Category))
    .then(() => bulkCreate(challenges, models.Challenge))
    .then(() => bulkCreate([], models.Circuit))
    .then(() => bulkCreate([], models.Response))
    .then(() => `${logTags.StartupInfo} Seed data inserted`);
};
