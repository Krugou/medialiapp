'use strict';

const getQParam = (param) => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(param);
};

let selectedTags = [];
//Haetaan sivulla olevia elementtejä
const recipenameInput = document.querySelector('#recipenameInput');
const recipeguide = document.querySelector('#recipeguide');
const courseselect = document.querySelector('#courseselect');
const recipetimeInput = document.querySelector('#recipetimeInput');
const recipepriceInput = document.querySelector('#addrecipePrice');
const editHeader = document.querySelector('#editRecipeh2');
const instructionDiv = document.querySelector('.instruction');

const postButton = document.querySelector('#postRecipe');
const tagModal = document.querySelector('#tags');
const tagButton = document.querySelector('#tag');

// Haetaan id osoitekentästä
const recipe_id = getQParam('id');

//Haetaan resepti
const getRecipe = async (id) => {
    const fetchOptions = {
        headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        },
    };
    const response = await fetch(url + '/recipes/' + id, fetchOptions);
    const recipe = await response.json();


    recipenameInput.value = recipe.recipes.Recipename;
    recipeguide.value = recipe.recipes.Recipeguide;
    courseselect.value = recipe.recipes.Recipecourse;
    recipetimeInput.value = recipe.recipes.Recipetime;
    recipepriceInput.value = recipe.recipes.Recipeprice;
    editHeader.innerHTML += " " + recipe.recipes.Recipename;


    for (let i = 0; i < recipe.mealtypes.length; i++) {
        selectedTags.push(recipe.mealtypes[i].Mealtype);
        removeFromSelectedButtons(recipe.mealtypes[i].Mealtype);
    }

};
// Kutsutaan hakua reseptin idllä
getRecipe(recipe_id);


const addTags = (tags) => { // Syötetään objekti jossa mealtype infot

    tagModal.innerHTML = '';
    //Tehdään tietokannasta haetuille tageille buttonit lisäätagi modalin taakse
    tags.forEach((tag) => {
        const button = document.createElement('button');
        button.innerHTML = tag.Mealtype;
        button.classList.add('mealtypeButtons');
        if (!selectedTags.includes(tag.Mealtype)) { // Valmiiksi valittuja tageja ei luoda enää uusiksi
            tagModal.appendChild(button);
        }
        button.addEventListener('click', () => {
            selectedTags.push(tag.Mealtype); // Laitetaan Valittuihin tageihin ainoastaan ruokalajit
            tagModal.removeChild(button);
            removeFromSelectedButtons(tag)
        });
    });
};
//Tehdään napit, jossa näkyy selectatut ruokalaji "tagit" joista voi myös poistaa tagin.
const removeFromSelectedButtons = (tag) => {
    const button2 = document.createElement('button');
    let poista;
    if (tag.Mealtype === undefined) {
        button2.innerHTML = tag;
        poista = tag;
    } else {
        button2.innerHTML = tag.Mealtype;
        poista = tag.Mealtype
    }
    button2.classList.add('selectedMealTypeButtons');
    instructionDiv.appendChild(button2);
    button2.addEventListener('click', () => {
        let poista2 = selectedTags.indexOf(poista);
        selectedTags.splice(poista2, 1);
        instructionDiv.removeChild(button2);

        alert('Tagi: "' + button2.innerHTML + '" poistettiin.');
    });

};
tagButton.addEventListener('click', async (evt) => {
    evt.preventDefault();
    try {
        const response = await fetch(url + '/recipeslimited/mealtypes');
        const tags2 = await response.json();
        addTags(tags2);
    } catch (e) {
        console.log(e.message);
    }
});

postButton.addEventListener('click', async (evt) => {
    evt.preventDefault();
    // Haetaan uudelleen nämä elementit, tällä kertaa niiden arvo, kun postaus tehdään.
    const recipenameInput = document.querySelector('#recipenameInput').value;
    const recipeguide = document.querySelector('#recipeguide').value;
    const courseselect = document.querySelector('#courseselect').value;
    const recipetimeInput = document.querySelector('#recipetimeInput').value;
    const recipepriceInput = document.querySelector('#addrecipePrice').value;
    const addForm = document.querySelector('#recipeAddimagebutton2');
    let tags2;
    try {
        const response = await fetch(url + '/recipeslimited/mealtypes');
        tags2 = await response.json();
    } catch (e) {
        console.log(e.message);
    }

    //Vaihdetaan ruokalajien nimien tilalle niiden idt
    for (let i = 0; i < selectedTags.length; i++) {
        for (let j = 0; j < tags2.length; j++) {
            if (tags2[j].Mealtype === selectedTags[i]) {
                selectedTags[i] = tags2[j].Mealid;
            }
        }
    }

    const fd = new FormData(addForm);
    fd.append('name', recipenameInput);
    fd.append('guide', recipeguide);
    fd.append('course', courseselect);
    fd.append('time', recipetimeInput);
    fd.append('mealtypes', selectedTags);
    fd.append('price', recipepriceInput);
    fd.append("recipeid", recipe_id);

    const fetchOptions = {
        method: 'PUT',
        headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        },
        body: fd,
    };
    const response = await fetch(url + '/recipes', fetchOptions);
    const json = await response.json();
    alert(json.message);
    if (json.message === 'Reseptiä muokattu') {
        location.href = 'recipe.html?id=' + recipe_id;
    }
});
