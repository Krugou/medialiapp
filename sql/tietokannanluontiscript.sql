-- Ryhmän JAK tietokantaluonti scripti
-- jäsenet:
-- Joonas Lamminmäki
-- Aleksi Nokelainen
-- Kaarle Häyhä


CREATE DATABASE IF NOT EXISTS `jakrecipes`  DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS `reseptit`
(
    `resepti_id` int not null auto_increment,
    `nimi` varchar(100) not null,
    `ohje` varchar(1000) not null,
    `aika` int not null,
    `valmistusaika` int not null,
    `paa_aine` varchar(100) not null,
    `kuva_id` int not null,
    primary key (`resepti_id`)
)ENGINE = InnoDB;;

CREATE TABLE IF NOT EXISTS `kuvat`  (
  `kuva_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `kuvan_polku` VARCHAR(255) COMMENT "kuvien tiedostosijainti", -- vaatii tarkennusta
  PRIMARY KEY (`kuva_id`)
) ENGINE = InnoDB;


-- q: how to add comment to table?
-- a: https://stackoverflow.com/questions/105000/how-do-i-add-a-comment-to-a-table-in-mysql

CREATE TABLE IF NOT EXISTS `valmistusaika` (
  `valmistus_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `valmistusaika` int not null,-- millisekunteja?
  PRIMARY KEY (`valmistus_id`)
) ENGINE = InnoDB;
 

CREATE TABLE IF NOT EXISTS `mitat` (
  `mitat_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255),
  PRIMARY KEY (`mitat_id`)
) ENGINE = InnoDB;



CREATE TABLE IF NOT EXISTS `ateriat` ( -- Ateria on syömishetki, jolloin nautitaan ruokaa. Aterioille on yleensä varattu tietty hetki päivästä. 
  `ateria_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255),
  PRIMARY KEY (`ateria_id`)
) ENGINE = InnoDB;
-- Aamiainen syödään yleensä noin kahden tunnin sisällä heräämisestä.
-- Brunssi on myöhäisaamun ateria, vähän isompi kuin aamiainen ja yleensä korvaa aamiaisen ja lounaan.
-- Lounas on lämmin ateria, joka syödään puoleltapäivin.
-- Välipala syödään alkuiltapäivästä, ja se on yleensä kylmä. Välipalan syönti on yleistä kasvuikäisille lapsille.
-- Päivällinen on lämmin ateria, joka nautitaan yleensä töiden tai koulun jälkeen.
-- Illallinen nautitaan nimensä mukaan illalla. Illallinen on usein johonkin tapahtumaan liittyvän tai muuten juhlallisen iltaruokailun nimi. Sana voi tarkoittaa myös koko tapahtumaa, ei vain ateriaa.
-- Iltapala on kevyt ja yleensä kylmä ateria, joka nautitaan viimeisenä ateriana ennen nukkumaan menoa.
-- Yöpala nautitaan yleensä keskiyön jälkeen. Se on tuskin koskaan lämmin

CREATE TABLE IF NOT EXISTS `maarat` ( 
  `maarat_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255),
  PRIMARY KEY (`maarat_id`)
) ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS `ruokalajit` (
  `ruokalaji_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255),
  PRIMARY KEY (`ruokalaji_id`)
) ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS `ainekset` (
  `ainekset_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `aine` VARCHAR(255),
  PRIMARY KEY (`ainekset_id`)
) ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS `käyttäjät` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `etunimi` VARCHAR(255),
  `sukunimi` VARCHAR(255),
  `sähkoposti` VARCHAR(255),
  `nimimerkki` VARCHAR(255),
  PRIMARY KEY (`id`)
) ENGINE = InnoDB;


-- index esimerkki
-- INDEX `email_idx` (`email` ASC),







-- esimerkki create table 

-- CREATE TABLE IF NOT EXISTS `table_name` (
--   `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
--   `name` VARCHAR(255),
--   PRIMARY KEY `pk_id`(`id`)
-- ) ENGINE = InnoDB;










