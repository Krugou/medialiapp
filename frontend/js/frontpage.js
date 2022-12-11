'use strict';
const addRecipeButton = document.querySelector('#addrecipesButton');

addRecipeButton.addEventListener('click', async (evt) => {
  evt.preventDefault();
  location.href = 'addRecipe.html';

});
