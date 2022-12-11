

function createResults(json) {


    for (let i = 0; i < (json.recipesTable.length); i++) {
        const figure = document.createElement('figure');
        const img = document.createElement('img');
        // jos kuvaa ei ole, laitetaan placeholder
        if (json.recipesTable[i]?.Imagefilepath === 'null') {
            img.src = "./media/logos/jakrecipeslogo.svg";

        } else {
            img.src = url + '/' + json.recipesTable[i]?.Imagefilepath;
            console.log(img.src)
            // loadout += '<figure class="recipefigure"><img src="' + url + '/' + json.recipesTable[i].Images.Imagefilepath + '"><p class="fontsizeforp">' + json.recipesTable[i].Recipename + '</p><p class="fontsizeforp">' + json.recipesTable[i].Recipetime + '</p><p class="fontsizeforp">' + json.recipesTable[i].Coursetype + '</p><p class="fontsizeforp">' + json.recipesTable[i].Mealtypes.Mealtype + '</p> <button class="recipesButtonFront"id="' + json.recipesTable[i].Recipeid + '"> Katso resepti</button ></figure >'
        }
        img.alt = "Reseptin kuva";
        const p = document.createElement('p');
        const p2 = document.createElement('p');
        const p3 = document.createElement('p');
        const p4 = document.createElement('p');
        const button = document.createElement('button');
        button.addEventListener('click', () => {
            location.href = 'recipe.html?id=' + json.recipesTable[i].Recipeid;
        });
        p.innerText = json.recipesTable[i].Recipename;
        p2.innerText = json.recipesTable[i].Recipetime;
        p3.innerText = json.recipesTable[i]?.Coursetype;
        p4.innerText = json.recipesTable[i]?.Mealtype;
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
function clearPage() {
    presentationdata.innerHTML = "";
}



let timeoutToken = 0;
window.onload = () => {
    const FieldElement1 = document.getElementById('loading');
    const typeInputFieldElement = document.getElementById('typeInputField');
    typeInputFieldElement.onkeyup = (event) => {

        clearTimeout(timeoutToken);
        if (typeInputFieldElement.value.trim().length === 0) {
            return;
        }
        timeoutToken = setTimeout(() => {
            const frontPageHeader = document.getElementById('frontPageHeader');
            FieldElement1.innerText = "";
            frontPageQuery(typeInputFieldElement.value);
        }, 2500);

        FieldElement1.innerText = "Ladataan...";
    };
};
function frontPageQuery(query) {
    // The select element
    let selector = document.getElementById("my-selector");

    // Get the selected option
    let selectedOption = selector.value;
    if (selectedOption === "1") {
        console.log("1")
        fetch(url + `/recipes/filterrecipes/` + query).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw 'HTTP ERROR';
            }
        }).then((queryData) => {

            clearPage()
            createResults(queryData);




        }).catch((error) => {
        });
    }
    else if (selectedOption === "2") {
        console.log("2")
        fetch(url + `/recipes/filtercoursetypes/` + query).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw 'HTTP ERROR';
            }
        }).then((queryData) => {

            clearPage()
            createResults(queryData);




        }).catch((error) => {
        });
    }
    else if (selectedOption === "3") {
        console.log("3")
        fetch(url + `/recipes/filtermealtypes/` + query).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw 'HTTP ERROR';
            }
        }).then((queryData) => {

            clearPage()
            createResults(queryData);




        }).catch((error) => {
        });
    } else if (selectedOption === "4") {
        console.log("4")
        // if query contains letters, do nothing
        if (query.match(/[a-z]/i)) {
            return;
        }

        fetch(url + `/recipes/filterbyprice/` + query).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw 'HTTP ERROR';
            }
        }).then((queryData) => {

            clearPage()
            createResults(queryData);
        }).catch((error) => {
        });
    }
}