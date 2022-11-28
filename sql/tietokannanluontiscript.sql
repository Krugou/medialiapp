-- Ryhmän JAK tietokantaluonti scripti
-- jäsenet:
-- Joonas Lamminmäki
-- Aleksi Nokelainen
-- Kaarle Häyhä

CREATE TABLE Mealtype
(
  MealID INT NOT NULL AUTO_INCREMENT,
  Type VARCHAR(255) NOT NULL COMMENT "Esim. Kasvisruoka, liharuoka tai vegaaninen",

  PRIMARY KEY (MealID)
);

CREATE TABLE Course
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
  RecipeID INT NOT NULL,
  MealID INT NOT NULL,


  PRIMARY KEY (RecipeID, MealID),
  FOREIGN KEY (RecipeID) REFERENCES Recipes(RecipeID),
  FOREIGN KEY (MealID) REFERENCES Ruokalajit(MealID)
);

CREATE TABLE rating
(
  UserID INT NOT NULL,
  CommentID INT NOT NULL,
  Direction INT(1) NOT NULL COMMENT "1 = tykkää, 0 = ei tykkää",


  PRIMARY KEY (UserID, CommentID),
  FOREIGN KEY (UserID) REFERENCES Users(UserID),
  FOREIGN KEY (CommentID) REFERENCES Comments(CommentID)
);

CREATE TABLE Rate_recipe
(
  UserID INT NOT NULL,
  RecipeID INT NOT NULL,
  Stars INT NOT NULL COMMENT "Montako tähteä resepti saa (1,2,3,4,5) ?",


  PRIMARY KEY (UserID, RecipeID),
  FOREIGN KEY (UserID) REFERENCES Users(UserID),
  FOREIGN KEY (RecipeID) REFERENCES Recipes(RecipeID)
);

CREATE TABLE Favorite_recipe
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










