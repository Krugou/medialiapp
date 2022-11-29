INSERT into Users (Useremail,userpassword, role)
 values ( 'test@test.fi', 'test', '1'   )


SELECT COUNT(*) FROM Users WHERE Userrole = 1


-- laske kaikki taulujen tietueet

SELECT 'Recipeid'  AS Recipescount, COUNT(*) FROM Recipes
UNION
SELECT 'Userid' AS userscount, COUNT(*) FROM Users
UNION
SELECT 'Commentid' AS commentcount, COUNT(*) FROM Comments
UNION
SELECT 'Courseid' AS courceidcount, COUNT(*) FROM Courses
UNION
SELECT 'Imageid' AS imagecount, COUNT(*) FROM Images
UNION
SELECT 'direction' AS directioncount, COUNT(*) FROM Commentrating
UNION
SELECT 'Mealtype' AS Mealtypecount, COUNT(*) FROM Mealtypes
UNION
SELECT 'stars' AS starscount, COUNT(*) FROM Reciperating