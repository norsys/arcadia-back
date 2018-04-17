ALTER TABLE Categories ADD COLUMN image VARCHAR(255) DEFAULT '';
ALTER TABLE Categories ADD COLUMN imageZoom VARCHAR(255) DEFAULT '';

ALTER TABLE Questions ADD COLUMN agence_id integer DEFAULT 1;

ALTER TABLE Users ADD COLUMN isAdmin TINYINT(1);

UPDATE `Agencies` SET `name`='Tours' WHERE `name`='Angers';

ALTER TABLE Responses ADD COLUMN valide BOOLEAN;

INSERT INTO Users('id','nickName','postalCode','agence_id','avatar','email','password','isAdmin','createdAt','updatedAt') 
VALUES(null,'admin','4000',8,'avatar-1','admin@norsys.fr','d033e22ae348aeb5660fc2140aec35850c4da997',1,'2018-04-13 08:06:48.052 +00:00','2018-04-13 08:06:48.052 +00:00');




