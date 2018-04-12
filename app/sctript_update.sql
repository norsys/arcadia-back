ALTER TABLE Categories ADD COLUMN image VARCHAR(255) DEFAULT '';
ALTER TABLE Categories ADD COLUMN image VARCHAR(255) DEFAULT '';

ALTER TABLE Questions ADD COLUMN agence_id integer;

ALTER TABLE Users ADD COLUMN isAdmin TINYINT(1);

UPDATE `Agencies` SET `name`='Tours' WHERE `name`='Angers';

ALTER TABLE Responses ADD COLUMN valide BOOLEAN;




