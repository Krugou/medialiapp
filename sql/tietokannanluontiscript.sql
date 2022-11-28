-- Ryhmän JAK tietokantaluonti scripti
-- jäsenet:
-- Joonas Lamminmäki
-- Aleksi Nokelainen
-- Kaarle Häyhä



CREATE DATABASE IF NOT EXISTS `jakrecipes` DEFAULT CHARACTER SET utf8 COLLATE UTF8_UNICODE_CI; 

USE jakrecipes;

---
-- jakrecipes.Courses definition

CREATE TABLE IF NOT EXISTS `Courses` (
  `Courseid` int(11) NOT NULL AUTO_INCREMENT,
  `Coursetype` varchar(255) COLLATE utf8_unicode_ci NOT NULL COMMENT 'Esim. jälkiruoka, pääruoka',
  PRIMARY KEY (`Courseid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


-- jakrecipes.Mealtypes definition

CREATE TABLE IF NOT EXISTS `Mealtypes` (
  `Mealid` int(11) NOT NULL AUTO_INCREMENT,
  `Mealtype` varchar(255) COLLATE utf8_unicode_ci NOT NULL COMMENT 'Esim. Kasvisruoka, liharuoka tai vegaaninen',
  PRIMARY KEY (`Mealid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


-- jakrecipes.Recipes definition

CREATE TABLE IF NOT EXISTS `Recipes` (
  `Recipeid` int(11) NOT NULL AUTO_INCREMENT,
  `Recipename` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `Recipetime` int(11) DEFAULT NULL COMMENT 'Reseptin kesto sekuntteina',
  `Recipeguide` varchar(1000) COLLATE utf8_unicode_ci NOT NULL COMMENT 'Reseptin ohje max 1000 merkkiä',
  `Recipemaker` int(11) NOT NULL COMMENT 'Reseptin tekijän userid',
  `Recipecourse` int(11) NOT NULL,
  PRIMARY KEY (`Recipeid`),
  KEY `Recipecourse` (`Recipecourse`),
  KEY `FK_Recipes_Users` (`Recipemaker`),
  CONSTRAINT `FK_Recipes_Users` FOREIGN KEY (`Recipemaker`) REFERENCES `Users` (`Userid`),
  CONSTRAINT `Recipes_ibfk_1` FOREIGN KEY (`Recipecourse`) REFERENCES `Courses` (`Courseid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


-- jakrecipes.Images definition

CREATE TABLE IF NOT EXISTS `Images` (
  `Imageid` int(11) NOT NULL AUTO_INCREMENT,
  `Imagefilepath` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `Imagerecipe` int(11) DEFAULT NULL COMMENT 'Voi olla NULL, koska kuvia on myös käyttäjille',
  PRIMARY KEY (`Imageid`),
  KEY `Imagerecipe` (`Imagerecipe`),
  CONSTRAINT `Images_ibfk_1` FOREIGN KEY (`Imagerecipe`) REFERENCES `Recipes` (`Recipeid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


-- jakrecipes.Recipemealtype definition

CREATE TABLE IF NOT EXISTS `Recipemealtype` (
  `Recipeid` int(11) NOT NULL COMMENT 'Liitettävä resepti',
  `Mealid` int(11) NOT NULL COMMENT 'Liitettävä Mealtype (Kasvisruoka, liharuoka. etc)',
  PRIMARY KEY (`Recipeid`,`Mealid`),
  KEY `Mealid` (`Mealid`),
  CONSTRAINT `Recipemealtype_ibfk_1` FOREIGN KEY (`Recipeid`) REFERENCES `Recipes` (`Recipeid`),
  CONSTRAINT `Recipemealtype_ibfk_2` FOREIGN KEY (`Mealid`) REFERENCES `Mealtypes` (`Mealid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


-- jakrecipes.Users definition

CREATE TABLE IF NOT EXISTS `Users` (
  `Userid` int(11) NOT NULL AUTO_INCREMENT,
  `Useremail` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `Userpassword` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `Userrole` int(1) NOT NULL DEFAULT '1' COMMENT 'admin=0, peruskäyttäjä=1',
  `Userimg` int(11) DEFAULT NULL,
  PRIMARY KEY (`Userid`),
  KEY `Userimg` (`Userimg`),
  CONSTRAINT `Users_ibfk_1` FOREIGN KEY (`Userimg`) REFERENCES `Images` (`Imageid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


-- jakrecipes.Comments definition

CREATE TABLE IF NOT EXISTS `Comments` (
  `Commentid` int(11) NOT NULL AUTO_INCREMENT,
  `Commenttext` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `Commentrecipe` int(11) NOT NULL,
  `Commentuserid` int(11) NOT NULL,
  PRIMARY KEY (`Commentid`),
  KEY `Commentrecipe` (`Commentrecipe`),
  KEY `Commentuserid` (`Commentuserid`),
  CONSTRAINT `Comments_ibfk_1` FOREIGN KEY (`Commentrecipe`) REFERENCES `Recipes` (`Recipeid`),
  CONSTRAINT `Comments_ibfk_2` FOREIGN KEY (`Commentuserid`) REFERENCES `Users` (`Userid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


-- jakrecipes.Recipefavorite definition

CREATE TABLE IF NOT EXISTS `Recipefavorite` (
  `Userid` int(11) NOT NULL COMMENT 'Jos taulukosta löytyy käyttäjä/resepti pari, se on favoritattu',
  `Recipeid` int(11) NOT NULL,
  PRIMARY KEY (`Userid`,`Recipeid`),
  KEY `Recipeid` (`Recipeid`),
  CONSTRAINT `Recipefavorite_ibfk_1` FOREIGN KEY (`Userid`) REFERENCES `Users` (`Userid`),
  CONSTRAINT `Recipefavorite_ibfk_2` FOREIGN KEY (`Recipeid`) REFERENCES `Recipes` (`Recipeid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


-- jakrecipes.Reciperating definition

CREATE TABLE IF NOT EXISTS `Reciperating` (
  `Userid` int(11) NOT NULL,
  `Recipeid` int(11) NOT NULL,
  `Stars` int(11) NOT NULL COMMENT 'Montako tähteä resepti saa (1,2,3,4,5) ?',
  PRIMARY KEY (`Userid`,`Recipeid`),
  KEY `Recipeid` (`Recipeid`),
  CONSTRAINT `Reciperating_ibfk_1` FOREIGN KEY (`Userid`) REFERENCES `Users` (`Userid`),
  CONSTRAINT `Reciperating_ibfk_2` FOREIGN KEY (`Recipeid`) REFERENCES `Recipes` (`Recipeid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


-- jakrecipes.Commentrating definition

CREATE TABLE IF NOT EXISTS `Commentrating` (
  `Userid` int(11) NOT NULL COMMENT 'Kommentin arvioija USERID',
  `Commentid` int(11) NOT NULL COMMENT 'Arvioitava kommentti',
  `Direction` int(1) NOT NULL COMMENT '1 = tykkää, 0 = ei tykkää',
  PRIMARY KEY (`Userid`,`Commentid`),
  KEY `Commentid` (`Commentid`),
  CONSTRAINT `Commentrating_ibfk_1` FOREIGN KEY (`Userid`) REFERENCES `Users` (`Userid`),
  CONSTRAINT `Commentrating_ibfk_2` FOREIGN KEY (`Commentid`) REFERENCES `Comments` (`Commentid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


s-





-- user creation

CREATE USER 'jakrecuser'@localhost IDENTIFIED BY 'xjakrecuserx';
CREATE USER 'jakrecadmin'@localhost IDENTIFIED BY 'xjakrecadminx';
CREATE USER 'jakrecreguser'@localhost IDENTIFIED BY 'xjakrecreguserx';

-- user privileges

GRANT ALL PRIVILEGES ON *.* TO 'jakrecadmin'@'localhost' REQUIRE NONE WITH GRANT OPTION MAX_QUERIES_PER_HOUR 0 MAX_CONNECTIONS_PER_HOUR 0 MAX_UPDATES_PER_HOUR 0 MAX_USER_CONNECTIONS 0;
GRANT SELECT, INSERT, UPDATE, DELETE ON *.* TO 'jakrecreguser'@'localhost' REQUIRE NONE WITH MAX_QUERIES_PER_HOUR 0 MAX_CONNECTIONS_PER_HOUR 0 MAX_UPDATES_PER_HOUR 0 MAX_USER_CONNECTIONS 0;
GRANT SELECT ON *.* TO 'jakrecuser'@'localhost' REQUIRE NONE WITH MAX_QUERIES_PER_HOUR 0 MAX_CONNECTIONS_PER_HOUR 0 MAX_UPDATES_PER_HOUR 0 MAX_USER_CONNECTIONS 0;















