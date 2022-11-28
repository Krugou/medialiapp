-- Ryhmän JAK tietokantaluonti scripti
-- jäsenet:
-- Joonas Lamminmäki
-- Aleksi Nokelainen
-- Kaarle Häyhä


DROP DATABASE IF EXISTS jakrecipes;
CREATE DATABASE IF NOT EXISTS `jakrecipes`  DEFAULT CHARACTER SET utf8 COLLATE UTF8_UNICODE_CI;

USE jakrecipes;
CREATE TABLE Mealtypes
(
  Mealid INT NOT NULL AUTO_INCREMENT,
  Mealtype VARCHAR(255) NOT NULL COMMENT "Esim. Kasvisruoka, liharuoka tai vegaaninen",

  PRIMARY KEY (Mealid)
);

CREATE TABLE Courses
(
  Courseid INT NOT NULL,
  Coursetype VARCHAR(255) NOT NULL COMMENT "Esim. jälkiruoka, pääruoka",


  PRIMARY KEY (Courseid)
);

CREATE TABLE Users
(
  Userid INT NOT NULL AUTO_INCREMENT,
  Useremail VARCHAR(255) NOT NULL,
  Userpassword VARCHAR(255) NOT NULL,
  Userrole INT(1) NOT NULL DEFAULT 1 COMMENT "admin=0, peruskäyttäjä=1",
  Userimg INT,


  PRIMARY KEY (Userid)
  FOREIGN KEY (Userimg) REFERENCES Images(Imageid)
);

CREATE TABLE Recipes
(
  Recipeid INT NOT NULL AUTO_INCREMENT,
  Recipename VARCHAR(255) NOT NULL,
  Recipetime INT COMMENT "Reseptin kesto sekuntteina",
  Recipeguide VARCHAR(1000) NOT NULL COMMENT "Reseptin ohje max 1000 merkkiä",
  Recipemaker INT NOT NULL COMMENT "Reseptin tekijän userid",
  Recipecourse INT NOT NULL,


  PRIMARY KEY (Recipeid),
  FOREIGN KEY (Recipemaker) REFERENCES Users(Userid),
  FOREIGN KEY (Recipecourse) REFERENCES Course(Courseid)
);

CREATE TABLE Images
(
  Imageid INT NOT NULL AUTO_INCREMENT,
  Imagefilepath VARCHAR(255) NOT NULL,
  Imagerecipe INT COMMENT "Voi olla NULL, koska kuvia on myös käyttäjille",


  PRIMARY KEY (Imageid),
  FOREIGN KEY (Imagerecipe) REFERENCES Recipes(Recipeid)
);

CREATE TABLE Comments
(
  Commentid INT NOT NULL AUTO_INCREMENT,
  Commenttext VARCHAR(500) NOT NULL,
  Commentrecipe INT NOT NULL,
  Commentuserid INT NOT NULL,


  PRIMARY KEY (Commentid),
  FOREIGN KEY (Commentrecipe) REFERENCES Recipes(Recipeid),
  FOREIGN KEY (Commentuserid) REFERENCES Users(Userid)
);

CREATE TABLE Recipemealtype
(
  Recipeid INT NOT NULL COMMENT "Liitettävä resepti",
  Mealid INT NOT NULL COMMENT "Liitettävä Mealtype (Kasvisruoka, liharuoka. etc)",


  PRIMARY KEY (Recipeid, Mealid),
  FOREIGN KEY (Recipeid) REFERENCES Recipes(Recipeid),
  FOREIGN KEY (Mealid) REFERENCES Ruokalajit(Mealid)
);

CREATE TABLE Commentrating
(
  Userid INT NOT NULL COMMENT "Kommentin arvioija USERID",
  Commentid INT NOT NULL COMMENT "Arvioitava kommentti",
  Direction INT(1) NOT NULL COMMENT "1 = tykkää, 0 = ei tykkää",


  PRIMARY KEY (Userid, Commentid),
  FOREIGN KEY (Userid) REFERENCES Users(Userid),
  FOREIGN KEY (Commentid) REFERENCES Comments(Commentid)
);

CREATE TABLE Reciperating
(
  Userid INT NOT NULL,
  Recipeid INT NOT NULL,
  Stars INT NOT NULL COMMENT "Montako tähteä resepti saa (1,2,3,4,5) ?",


  PRIMARY KEY (Userid, Recipeid),
  FOREIGN KEY (Userid) REFERENCES Users(Userid),
  FOREIGN KEY (Recipeid) REFERENCES Recipes(Recipeid)
);

CREATE TABLE Recipefavorite
(
  Userid INT NOT NULL COMMENT "Jos taulukosta löytyy käyttäjä/resepti pari, se on favoritattu",
  Recipeid INT NOT NULL,

  PRIMARY KEY (Userid, Recipeid),
  FOREIGN KEY (Userid) REFERENCES Users(Userid),
  FOREIGN KEY (Recipeid) REFERENCES Recipes(Recipeid)
);




