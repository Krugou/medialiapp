'use strict';
// main.js alkaa tästä

const presentationdata = document.getElementById('presentationdata');
async function newestPresentationData() {
    const response = await fetch(url + '/recipes/allrecipes/newest');
    const json = await response.json();
    let loadout = "";


    for (let i = 0; i < (json.length); i++) {

        // jos kuvaa ei ole, laitetaan placeholder
        if (json[i].Imagefilepath === 'null') {
            const replaceimage = "./media/logos/jakrecipeslogo.svg";
            loadout += '<figure class="recipefigure"><img src="' + replaceimage + '"><p>' + json[i].Recipename + '</p><p>' + json[i].Recipetime + '</p><p>' + json[i].Coursetype + '</p><p>' + json[i].Mealtype + '</p> <button > Katso resepti</button ></figure >'
        } else {
            loadout += '<figure class="recipefigure"><img src="' + url + '/' + json[i].Imagefilepath + '"><p>' + json[i].Recipename + '</p><p>' + json[i].Recipetime + '</p><p>' + json[i].Coursetype + '</p><p>' + json[i].Mealtype + '</p> <button > Katso resepti</button ></figure >'
        }
        presentationdata.innerHTML = loadout;
    }
}
async function oldestPresentationData() {
    const response = await fetch(url + '/recipes/allrecipes/oldest');
    const json = await response.json();
    let loadout = "";


    for (let i = 0; i < (json.length); i++) {

        // jos kuvaa ei ole, laitetaan placeholder
        if (json[i].Imagefilepath === 'null') {
            const replaceimage = "./media/logos/jakrecipeslogo.svg";
            loadout += '<figure class="recipefigure"><img src="' + replaceimage + '"><p>' + json[i].Recipename + '</p><p>' + json[i].Recipetime + '</p><p>' + json[i].Coursetype + '</p><p>' + json[i].Mealtype + '</p> <button > Katso resepti</button ></figure >'
        } else {
            loadout += '<figure class="recipefigure"><img src="' + url + '/' + json[i].Imagefilepath + '"><p>' + json[i].Recipename + '</p><p>' + json[i].Recipetime + '</p><p>' + json[i].Coursetype + '</p><p>' + json[i].Mealtype + '</p> <button > Katso resepti</button ></figure >'
        }
        presentationdata.innerHTML = loadout;
    }
}



// main.js loppuu tähän


// page generation

// kesken
async function checktoken() {
    // check sessionStorage
    if (!sessionStorage.getItem('token') || !sessionStorage.getItem('user')) {
        location.href = 'login.html';
        return;
    }
    // check if token valid
    try {
        const fetchOptions = {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token'),
            },
        };
        const response = await fetch(url + '/user/token', fetchOptions);
        if (!response.ok) {
            location.href = 'logout.html';
        } else {
            const json = await response.json();
            sessionStorage.setItem('user', JSON.stringify(json.user));
        }
    } catch (e) {
        // console.log(e.message);
    }

}

// frontpage.html alkaa tästä
const editFilter = document.getElementById("filterModal");
const filterButton = document.getElementById("filter");
let close = document.getElementsByClassName("close")[0]
filterButton.onclick = function () {
    editFilter.style.display = "block";
}

close.onclick = function () {
    editFilter.style.display = "none";
}
window.onclick = function (event) {
    if (event.target == editFilter) {
        editFilter.style.display = "none";
    }
}
// frontpage.html loppuu tähän

//frontpage.js alkaa tästä

const addRecipeButton = document.querySelector('#addrecipesButton');

addRecipeButton.addEventListener('click', async (evt) => {
    evt.preventDefault();
    location.href = 'addRecipe.html';


});
// frontpage.js loppuu tähän

// logout.js alkaa tästä
function logOut() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    frontPage();
}

// logout.js loppuu tähän

// addRecipe.js alkaa tästä
const postButton = document.querySelector('#postRecipe');
const tagModal = document.querySelector('#tags');
const tagButton = document.querySelector('#tag');
let selectedTags = []; // Tähän syötetään valittujen mealtyypien id:t
const instructionDiv = document.querySelector('.instruction');

