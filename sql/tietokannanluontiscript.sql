CREATE DATABASE `jakrecipes` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;

create table IF NOT EXISTS reseptit
(
    'resepti_id' int not null auto_increment,
    'nimi' varchar(100) not null,
    'ohje' varchar(1000) not null,
    'aika' int not null,
    'paa_aine' varchar(100) not null,
    'kuva_id' int not null,
    primary key (resepti_id)
)ENGINE = InnoDB;;


-- esimerkki create table 

-- CREATE TABLE IF NOT EXISTS `table_name` (
--   `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
--   `name` VARCHAR(255),
--   PRIMARY KEY `pk_id`(`id`)
-- ) ENGINE = InnoDB;










