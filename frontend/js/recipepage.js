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
const recipeTags = document.querySelector('#recipesTags');

// add existing cat data to form
const getRecipe = async (id) => {
    const fetchOptions = {
        headers: {
          //  Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        },
    };
    let recipes;
    const response = await fetch(url + '/recipes/' + id, fetchOptions);
    const recipe = await response.json();

    console.log(recipe);
    recipeName.innerHTML = recipe.recipes.Recipename;
    instructions.innerText = recipe.recipes.Recipeguide;
    if (recipe.recipes.Recipetime) {
       const recipeTimePara = document.createElement('p');
       recipeTimePara.innerText = "Valmistusaika: " +recipe.recipes.Recipetime+ " Minuuttia";
       recipeTime.appendChild(recipeTimePara);
    }
    if (recipe.mealtypes){
        for (let i=0; i<recipe.mealtypes.length; i++) {
            const button = document.createElement('button');
            button.innerText = recipe.mealtypes[i].Mealtype;
            button.classList.add('postRecipe');
            recipeTags.appendChild(button);
        }
    }
    console.log(recipe.Images[0]);
    img.src=url+'/'+recipe.Images[0].Imagefilepath;

   // img.src = `${url}/${cat.filename}`;
    //addMarker(JSON.parse(cat.coords));
};

getRecipe(recipe_id);
