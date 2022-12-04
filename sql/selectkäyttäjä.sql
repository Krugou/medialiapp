SELECT recipename, recipetime,recipeguide,recipemaker,recipecourse,mealtype
FROM recipes INNER JOIN users ON recipes.recipemaker = users.Userid INNER JOIN recipemealtype on recipes.Recipeid = recipemealtype.Mealid INNER JOIN mealtypes on recipemealtype.Mealid = mealtypes.Mealtype   


