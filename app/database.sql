
INSERT into Agencies (id,name,createdAt,updatedAt)
VALUES
 (1,'Ennevelin',NOW(),NOW()),
 (2,'Nice',NOW(),NOW()),
 (3,'Paris',NOW(),NOW()),
 (4,'Lyon',NOW(),NOW()),
 (5,'Nantes',NOW(),NOW()),
 (6,'Angers',NOW(),NOW()),
 (7,'Grenoble',NOW(),NOW()),
 (8,'Marrakech',NOW(),NOW());

INSERT into Categories (id,name,createdAt,updatedAt)
VALUES
 (1,'CONVIVALITE',NOW(),NOW()),
 (2,'BUSINESS AGENCE',NOW(),NOW()),
 (3,'PRATIQUES',NOW(),NOW()),
 (4,'CONNEXION',NOW(),NOW()),
 (5,'FONDATION',NOW(),NOW()),
 (6,'VIE DE GROUPE',NOW(),NOW()),
 (7,'RH',NOW(),NOW());
 

INSERT INTO Questions(id,category_id,question,response,inputType,createdAt,updatedAt)
VALUES
(1,  1,  'Prends un café avec ton voisin',  null,  'CAMERA' ,NOW(),NOW()),
(2,  1,  'Prendre une photo d\'un déjeuner en équipe',  null,  'CAMERA' ,NOW(),NOW()),
(3,  1,  'Quel est la passion commune que tu partages avec ton parrain',  null,  'TEXT' ,NOW(),NOW()),
(4,  2,  'Selfie avec ton IA',  null,  'CAMERA' ,NOW(),NOW()),
(5,  2,  'Cite les 3 projets en cours + ton préféré',  null,  'TEXT' ,NOW(),NOW()),
(6,  2,  'Cites 3 plus petits clients de ton agence',  null,  'TEXT' ,NOW(),NOW()),
(7,  3,  'Citez les 4 piliers du QP',  null,  'TEXT' ,NOW(),NOW()),
(8,  3,  'Nommer la dernière formation UE',  null,  'TEXT' ,NOW(),NOW()),
(9,  3,  'Contacter un pirat pour  ?',  null,  'TEXT' ,NOW(),NOW()),
(10,  4,  'Créer son compte sur rocket',  null,  'TEXT' ,NOW(),NOW()),
(11,  4,  'Télécharger applis mobile norsys',  null,  'TEXT' ,NOW(),NOW()),
(12,  4,  'Liker une des pages norsys',  null,  'TEXT' ,NOW(),NOW()),
(13,  5,  'Nommer un membre du bureau fondation',  null,  'TEXT' ,NOW(),NOW()),
(14,  5,  'Contacter anne pour les actions en cours',  null,  'TEXT' ,NOW(),NOW()),
(15,  5,  'Le projet qui te semble le plus interessant',  null,  'TEXT' ,NOW(),NOW()),
(16,  6,  'Quel est l\'objet du kit d\'intégration que tu préfères ?',  null,  'TEXT' ,NOW(),NOW()),
(17,  6,  'Rébus sur les CRA ?',  null,  'TEXT' ,NOW(),NOW()),
(18,  6,  'EN %, combien de personnes ont suivi une formation en 2016 ?',  null,  'TEXT' ,NOW(),NOW()),
(19,  7,  'Cites le nom de la RH agence ?',  null,  'TEXT' ,NOW(),NOW()),
(20,  7,  'Cites au moins 3 vidéos norsys ?',  null,  'TEXT' ,NOW(),NOW()),
(21,  7,  'Cites un dispositif mis en place au sein de norsys pour favoriser l\'équilibre vie pro/vie perso ?',  null,  'TEXT' ,NOW(),NOW());