---




CREATE DATABASE IF NOT EXISTS `jakrecipes`  DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;

CREATE TABLE Mealtypes
(
  Mealid INT NOT NULL AUTO_INCREMENT,
  Type VARCHAR(255) NOT NULL COMMENT "Esim. Kasvisruoka, liharuoka tai vegaaninen",

  PRIMARY KEY (MealID)
);

CREATE TABLE Courses
(
  CourseID INT NOT NULL,
  Type VARCHAR(255) NOT NULL COMMENT "Esim. jälkiruoka, pääruoka",


  PRIMARY KEY (CourseID)
);

CREATE TABLE Users
(
  UserID INT NOT NULL AUTO_INCREMENT,
  Email VARCHAR(255) NOT NULL,
  Password VARCHAR(255) NOT NULL,
  Role INT(1) NOT NULL DEFAULT 1 COMMENT "admin=0, peruskäyttäjä=1",
  ImageID INT,


  PRIMARY KEY (UserID),
  FOREIGN KEY (ImageID) REFERENCES Images(ImageID)
);

CREATE TABLE Recipes
(
  RecipeID INT NOT NULL AUTO_INCREMENT,
  Name VARCHAR(255) NOT NULL,
  Time INT COMMENT "Reseptin kesto sekuntteina",
  Guide VARCHAR(1000) NOT NULL COMMENT "Reseptin ohje max 1000 merkkiä",
  UserID INT NOT NULL COMMENT "Reseptin tekijän userid",
  CourseID INT NOT NULL,


  PRIMARY KEY (RecipeID),
  FOREIGN KEY (UserID) REFERENCES Users(UserID),
  FOREIGN KEY (CourseID) REFERENCES Course(CourseID)
);

CREATE TABLE Images
(
  ImageID INT NOT NULL AUTO_INCREMENT,
  Filepath VARCHAR(255) NOT NULL,
  RecipeID INT COMMENT "Voi olla NULL, koska kuvia on myös käyttäjille",


  PRIMARY KEY (ImageID),
  FOREIGN KEY (RecipeID) REFERENCES Recipes(RecipeID)
);

