-- --------------------------------------------------------
-- Verkkotietokone:              10.114.34.72
-- Palvelinversio:               5.5.56-MariaDB - MariaDB Server
-- Server OS:                    Linux
-- HeidiSQL Versio:              12.1.0.6537
-- --------------------------------------------------------
-- Ryhmän JAK tietokantaluonti scripti
-- jäsenet:
-- Joonas Lamminmäki
-- Aleksi Nokelainen
-- Kaarle Häyhä

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for jakrecipes
CREATE DATABASE IF NOT EXISTS `jakrecipes` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */;
USE `jakrecipes`;

-- Dumping structure for näkymä jakrecipes.allthecounts
-- Luodaan tilapäinen taulu VIEW-riippuvuusvirheiden voittamiseksi
CREATE TABLE `allthecounts` (
	`Allthecountnames` VARCHAR(9) NOT NULL COLLATE 'utf8mb4_general_ci',
	`count` BIGINT(21) NOT NULL
) ENGINE=MyISAM;

-- Dumping structure for näkymä jakrecipes.alltheratings
-- Luodaan tilapäinen taulu VIEW-riippuvuusvirheiden voittamiseksi
CREATE TABLE `alltheratings` (
	`Userid` INT(11) NOT NULL,
	`Recipeid` INT(11) NOT NULL,
	`Stars` INT(11) NOT NULL COMMENT 'Montako tähteä resepti saa (1,2,3,4,5) ?',
	`Direction` INT(1) NOT NULL COMMENT '1 = tykkää, -1 = ei tykkää',
	`Commentid` INT(11) NOT NULL COMMENT 'Arvioitava kommentti'
) ENGINE=MyISAM;

