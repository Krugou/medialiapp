const presentationdata = document.getElementById('presentationdata');




async function newestPresentationData() {
    const response = await fetch(url + '/recipes/allrecipes/newest');
    const json = await response.json();

     createRecipes(json);

}
async function oldestPresentationData() {
    const response = await fetch(url + '/recipes/allrecipes/oldest');
    const json = await response.json();

    createRecipes(json);

    /*
    for (let i = 0; i < (json.length); i++) {

        // jos kuvaa ei ole, laitetaan placeholder
        if (json[i].Imagefilepath === 'null') {
            const replaceimage = "./media/logos/jakrecipeslogo.svg";
            loadout += '<figure class="recipefigure"><img src="' + replaceimage + '"><p>' + json[i].Recipename + '</p><p>' + json[i].Recipetime + '</p><p>' + json[i].Coursetype + '</p><p>' + json[i].Mealtype + '</p> <button class="recipesButtonFront"id="'+json[i].Recipeid+'"> Katso resepti</button ></figure >'
        } else {
            loadout += '<figure class="recipefigure"><img src="' + url + '/' + json[i].Imagefilepath + '"><p>' + json[i].Recipename + '</p><p>' + json[i].Recipetime + '</p><p>' + json[i].Coursetype + '</p><p>' + json[i].Mealtype + '</p> <button class="recipesButtonFront"id="'+json[i].Recipeid+'"> Katso resepti</button ></figure >'
        }
        presentationdata.innerHTML = loadout;
    }

     */

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

function createRecipes(json){
    for (let i = 0; i < (json.length); i++) {

        const figure = document.createElement('figure');
        const img = document.createElement('img');

        // jos kuvaa ei ole, laitetaan placeholder
        if (json[i].Imagefilepath === 'null') {
            img.src="./media/logos/jakrecipeslogo.svg";

        } else {
            img.src=json[i].Imagefilepath;
            //loadout += '<figure class="recipefigure"><img src="' + url + '/' + json[i].Imagefilepath + '"><p>' + json[i].Recipename + '</p><p>' + json[i].Recipetime + '</p><p>' + json[i].Coursetype + '</p><p>' + json[i].Mealtype + '</p> <button class="recipesButtonFront"id="'+json[i].Recipeid+'"> Katso resepti</button ></figure >'
        }

        const p = document.createElement('p');
        const p2 = document.createElement('p');
        const p3 = document.createElement('p');
        const p4 = document.createElement('p');
        const button = document.createElement('button');
        button.addEventListener('click', () => {
            console.log("täälä");
            location.href = 'recipe.html?id=' + json[i].Recipeid;
        });
        p.innerText=json[i].Recipename;
        p2.innerText=json[i].Recipetime;
        p3.innerText=json[i].Coursetype;
        p4.innerText=json[i].Mealtype;
        button.innerText = "Katso resepti";
        figure.appendChild(img);
        figure.appendChild(p);
        figure.appendChild(p2);
        figure.appendChild(p3);
        figure.appendChild(p4);
        figure.appendChild(button);
        figure.classList.add('recipefigure');
        presentationdata.appendChild(figure)
    }
}