CREATE TABLE Comments
(
  CommentID INT NOT NULL AUTO_INCREMENT,
  Text VARCHAR(500), NOT NULL,
  RecipeID INT NOT NULL,
  UserID INT NOT NULL,


  PRIMARY KEY (CommentID),
  FOREIGN KEY (RecipeID) REFERENCES Recipes(RecipeID),
  FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

CREATE TABLE Recipemealtype
(
  RecipeID INT NOT NULL COMMENT "Liitettävä resepti",
  MealID INT NOT NULL COMMENT "Liitettävä Mealtype (Kasvisruoka, liharuoka. etc)",


  PRIMARY KEY (RecipeID, MealID),
  FOREIGN KEY (RecipeID) REFERENCES Recipes(RecipeID),
  FOREIGN KEY (MealID) REFERENCES Ruokalajit(MealID)
);

CREATE TABLE Commentrating
(
  UserID INT NOT NULL COMMENT "Kommentin arvioija USERID",
  CommentID INT NOT NULL COMMENT "Arvioitava kommentti",
  Direction INT(1) NOT NULL COMMENT "1 = tykkää, 0 = ei tykkää",


  PRIMARY KEY (UserID, CommentID),
  FOREIGN KEY (UserID) REFERENCES Users(UserID),
  FOREIGN KEY (CommentID) REFERENCES Comments(CommentID)
);

CREATE TABLE Reciperating
(
  UserID INT NOT NULL,
  RecipeID INT NOT NULL,
  Stars INT NOT NULL COMMENT "Montako tähteä resepti saa (1,2,3,4,5) ?",


  PRIMARY KEY (UserID, RecipeID),
  FOREIGN KEY (UserID) REFERENCES Users(UserID),
  FOREIGN KEY (RecipeID) REFERENCES Recipes(RecipeID)
);

CREATE TABLE Recipefavorite
(
  UserID INT NOT NULL COMMENT "Jos taulukosta löytyy käyttäjä/resepti pari, se on favoritattu",
  RecipeID INT NOT NULL,

  PRIMARY KEY (UserID, RecipeID),
  FOREIGN KEY (UserID) REFERENCES Users(UserID),
  FOREIGN KEY (RecipeID) REFERENCES Recipes(RecipeID)
);







---
CREATE DATABASE IF NOT EXISTS `jakrecipes`  DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;

CREATE TABLE Ruokalajit
(
  Nimi INT NOT NULL,
  MealID INT NOT NULL,
  PRIMARY KEY (MealID)
);

CREATE TABLE Course
(
  CourseID INT NOT NULL,
  Type INT NOT NULL,
  PRIMARY KEY (CourseID)
);

CREATE TABLE Users
(
  Email INT NOT NULL,
  Password INT NOT NULL,
  Role INT NOT NULL,
  UserID INT NOT NULL,
  ImageID INT NOT NULL,
  PRIMARY KEY (UserID),
  FOREIGN KEY (ImageID) REFERENCES Images(ImageID)
);

CREATE TABLE Recipes
(
  RecipeID INT NOT NULL,
  Name INT NOT NULL,
  Time INT NOT NULL,
  Guide INT NOT NULL,
  Stars INT NOT NULL,
  UserID INT NOT NULL,
  CourseID INT NOT NULL,
  PRIMARY KEY (RecipeID),
  FOREIGN KEY (UserID) REFERENCES Users(UserID),
  FOREIGN KEY (CourseID) REFERENCES Course(CourseID)
);

CREATE TABLE Images
(
  Filepath INT NOT NULL,
  ImageID INT NOT NULL,
  RecipeID INT NOT NULL,
  PRIMARY KEY (ImageID),
  FOREIGN KEY (RecipeID) REFERENCES Recipes(RecipeID)
);

CREATE TABLE Comments
(
  Text INT NOT NULL,
  CommentID INT NOT NULL,
  RecipeID INT NOT NULL,
  UserID INT NOT NULL,
  PRIMARY KEY (CommentID),
  FOREIGN KEY (RecipeID) REFERENCES Recipes(RecipeID),
  FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

CREATE TABLE Has
(
  RecipeID INT NOT NULL,
  MealID INT NOT NULL,
  PRIMARY KEY (RecipeID, MealID),
  FOREIGN KEY (RecipeID) REFERENCES Recipes(RecipeID),
  FOREIGN KEY (MealID) REFERENCES Ruokalajit(MealID)
);

CREATE TABLE rating
(
  Direction INT NOT NULL,
  UserID INT NOT NULL,
  CommentID INT NOT NULL,
  PRIMARY KEY (UserID, CommentID),
  FOREIGN KEY (UserID) REFERENCES Users(UserID),
  FOREIGN KEY (CommentID) REFERENCES Comments(CommentID)
);
--sacidunacja hvasd gyGYd gYWDGYUdygiQW GYWD


CREATE TABLE IF NOT EXISTS `users` (
  `user_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `role` INT NOT NULL,

  PRIMARY KEY (`user_id`)

) ENGINE = INNODB;


CREATE TABLE IF NOT EXISTS `recipes`
(
    `recipe_id` int not null auto_increment,
    `recipe_name` varchar(100) not null,
    `recipe_guide` varchar(1000) not null,
    `recipe_time` float,
    `recipe_meal` varchar(100) COMMENT "Esim. jälkiruoka, pääruoka",
    `recipe_type` varchar(100) COMMENT "Esim. Kasvisruoka, liharuoka tai vegaaninen",
    `recipe_owner` int not null,
    `recipe_image` int not null,
    `recipe_stars` int not null,
    `recipe_comments` int not null,



    primary key (`recipe_id`)
    FOREIGN KEY (`recipe_comments`) REFERENCES `comments`(´comments_id´)
    FOREIGN KEY (`recipe_stars`) REFERENCES `stars`(´star_id´)
    FOREIGN KEY (`recipe_image`) REFERENCES `images`(´image_id´)
    FOREIGN KEY (`recipe_owner`) REFERENCES `users`(´user_id´)

 --       FOREIGN KEY (PersonID) REFERENCES Persons(PersonID)
)ENGINE = InnoDB;;

 CREATE TABLE IF NOT EXISTS `comments` (
   `comment_id` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT "Yhden kommentin id",
   `comments_id` INT NOT NULL COMMENT "Yhden reseptin kommentit",
   `comment_message` VARCHAR(300),
   `comment_likes` INT,
   `comment_dislikes` INT,

   PRIMARY KEY (`comment_id`)
 ) ENGINE = InnoDB;



 CREATE TABLE IF NOT EXISTS `table_name` (
   `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
   `name` VARCHAR(255),
   PRIMARY KEY `pk_id`(`id`)
 ) ENGINE = InnoDB;

 CREATE TABLE IF NOT EXISTS `table_name` (
   `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
   `name` VARCHAR(255),
   PRIMARY KEY `pk_id`(`id`)
 ) ENGINE = InnoDB;



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





-- index esimerkki
-- INDEX `email_idx` (`email` ASC),







-- esimerkki create table 

-- CREATE TABLE IF NOT EXISTS `table_name` (
--   `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
--   `name` VARCHAR(255),
--   PRIMARY KEY `pk_id`(`id`)
-- ) ENGINE = InnoDB;










