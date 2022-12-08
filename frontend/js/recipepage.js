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
const postComment = document.querySelector('#postACommentButton');

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

    // Jos reseptille on asetettu valmistusaika, näytetään se sivulla.
    if (recipe.recipes.Recipetime) {
       const recipeTimePara = document.createElement('p');
       recipeTimePara.innerText = "Valmistusaika: " +recipe.recipes.Recipetime+ " Minuuttia";
       recipeTime.appendChild(recipeTimePara);
    }

    // Jos reseptille on annettu tageja, näytettään ne sivulla.
    if (recipe.mealtypes){
        for (let i=0; i<recipe.mealtypes.length; i++) {
            const button = document.createElement('button');
            button.innerText = recipe.mealtypes[i].Mealtype;
            button.classList.add('postRecipe');
            recipeTags.appendChild(button);
        }
    }
    const button = document.createElement('button');
    button.innerText = recipe.course.Coursetype;
    button.classList.add('postRecipe');
    recipeTags.appendChild(button);
    console.log(recipe.images[0]);
    img.src=url+'/'+recipe.images[0].Imagefilepath;
    if (recipe.images[0].Imagefilepath === 'undefined') {
        img.src="./media/logos/jakrecipeslogo.svg";

    }
   // img.src = `${url}/${cat.filename}`;
    //addMarker(JSON.parse(cat.coords));
};
postComment.addEventListener('click', async evt => {

    let commentField = document.querySelector('#commentField').value;
    evt.preventDefault();
    console.log("jepjep");
    console.log(commentField);
    const data = {
        comment: commentField,
        recipeid: recipe_id,
    };
    const fetchOptions = {
        method: 'POST',
        headers: {
            // Authorization: 'Bearer ' + sessionStorage.getItem('token'),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };
    const response = await fetch(url + '/recipes/comment', fetchOptions);
    const json = await response.json();
    alert(json.message);
    document.querySelector('#commentField').value = "";
    document.location.reload();

});
getRecipe(recipe_id);