const addTags = (tags) => { // Syötetään objekti jossa mealtype infot

    tagModal.innerHTML = "";
    tags.forEach((tag) => {
        const button = document.createElement('button');
        button.innerHTML = tag.Mealtype;
        button.classList.add('mealtypeButtons');
        if (!selectedTags.includes(tag.Mealid)) {
            tagModal.appendChild(button);
            button.addEventListener('click', () => {
                selectedTags.push(tag.Mealid); // Laitetaan Valittuihin tageihin ainoastaan ID:t
                tagModal.removeChild(button);

                // TODO NÄYTÄ SELECTEDTAGS SIVULLA, MISTÄ VOI MYÖS POISTAA KO. TAGIN
                const button2 = document.createElement('button');
                button2.innerHTML = tag.Mealtype;
                button2.classList.add("selectedMealTypeButtons");
                instructionDiv.appendChild(button2);
                button2.addEventListener('click', () => {
                    const poista = selectedTags.indexOf(tag.Mealid);
                    selectedTags.splice(poista, 1);
                    instructionDiv.removeChild(button2);
                    alert('Tagi: "' + tag.Mealtype + '" poistettiin.');
                });

            });
        }
    });

};


tagButton.addEventListener('click', async (evt) => {
    evt.preventDefault()
    //TODO HAE TAGIT DYNAAMISESTI TIETOKANNASTA
    try {
        const response = await fetch(url + '/recipes/mealtypes');
        const tags2 = await response.json();
        addTags(tags2);
    } catch (e) {
        // console.log(e.message);
    }
});

postButton.addEventListener('click', async (evt) => {
    evt.preventDefault();
    const recipenameInput = document.querySelector('#recipenameInput').value;
    const recipeguide = document.querySelector('#recipeguide').value;
    const courseselect = document.querySelector('#courseselect').value;
    const recipetimeInput = document.querySelector('#recipetimeInput').value;
    const addForm = document.querySelector('#recipeAddimagebutton');




    const fd = new FormData(addForm);
    fd.append("name", recipenameInput);
    fd.append("guide", recipeguide);
    fd.append("course", courseselect);
    fd.append("time", recipetimeInput);
    fd.append("mealtypes", selectedTags);

    console.log("fd", fd);
    const fetchOptions = {
        method: 'POST',
        headers: {
            // Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        },
        //  body: JSON.stringify(data),
        body: fd,
    };
    console.log(fetchOptions);
    const response = await fetch(url + '/recipes', fetchOptions);
    const json = await response.json();
    alert(json.message);
    //  location.href = 'frontpage.html';

});
// addRecipe.js loppuu tähän

// signIn.js alkaa tästä
const signinButton = document.querySelector('#signinNappi');

signinButton.addEventListener('click', async (evt) => {
    // console.log("asd");
    evt.preventDefault();
    const emailInputSignIn = document.querySelector('#emailInputSignIn').value;
    //const usernameInput = document.querySelector('#usernameInput').value;
    const passwordInput = document.querySelector('#passwordInputSignIn').value;
    const data = {
        username: emailInputSignIn,
        password: passwordInput
    }
    const fetchOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };
    // console.log(data);
    const response = await fetch(url + '/auth/login', fetchOptions);
    const json = await response.json();
    // console.log('login response', json);
    if (!json.user) {
        alert(json.message);
    } else {
        // save token
        sessionStorage.setItem('token', json.token);
        sessionStorage.setItem('user', JSON.stringify(json.user));
        location.href = 'frontpage.html';
    }
});
// signIn.js loppuu tähän

// registration.js alkaa tästä
const signupButton = document.querySelector('#signupNappi');


signupButton.addEventListener('click', async (evt) => {
    evt.preventDefault();
    const emailInputSignUp = document.querySelector('#emailInputSignUp').value;
    //const usernameInput = document.querySelector('#usernameInput').value;
    const passwordInput = document.querySelector('#passwordInputSignUp').value;

    const data = {
        email: emailInputSignUp,
        password: passwordInput
    };

    // console.log(data);

    const fetchOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };

    const response = await fetch(url + '/users', fetchOptions);
    const json = await response.json();
    alert(json.message);
    document.querySelector('#emailInputSignUp').value = "";
    document.querySelector('#passwordInputSignUp').value = "";

    if (json.message === "User Created" || "") {
        location.href = 'signIn.html';
    }

});
// registration.js loppuu tähän

// recipe.js alkaa tästä

// recipe.js loppuu tähän
console.log("asd");
newestPresentationData()

