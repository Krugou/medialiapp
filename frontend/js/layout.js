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
const editFilter = document.getElementById("filterModal");

const filterButton = document.getElementById("filter");

let close = document.getElementsByClassName("close")[0];

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
newestPresentationData()

// main.js loppuu tähän

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



