const presentationdata = document.getElementById('presentationdata');

function createResults(json, target, length) {
  if (length === undefined) {
    length = json.recipesTable.length;
  }
  if (target === undefined) {
    target = presentationdata;
  }

  for (let i = 0; i < (length); i++) {
    const figure = document.createElement('figure');
    const img = document.createElement('img');
    // jos kuvaa ei ole, laitetaan placeholder
    if (json.recipesTable[i]?.Imagefilepath === 'null') {
      img.src = './media/logos/jakrecipeslogo.svg';

    } else {
      img.src = url + '/' + json.recipesTable[i]?.Imagefilepath;

    }
    img.alt = json.recipesTable[i].Recipename;
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
    button.innerText = 'Katso resepti';
    figure.appendChild(img);
    figure.appendChild(p);
    figure.appendChild(p2);
    figure.appendChild(p3);
    figure.appendChild(p4);
    figure.appendChild(button);
    figure.classList.add('recipefigure');
    target.appendChild(figure);
  };
}
// random number generator 1 - 2000
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));

}

function clearPage() {
  presentationdata.innerHTML = '';
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

      FieldElement1.innerText = '';
      frontPageQuery(typeInputFieldElement.value);
    }, 2500);

  };
};

let selector = "";
const radioButtons = document.querySelectorAll('.radio-btn');
const radioitems = document.querySelectorAll('.radio_button_item');
for (const button of radioButtons) {
  button.addEventListener('click', (event) => {

    // Check if the clicked button is checked
    if (event.target.checked) {
      selector = button;

    }

  });
}
for (let i = 0; i < radioitems.length; i++) {
  radioitems[i].addEventListener("click", function () {
    const current = document.getElementsByClassName("radio_btn_active");
    current[0].className = current[0].className.replace(" radio_btn_active",
      "");
    this.className += " radio_btn_active";
  });
}

function frontPageQuery(query) {
  const FieldElement1 = document.getElementById('loading');
  let selectedOption = selector.value;
  if (selectedOption === '1') {
    FieldElement1.innerText = 'Haetaan reseptejä nimen mukaan...';
    fetch(url + `/recipes/filterrecipes/` + query).then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw 'HTTP ERROR';
      }
    }).then((queryData) => {
      clearPage();
      createResults(queryData, presentationdata);

    }).catch((error) => {
    });
  } else if (selectedOption === '2') {
    FieldElement1.innerText = 'Haetaan reseptejä ruokalajin mukaan...';

    fetch(url + `/recipes/filtermealtypes/` + query).then(response => {
      if (response.ok) {

        return response.json();
      } else {
        throw 'HTTP ERROR';
      }
    }).then((queryData) => {
      clearPage();
      createResults(queryData, presentationdata);
      FieldElement1.innerText = '';
    }).catch((error) => {
    });
  } else if (selectedOption === '3') {
    FieldElement1.innerText = 'Haetaan reseptejä aterialajin mukaan...';

    fetch(url + `/recipes/filtercoursetypes/` + query).then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw 'HTTP ERROR';
      }
    }).then((queryData) => {
      clearPage();
      createResults(queryData, presentationdata);
      FieldElement1.innerText = '';
    }).catch((error) => {
    });
  } else if (selectedOption === '4') {
    FieldElement1.innerText = 'Haetaan reseptejä hinnan mukaan...';
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
      clearPage();
      createResults(queryData, presentationdata);
      FieldElement1.innerText = '';
    }).catch((error) => {
    });
  }
}