-- Dumping structure for taulu jakrecipes.Commentrating
CREATE TABLE IF NOT EXISTS `Commentrating` (
  `Userid` int(11) NOT NULL COMMENT 'Kommentin arvioija USERID',
  `Commentid` int(11) NOT NULL COMMENT 'Arvioitava kommentti',
  `Direction` int(1) NOT NULL COMMENT '1 = tykkää, -1 = ei tykkää',
  PRIMARY KEY (`Userid`,`Commentid`),
  KEY `Commentrating_ibfk_2` (`Commentid`),
  CONSTRAINT `Commentrating_ibfk_2` FOREIGN KEY (`Commentid`) REFERENCES `Comments` (`Commentid`) ON DELETE CASCADE,
  CONSTRAINT `Commentrating_ibfk_1` FOREIGN KEY (`Userid`) REFERENCES `Users` (`Userid`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Tietojen vientiä ei oltu valittu.

-- Dumping structure for taulu jakrecipes.Comments
CREATE TABLE IF NOT EXISTS `Comments` (
  `Commentid` int(11) NOT NULL AUTO_INCREMENT,
  `Commenttext` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `Commentrecipe` int(11) NOT NULL,
  `Commentuserid` int(11) NOT NULL,
  PRIMARY KEY (`Commentid`),
  KEY `Comments_ibfk_1` (`Commentrecipe`),
  KEY `Comments_ibfk_2` (`Commentuserid`),
  CONSTRAINT `Comments_ibfk_1` FOREIGN KEY (`Commentrecipe`) REFERENCES `Recipes` (`Recipeid`) ON DELETE CASCADE,
  CONSTRAINT `Comments_ibfk_2` FOREIGN KEY (`Commentuserid`) REFERENCES `Users` (`Userid`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Tietojen vientiä ei oltu valittu.

-- Dumping structure for näkymä jakrecipes.commentsandratings
-- Luodaan tilapäinen taulu VIEW-riippuvuusvirheiden voittamiseksi
CREATE TABLE `commentsandratings` (
	`Userid` INT(11) NOT NULL COMMENT 'Kommentin arvioija USERID',
	`Commentid` INT(11) NOT NULL COMMENT 'Arvioitava kommentti',
	`Direction` INT(1) NOT NULL COMMENT '1 = tykkää, -1 = ei tykkää',
	`Commenttext` VARCHAR(500) NOT NULL COLLATE 'utf8_unicode_ci',
	`Commentrecipe` INT(11) NOT NULL,
	`Commentuserid` INT(11) NOT NULL
) ENGINE=MyISAM;

-- Dumping structure for näkymä jakrecipes.commentsandusers
-- Luodaan tilapäinen taulu VIEW-riippuvuusvirheiden voittamiseksi
CREATE TABLE `commentsandusers` (
	`Commentid` INT(11) NOT NULL,
	`Commenttext` VARCHAR(500) NOT NULL COLLATE 'utf8_unicode_ci',
	`Commentrecipe` INT(11) NOT NULL,
	`Commentuserid` INT(11) NOT NULL,
	`Userid` INT(11) NOT NULL,
	`Useremail` VARCHAR(255) NOT NULL COLLATE 'utf8_unicode_ci',
	`Userpassword` VARCHAR(255) NOT NULL COLLATE 'utf8_unicode_ci',
	`Userrole` INT(1) NOT NULL COMMENT 'admin=0, peruskäyttäjä=1',
	`Userimg` INT(11) NULL,
	`Username` VARCHAR(30) NOT NULL COLLATE 'utf8_unicode_ci'
) ENGINE=MyISAM;

-- Dumping structure for taulu jakrecipes.Courses
CREATE TABLE IF NOT EXISTS `Courses` (
  `Courseid` int(11) NOT NULL AUTO_INCREMENT,
  `Coursetype` varchar(255) COLLATE utf8_unicode_ci NOT NULL COMMENT 'Esim. jälkiruoka, pääruoka',
  PRIMARY KEY (`Courseid`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Tietojen vientiä ei oltu valittu.

-- Dumping structure for näkymä jakrecipes.dataview
-- Luodaan tilapäinen taulu VIEW-riippuvuusvirheiden voittamiseksi
CREATE TABLE `dataview` (
	`Recipename` VARCHAR(255) NOT NULL COLLATE 'utf8_unicode_ci',
	`Recipeprice` FLOAT NULL,
	`Recipetime` FLOAT NULL COMMENT 'Reseptin kesto minuutteina',
	`Recipeguide` VARCHAR(3000) NOT NULL COMMENT 'Reseptin ohje max 1000 merkkiä' COLLATE 'utf8_unicode_ci',
	`Username` VARCHAR(30) NOT NULL COLLATE 'utf8_unicode_ci',
	`Imagefilepath` VARCHAR(255) NOT NULL COLLATE 'utf8_unicode_ci',
	`Coursetype` VARCHAR(255) NOT NULL COMMENT 'Esim. jälkiruoka, pääruoka' COLLATE 'utf8_unicode_ci',
	`Mealtype` VARCHAR(255) NOT NULL COMMENT 'Esim. Kasvisruoka, liharuoka tai vegaaninen' COLLATE 'utf8_unicode_ci'
) ENGINE=MyISAM;

-- Dumping structure for taulu jakrecipes.Images
CREATE TABLE IF NOT EXISTS `Images` (
  `Imageid` int(11) NOT NULL AUTO_INCREMENT,
  `Imagefilepath` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `Imagerecipe` int(11) DEFAULT NULL COMMENT 'Voi olla NULL, koska kuvia on myös käyttäjille',
  PRIMARY KEY (`Imageid`),
  KEY `Images_ibfk_1` (`Imagerecipe`),
  CONSTRAINT `Images_ibfk_1` FOREIGN KEY (`Imagerecipe`) REFERENCES `Recipes` (`Recipeid`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=192 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Tietojen vientiä ei oltu valittu.

-- Dumping structure for taulu jakrecipes.Mealtypes
CREATE TABLE IF NOT EXISTS `Mealtypes` (
  `Mealid` int(11) NOT NULL AUTO_INCREMENT,
  `Mealtype` varchar(255) COLLATE utf8_unicode_ci NOT NULL COMMENT 'Esim. Kasvisruoka, liharuoka tai vegaaninen',
  PRIMARY KEY (`Mealid`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Tietojen vientiä ei oltu valittu.

-- Dumping structure for näkymä jakrecipes.mostliked
-- Luodaan tilapäinen taulu VIEW-riippuvuusvirheiden voittamiseksi
CREATE TABLE `mostliked` (
	`recipeid` INT(11) NOT NULL,
	`summa` DECIMAL(32,0) NULL
) ENGINE=MyISAM;

-- Dumping structure for näkymä jakrecipes.mostlikedbetter
-- Luodaan tilapäinen taulu VIEW-riippuvuusvirheiden voittamiseksi
CREATE TABLE `mostlikedbetter` (
	`Recipeid` INT(11) NOT NULL,
	`summa` DECIMAL(32,0) NULL,
	`Recipename` VARCHAR(255) NOT NULL COLLATE 'utf8_unicode_ci',
	`Recipeprice` FLOAT NULL,
	`Recipetime` FLOAT NULL COMMENT 'Reseptin kesto minuutteina',
	`Recipeguide` VARCHAR(3000) NOT NULL COMMENT 'Reseptin ohje max 1000 merkkiä' COLLATE 'utf8_unicode_ci',
	`Imagefilepath` VARCHAR(255) NULL COLLATE 'utf8_unicode_ci',
	`Coursetype` VARCHAR(255) NOT NULL COMMENT 'Esim. jälkiruoka, pääruoka' COLLATE 'utf8_unicode_ci',
	`Mealtype` VARCHAR(255) NULL COMMENT 'Esim. Kasvisruoka, liharuoka tai vegaaninen' COLLATE 'utf8_unicode_ci',
	`Username` VARCHAR(30) NULL COLLATE 'utf8_unicode_ci'
) ENGINE=MyISAM;

-- Dumping structure for näkymä jakrecipes.normaluserview
-- Luodaan tilapäinen taulu VIEW-riippuvuusvirheiden voittamiseksi
CREATE TABLE `normaluserview` (
	`Recipeid` INT(11) NOT NULL,
	`Recipename` VARCHAR(255) NOT NULL COLLATE 'utf8_unicode_ci',
	`Recipetime` FLOAT NULL COMMENT 'Reseptin kesto minuutteina',
	`Recipeguide` VARCHAR(3000) NOT NULL COMMENT 'Reseptin ohje max 1000 merkkiä' COLLATE 'utf8_unicode_ci',
	`Recipemaker` INT(11) NOT NULL COMMENT 'Reseptin tekijän userid',
	`Coursetype` VARCHAR(255) NOT NULL COMMENT 'Esim. jälkiruoka, pääruoka' COLLATE 'utf8_unicode_ci',
	`Recipeprice` FLOAT NULL,
	`Imagefilepath` VARCHAR(255) NULL COLLATE 'utf8_unicode_ci',
	`Mealtype` VARCHAR(255) NULL COMMENT 'Esim. Kasvisruoka, liharuoka tai vegaaninen' COLLATE 'utf8_unicode_ci',
	`Username` VARCHAR(30) NULL COLLATE 'utf8_unicode_ci'
) ENGINE=MyISAM;

-- Dumping structure for näkymä jakrecipes.normaluserviewvanha
-- Luodaan tilapäinen taulu VIEW-riippuvuusvirheiden voittamiseksi
CREATE TABLE `normaluserviewvanha` (
	`Recipeid` INT(11) NOT NULL,
	`Recipename` VARCHAR(255) NOT NULL COLLATE 'utf8_unicode_ci',
	`Recipeprice` FLOAT NULL,
	`Recipetime` FLOAT NULL COMMENT 'Reseptin kesto minuutteina',
	`Recipeguide` VARCHAR(3000) NOT NULL COMMENT 'Reseptin ohje max 1000 merkkiä' COLLATE 'utf8_unicode_ci',
	`Username` VARCHAR(30) NOT NULL COLLATE 'utf8_unicode_ci',
	`Imagefilepath` VARCHAR(255) NOT NULL COLLATE 'utf8_unicode_ci',
	`Coursetype` VARCHAR(255) NOT NULL COMMENT 'Esim. jälkiruoka, pääruoka' COLLATE 'utf8_unicode_ci',
	`Mealtype` VARCHAR(255) NOT NULL COMMENT 'Esim. Kasvisruoka, liharuoka tai vegaaninen' COLLATE 'utf8_unicode_ci'
) ENGINE=MyISAM;

-- Dumping structure for näkymä jakrecipes.presentationview
-- Luodaan tilapäinen taulu VIEW-riippuvuusvirheiden voittamiseksi
CREATE TABLE `presentationview` (
	`Recipeid` INT(11) NOT NULL,
	`Recipename` VARCHAR(255) NOT NULL COLLATE 'utf8_unicode_ci',
	`Recipetime` FLOAT NULL COMMENT 'Reseptin kesto minuutteina',
	`Recipeguide` VARCHAR(3000) NOT NULL COMMENT 'Reseptin ohje max 1000 merkkiä' COLLATE 'utf8_unicode_ci',
	`Recipemaker` INT(11) NOT NULL COMMENT 'Reseptin tekijän userid',
	`Recipeprice` FLOAT NULL,
	`Mealid` INT(11) NOT NULL,
	`Mealtype` VARCHAR(255) NOT NULL COMMENT 'Esim. Kasvisruoka, liharuoka tai vegaaninen' COLLATE 'utf8_unicode_ci',
	`Courseid` INT(11) NOT NULL,
	`Coursetype` VARCHAR(255) NOT NULL COMMENT 'Esim. jälkiruoka, pääruoka' COLLATE 'utf8_unicode_ci',
	`Imageid` INT(11) NOT NULL,
	`Imagefilepath` VARCHAR(255) NOT NULL COLLATE 'utf8_unicode_ci',
	`Imagerecipe` INT(11) NULL COMMENT 'Voi olla NULL, koska kuvia on myös käyttäjille'
) ENGINE=MyISAM;

-- Dumping structure for taulu jakrecipes.Recipefavorite
CREATE TABLE IF NOT EXISTS `Recipefavorite` (
  `Userid` int(11) NOT NULL COMMENT 'Jos taulukosta löytyy käyttäjä/resepti pari, se on favoritattu',
  `Recipeid` int(11) NOT NULL,
  PRIMARY KEY (`Userid`,`Recipeid`),
  KEY `Recipefavorite_ibfk_2` (`Recipeid`),
  CONSTRAINT `Recipefavorite_ibfk_2` FOREIGN KEY (`Recipeid`) REFERENCES `Recipes` (`Recipeid`) ON DELETE CASCADE,
  CONSTRAINT `Recipefavorite_ibfk_1` FOREIGN KEY (`Userid`) REFERENCES `Users` (`Userid`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Tietojen vientiä ei oltu valittu.

-- Dumping structure for taulu jakrecipes.Recipemealtype
CREATE TABLE IF NOT EXISTS `Recipemealtype` (
  `Recipeid` int(11) NOT NULL COMMENT 'Liitettävä resepti',
  `Mealid` int(11) NOT NULL COMMENT 'Liitettävä Mealtype (Kasvisruoka, liharuoka. etc)',
  PRIMARY KEY (`Recipeid`,`Mealid`),
  KEY `Mealid` (`Mealid`),
  CONSTRAINT `Recipemealtype_ibfk_1` FOREIGN KEY (`Recipeid`) REFERENCES `Recipes` (`Recipeid`) ON DELETE CASCADE,
  CONSTRAINT `Recipemealtype_ibfk_2` FOREIGN KEY (`Mealid`) REFERENCES `Mealtypes` (`Mealid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Tietojen vientiä ei oltu valittu.

-- Dumping structure for taulu jakrecipes.Reciperating
CREATE TABLE IF NOT EXISTS `Reciperating` (
  `Userid` int(11) NOT NULL,
  `Recipeid` int(11) NOT NULL,
  `Stars` int(11) NOT NULL COMMENT 'Montako tähteä resepti saa (1,2,3,4,5) ?',
  PRIMARY KEY (`Userid`,`Recipeid`),
  KEY `Reciperating_ibfk_2` (`Recipeid`),
  CONSTRAINT `Reciperating_ibfk_1` FOREIGN KEY (`Userid`) REFERENCES `Users` (`Userid`) ON DELETE CASCADE,
  CONSTRAINT `Reciperating_ibfk_2` FOREIGN KEY (`Recipeid`) REFERENCES `Recipes` (`Recipeid`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Tietojen vientiä ei oltu valittu.

-- Dumping structure for taulu jakrecipes.Recipes
CREATE TABLE IF NOT EXISTS `Recipes` (
  `Recipeid` int(11) NOT NULL AUTO_INCREMENT,
  `Recipename` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `Recipetime` float DEFAULT NULL COMMENT 'Reseptin kesto minuutteina',
  `Recipeguide` varchar(3000) COLLATE utf8_unicode_ci NOT NULL COMMENT 'Reseptin ohje max 1000 merkkiä',
  `Recipemaker` int(11) NOT NULL COMMENT 'Reseptin tekijän userid',
  `Recipecourse` int(11) NOT NULL,
  `Recipeprice` float DEFAULT NULL,
  PRIMARY KEY (`Recipeid`),
  KEY `Recipecourse` (`Recipecourse`),
  KEY `FK_Recipes_Users` (`Recipemaker`),
  CONSTRAINT `FK_Recipes_Users` FOREIGN KEY (`Recipemaker`) REFERENCES `Users` (`Userid`) ON DELETE CASCADE,
  CONSTRAINT `Recipes_ibfk_1` FOREIGN KEY (`Recipecourse`) REFERENCES `Courses` (`Courseid`)
) ENGINE=InnoDB AUTO_INCREMENT=245 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Tietojen vientiä ei oltu valittu.

-- Dumping structure for näkymä jakrecipes.reguserprofileview
-- Luodaan tilapäinen taulu VIEW-riippuvuusvirheiden voittamiseksi
CREATE TABLE `reguserprofileview` (
	`Recipeid` INT(11) NOT NULL,
	`Recipename` VARCHAR(255) NOT NULL COLLATE 'utf8_unicode_ci',
	`Recipetime` FLOAT NULL COMMENT 'Reseptin kesto minuutteina',
	`Recipeguide` VARCHAR(3000) NOT NULL COMMENT 'Reseptin ohje max 1000 merkkiä' COLLATE 'utf8_unicode_ci',
	`Recipemaker` INT(11) NOT NULL COMMENT 'Reseptin tekijän userid',
	`Coursetype` VARCHAR(255) NOT NULL COMMENT 'Esim. jälkiruoka, pääruoka' COLLATE 'utf8_unicode_ci',
	`Recipeprice` FLOAT NULL,
	`Imagefilepath` VARCHAR(255) NULL COLLATE 'utf8_unicode_ci',
	`Mealtype` VARCHAR(255) NULL COMMENT 'Esim. Kasvisruoka, liharuoka tai vegaaninen' COLLATE 'utf8_unicode_ci',
	`Userid` INT(11) NULL,
	`Username` VARCHAR(30) NULL COLLATE 'utf8_unicode_ci'
) ENGINE=MyISAM;

-- Dumping structure for näkymä jakrecipes.reguserprofileviewvanha
-- Luodaan tilapäinen taulu VIEW-riippuvuusvirheiden voittamiseksi
CREATE TABLE `reguserprofileviewvanha` (
	`Recipeid` INT(11) NOT NULL,
	`Recipename` VARCHAR(255) NOT NULL COLLATE 'utf8_unicode_ci',
	`Recipeprice` FLOAT NULL,
	`Recipetime` FLOAT NULL COMMENT 'Reseptin kesto minuutteina',
	`Recipeguide` VARCHAR(3000) NOT NULL COMMENT 'Reseptin ohje max 1000 merkkiä' COLLATE 'utf8_unicode_ci',
	`Username` VARCHAR(30) NOT NULL COLLATE 'utf8_unicode_ci',
	`Imagefilepath` VARCHAR(255) NOT NULL COLLATE 'utf8_unicode_ci',
	`Coursetype` VARCHAR(255) NOT NULL COMMENT 'Esim. jälkiruoka, pääruoka' COLLATE 'utf8_unicode_ci',
	`Mealtype` VARCHAR(255) NOT NULL COMMENT 'Esim. Kasvisruoka, liharuoka tai vegaaninen' COLLATE 'utf8_unicode_ci',
	`Userid` INT(11) NOT NULL
) ENGINE=MyISAM;

-- Dumping structure for taulu jakrecipes.Users
CREATE TABLE IF NOT EXISTS `Users` (
  `Userid` int(11) NOT NULL AUTO_INCREMENT,
  `Useremail` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `Userpassword` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `Userrole` int(1) NOT NULL DEFAULT '1' COMMENT 'admin=0, peruskäyttäjä=1',
  `Userimg` int(11) DEFAULT NULL,
  `Username` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`Userid`),
  KEY `Userimg` (`Userimg`),
  CONSTRAINT `Users_ibfk_1` FOREIGN KEY (`Userimg`) REFERENCES `Images` (`Imageid`)
) ENGINE=InnoDB AUTO_INCREMENT=89 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Tietojen vientiä ei oltu valittu.

-- Dumping structure for näkymä jakrecipes.usersandimages
-- Luodaan tilapäinen taulu VIEW-riippuvuusvirheiden voittamiseksi
CREATE TABLE `usersandimages` (
	`Userid` INT(11) NOT NULL,
	`Useremail` VARCHAR(255) NOT NULL COLLATE 'utf8_unicode_ci',
	`Userpassword` VARCHAR(255) NOT NULL COLLATE 'utf8_unicode_ci',
	`Userrole` INT(1) NOT NULL COMMENT 'admin=0, peruskäyttäjä=1',
	`Userimg` INT(11) NULL,
	`Username` VARCHAR(30) NOT NULL COLLATE 'utf8_unicode_ci',
	`Imageid` INT(11) NOT NULL,
	`Imagefilepath` VARCHAR(255) NOT NULL COLLATE 'utf8_unicode_ci',
	`Imagerecipe` INT(11) NULL COMMENT 'Voi olla NULL, koska kuvia on myös käyttäjille'
) ENGINE=MyISAM;

-- Dumping structure for näkymä jakrecipes.allthecounts
-- Poistetaan tilapäinen taulu ja luodaan lopullinen VIEW-rakenne
DROP TABLE IF EXISTS `allthecounts`;
CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `allthecounts` AS select 'Recipeid' AS `Allthecountnames`,count(0) AS `count` from `Recipes` union select 'Userid' AS `userscount`,count(0) AS `count` from `Users` where (`Users`.`Userrole` = 1) union select 'Useremail' AS `userscount2`,count(0) AS `count2` from `Users` union select 'Commentid' AS `commentcount`,count(0) AS `count` from `Comments` union select 'Courseid' AS `courceidcount`,count(0) AS `count` from `Courses` union select 'Imageid' AS `imagecount`,count(0) AS `count` from `Images` union select 'direction' AS `directioncount`,count(0) AS `count` from `Commentrating` union select 'Mealtype' AS `Mealtypecount`,count(0) AS `count` from `Mealtypes` union select 'stars' AS `starscount`,count(0) AS `count` from `Reciperating`;

-- Dumping structure for näkymä jakrecipes.alltheratings
-- Poistetaan tilapäinen taulu ja luodaan lopullinen VIEW-rakenne
DROP TABLE IF EXISTS `alltheratings`;
CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `alltheratings` AS select `n`.`Userid` AS `Userid`,`n`.`Recipeid` AS `Recipeid`,`n`.`Stars` AS `Stars`,`g`.`Direction` AS `Direction`,`g`.`Commentid` AS `Commentid` from (`Commentrating` `g` join `Reciperating` `n`);

-- Dumping structure for näkymä jakrecipes.commentsandratings
-- Poistetaan tilapäinen taulu ja luodaan lopullinen VIEW-rakenne
DROP TABLE IF EXISTS `commentsandratings`;
CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `commentsandratings` AS select `g`.`Userid` AS `Userid`,`g`.`Commentid` AS `Commentid`,`g`.`Direction` AS `Direction`,`s`.`Commenttext` AS `Commenttext`,`s`.`Commentrecipe` AS `Commentrecipe`,`s`.`Commentuserid` AS `Commentuserid` from (`Commentrating` `g` join `Comments` `s` on((`g`.`Commentid` = `s`.`Commentid`)));

-- Dumping structure for näkymä jakrecipes.commentsandusers
-- Poistetaan tilapäinen taulu ja luodaan lopullinen VIEW-rakenne
DROP TABLE IF EXISTS `commentsandusers`;
CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `commentsandusers` AS select `s`.`Commentid` AS `Commentid`,`s`.`Commenttext` AS `Commenttext`,`s`.`Commentrecipe` AS `Commentrecipe`,`s`.`Commentuserid` AS `Commentuserid`,`r`.`Userid` AS `Userid`,`r`.`Useremail` AS `Useremail`,`r`.`Userpassword` AS `Userpassword`,`r`.`Userrole` AS `Userrole`,`r`.`Userimg` AS `Userimg`,`r`.`Username` AS `Username` from (`Comments` `s` join `Users` `r` on((`s`.`Commentuserid` = `r`.`Userid`)));

-- Dumping structure for näkymä jakrecipes.dataview
-- Poistetaan tilapäinen taulu ja luodaan lopullinen VIEW-rakenne
DROP TABLE IF EXISTS `dataview`;
CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `dataview` AS select `s`.`Recipename` AS `Recipename`,`s`.`Recipeprice` AS `Recipeprice`,`s`.`Recipetime` AS `Recipetime`,`s`.`Recipeguide` AS `Recipeguide`,`r`.`Username` AS `Username`,`e`.`Imagefilepath` AS `Imagefilepath`,`u`.`Coursetype` AS `Coursetype`,`p`.`Mealtype` AS `Mealtype` from ((((`Recipes` `s` join `Users` `r` on((`s`.`Recipemaker` = `r`.`Userid`))) join `Images` `e` on((`e`.`Imagerecipe` = `s`.`Recipeid`))) join `Courses` `u` on((`s`.`Recipecourse` = `u`.`Courseid`))) join `Mealtypes` `p`);

-- Dumping structure for näkymä jakrecipes.mostliked
-- Poistetaan tilapäinen taulu ja luodaan lopullinen VIEW-rakenne
DROP TABLE IF EXISTS `mostliked`;
CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `mostliked` AS select `Reciperating`.`Recipeid` AS `recipeid`,sum(`Reciperating`.`Stars`) AS `summa` from `Reciperating` group by `Reciperating`.`Recipeid` order by sum(`Reciperating`.`Stars`) desc;

-- Dumping structure for näkymä jakrecipes.mostlikedbetter
-- Poistetaan tilapäinen taulu ja luodaan lopullinen VIEW-rakenne
DROP TABLE IF EXISTS `mostlikedbetter`;
CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `mostlikedbetter` AS select `normaluserview`.`Recipeid` AS `Recipeid`,`mostliked`.`summa` AS `summa`,`normaluserview`.`Recipename` AS `Recipename`,`normaluserview`.`Recipeprice` AS `Recipeprice`,`normaluserview`.`Recipetime` AS `Recipetime`,`normaluserview`.`Recipeguide` AS `Recipeguide`,`normaluserview`.`Imagefilepath` AS `Imagefilepath`,`normaluserview`.`Coursetype` AS `Coursetype`,`normaluserview`.`Mealtype` AS `Mealtype`,`normaluserview`.`Username` AS `Username` from (`mostliked` join `normaluserview`) where (`mostliked`.`recipeid` = `normaluserview`.`Recipeid`) group by `normaluserview`.`Recipeid` order by `mostliked`.`summa` desc;

-- Dumping structure for näkymä jakrecipes.normaluserview
-- Poistetaan tilapäinen taulu ja luodaan lopullinen VIEW-rakenne
DROP TABLE IF EXISTS `normaluserview`;
CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `normaluserview` AS select `Recipes`.`Recipeid` AS `Recipeid`,`Recipes`.`Recipename` AS `Recipename`,`Recipes`.`Recipetime` AS `Recipetime`,`Recipes`.`Recipeguide` AS `Recipeguide`,`Recipes`.`Recipemaker` AS `Recipemaker`,`Courses`.`Coursetype` AS `Coursetype`,`Recipes`.`Recipeprice` AS `Recipeprice`,`Images`.`Imagefilepath` AS `Imagefilepath`,`Mealtypes`.`Mealtype` AS `Mealtype`,`Users`.`Username` AS `Username` from (((((`Recipes` join `Courses` on((`Courses`.`Courseid` = `Recipes`.`Recipecourse`))) left join `Images` on((`Images`.`Imagerecipe` = `Recipes`.`Recipeid`))) left join `Recipemealtype` on((`Recipemealtype`.`Recipeid` = `Recipes`.`Recipeid`))) left join `Mealtypes` on((`Recipemealtype`.`Mealid` = `Mealtypes`.`Mealid`))) left join `Users` on((`Recipes`.`Recipemaker` = `Users`.`Userid`)));

-- Dumping structure for näkymä jakrecipes.normaluserviewvanha
-- Poistetaan tilapäinen taulu ja luodaan lopullinen VIEW-rakenne
DROP TABLE IF EXISTS `normaluserviewvanha`;
CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `normaluserviewvanha` AS select `s`.`Recipeid` AS `Recipeid`,`s`.`Recipename` AS `Recipename`,`s`.`Recipeprice` AS `Recipeprice`,`s`.`Recipetime` AS `Recipetime`,`s`.`Recipeguide` AS `Recipeguide`,`r`.`Username` AS `Username`,`e`.`Imagefilepath` AS `Imagefilepath`,`u`.`Coursetype` AS `Coursetype`,`p`.`Mealtype` AS `Mealtype` from ((((`Recipes` `s` join `Users` `r` on((`s`.`Recipemaker` = `r`.`Userid`))) join `Images` `e` on((`e`.`Imagerecipe` = `s`.`Recipeid`))) join `Courses` `u` on((`s`.`Recipecourse` = `u`.`Courseid`))) join `Mealtypes` `p`);

-- Dumping structure for näkymä jakrecipes.presentationview
-- Poistetaan tilapäinen taulu ja luodaan lopullinen VIEW-rakenne
DROP TABLE IF EXISTS `presentationview`;
CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `presentationview` AS select `s`.`Recipeid` AS `Recipeid`,`s`.`Recipename` AS `Recipename`,`s`.`Recipetime` AS `Recipetime`,`s`.`Recipeguide` AS `Recipeguide`,`s`.`Recipemaker` AS `Recipemaker`,`s`.`Recipeprice` AS `Recipeprice`,`e`.`Mealid` AS `Mealid`,`e`.`Mealtype` AS `Mealtype`,`r`.`Courseid` AS `Courseid`,`r`.`Coursetype` AS `Coursetype`,`g`.`Imageid` AS `Imageid`,`g`.`Imagefilepath` AS `Imagefilepath`,`g`.`Imagerecipe` AS `Imagerecipe` from (`Recipes` `s` join ((`Mealtypes` `e` join `Courses` `r`) join `Images` `g`));

-- Dumping structure for näkymä jakrecipes.reguserprofileview
-- Poistetaan tilapäinen taulu ja luodaan lopullinen VIEW-rakenne
DROP TABLE IF EXISTS `reguserprofileview`;
CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `reguserprofileview` AS select `Recipes`.`Recipeid` AS `Recipeid`,`Recipes`.`Recipename` AS `Recipename`,`Recipes`.`Recipetime` AS `Recipetime`,`Recipes`.`Recipeguide` AS `Recipeguide`,`Recipes`.`Recipemaker` AS `Recipemaker`,`Courses`.`Coursetype` AS `Coursetype`,`Recipes`.`Recipeprice` AS `Recipeprice`,`Images`.`Imagefilepath` AS `Imagefilepath`,`Mealtypes`.`Mealtype` AS `Mealtype`,`Users`.`Userid` AS `Userid`,`Users`.`Username` AS `Username` from (((((`Recipes` join `Courses` on((`Courses`.`Courseid` = `Recipes`.`Recipecourse`))) left join `Images` on((`Images`.`Imagerecipe` = `Recipes`.`Recipeid`))) left join `Recipemealtype` on((`Recipemealtype`.`Recipeid` = `Recipes`.`Recipeid`))) left join `Mealtypes` on((`Recipemealtype`.`Mealid` = `Mealtypes`.`Mealid`))) left join `Users` on((`Recipes`.`Recipemaker` = `Users`.`Userid`)));

-- Dumping structure for näkymä jakrecipes.reguserprofileviewvanha
-- Poistetaan tilapäinen taulu ja luodaan lopullinen VIEW-rakenne
DROP TABLE IF EXISTS `reguserprofileviewvanha`;
CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `reguserprofileviewvanha` AS select `s`.`Recipeid` AS `Recipeid`,`s`.`Recipename` AS `Recipename`,`s`.`Recipeprice` AS `Recipeprice`,`s`.`Recipetime` AS `Recipetime`,`s`.`Recipeguide` AS `Recipeguide`,`r`.`Username` AS `Username`,`e`.`Imagefilepath` AS `Imagefilepath`,`u`.`Coursetype` AS `Coursetype`,`p`.`Mealtype` AS `Mealtype`,`r`.`Userid` AS `Userid` from ((((`Recipes` `s` join `Users` `r` on((`s`.`Recipemaker` = `r`.`Userid`))) join `Images` `e` on((`e`.`Imagerecipe` = `s`.`Recipeid`))) join `Courses` `u` on((`s`.`Recipecourse` = `u`.`Courseid`))) join `Mealtypes` `p`);

-- Dumping structure for näkymä jakrecipes.usersandimages
-- Poistetaan tilapäinen taulu ja luodaan lopullinen VIEW-rakenne
DROP TABLE IF EXISTS `usersandimages`;
CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `usersandimages` AS select `s`.`Userid` AS `Userid`,`s`.`Useremail` AS `Useremail`,`s`.`Userpassword` AS `Userpassword`,`s`.`Userrole` AS `Userrole`,`s`.`Userimg` AS `Userimg`,`s`.`Username` AS `Username`,`e`.`Imageid` AS `Imageid`,`e`.`Imagefilepath` AS `Imagefilepath`,`e`.`Imagerecipe` AS `Imagerecipe` from (`Users` `s` join `Images` `e` on((`s`.`Userimg` = `e`.`Imageid`)));
-- user creation

CREATE USER 'jakrecuser'@localhost IDENTIFIED BY 'xjakrecuserx';
CREATE USER 'jakrecadmin'@localhost IDENTIFIED BY 'xjakrecadminx';
CREATE USER 'jakrecreguser'@localhost IDENTIFIED BY 'xjakrecreguserx';

-- user privileges

GRANT ALL PRIVILEGES ON *.* TO 'jakrecadmin'@'localhost' REQUIRE NONE WITH GRANT OPTION MAX_QUERIES_PER_HOUR 0 MAX_CONNECTIONS_PER_HOUR 0 MAX_UPDATES_PER_HOUR 0 MAX_USER_CONNECTIONS 0;
GRANT SELECT, INSERT, UPDATE, DELETE ON *.* TO 'jakrecreguser'@'localhost' REQUIRE NONE WITH MAX_QUERIES_PER_HOUR 0 MAX_CONNECTIONS_PER_HOUR 0 MAX_UPDATES_PER_HOUR 0 MAX_USER_CONNECTIONS 0;
GRANT SELECT ON *.* TO 'jakrecuser'@'localhost' REQUIRE NONE WITH MAX_QUERIES_PER_HOUR 0 MAX_CONNECTIONS_PER_HOUR 0 MAX_UPDATES_PER_HOUR 0 MAX_USER_CONNECTIONS 0;
/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
