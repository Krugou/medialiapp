'use strict';

const getQParam = (param) => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(param);
};

// get id from address
const recipe_id = getQParam('id');

// select existing html elements
const img = document.querySelector('#recipesImage');
const recipeName = document.querySelector('#recipeName');
const instructions = document.querySelector('#instructionPara');
const recipeTime = document.querySelector('#recipesTime');
const recipeTags= document.querySelector('#recipesTags');

// add existing cat data to form
const getRecipe = async (id) => {
    const fetchOptions = {
        headers: {
          //  Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        },
    };
    const response = await fetch(url + '/recipes/' + id, fetchOptions);
    const recipe = await response.json();
    console.log(recipe);
    recipeName.innerHTML = recipe.Recipename;
    instructions.innerText = recipe.Recipeguide;
    if (recipe.Recipetime) {
       const recipeTimePara = document.createElement('p');
       recipeTimePara.innerText = "Valmistusaika: " +recipe.Recipetime+ " Minuuttia";
       recipetime.appendChild(recipeTimePara);
    }


   // img.src=

   // img.src = `${url}/${cat.filename}`;
    //addMarker(JSON.parse(cat.coords));
};

getRecipe(recipe_id);
