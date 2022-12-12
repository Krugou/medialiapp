'use strict';

const getQParam = (param) => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(param);
};

let selectedTags = [];

const recipenameInput = document.querySelector('#recipenameInput');
const recipeguide = document.querySelector('#recipeguide');
const courseselect = document.querySelector('#courseselect');
const recipetimeInput = document.querySelector('#recipetimeInput');
const recipepriceInput = document.querySelector('#addrecipePrice');
const editHeader = document.querySelector('#editRecipeh2');
// get id from address
const recipe_id = getQParam('id');

//Haetaan resepti
const getRecipe = async (id) => {
    const fetchOptions = {
        headers: {
            //  Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        },
    };
    const response = await fetch(url + '/recipes/' + id, fetchOptions);
    const recipe = await response.json();

    console.log(recipe);

    recipenameInput.value=recipe.recipes.Recipename;
    recipeguide.value = recipe.recipes.Recipeguide;
    courseselect.value = recipe.recipes.Recipecourse;
    recipetimeInput.value = recipe.recipes.Recipetime;
    recipepriceInput.value = recipe.recipes.Recipeprice;
    editHeader.innerHTML+=" "+recipe.recipes.Recipename;
    
    //
};
// Kutsutaan hakua reseptin idllä
getRecipe(recipe_id);