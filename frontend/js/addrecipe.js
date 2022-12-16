'use strict';

const postButton = document.querySelector('#postRecipe');
const tagModal = document.querySelector('#tags');
const tagButton = document.querySelector('#tag');
let selectedTags = []; // Tähän syötetään valittujen ruokalajien id:t
const instructionDiv = document.querySelector('.instruction');

const addTags = (tags) => { // Syötetään objekti jossa ruokalajien infot

  tagModal.innerHTML = '';
  tags.forEach((tag) => {
    const button = document.createElement('button');
    button.innerHTML = tag.Mealtype;
    button.classList.add('mealtypeButtons');

    if (!selectedTags.includes(tag.Mealid)) { // Jos tagia ei ole jo valittu, luodaan se valikkoon
      tagModal.appendChild(button);
      button.addEventListener('click', () => {
        selectedTags.push(tag.Mealid); // Laitetaan Valittuihin tageihin ainoastaan ID:t
        tagModal.removeChild(button);

        const button2 = document.createElement('button');
        button2.innerHTML = tag.Mealtype;
        button2.classList.add('selectedMealTypeButtons');
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

// Haetaan tietokannasta dynaamisesti ruokalaji vaihtoehdot, kun "lisää tageja"-nappia painetaan.
tagButton.addEventListener('click', async (evt) => {
  evt.preventDefault();
  try {
    const response = await fetch(url + '/recipeslimited/mealtypes');
    const tags2 = await response.json();
    addTags(tags2); //Luodaan tagit modaliin kutsumalla sen funktiota
  } catch (e) {
    console.log(e.message);
  }
});

postButton.addEventListener('click', async (evt) => {
  evt.preventDefault();
  const recipenameInput = document.querySelector('#recipenameInput').value;
  const recipeguide = document.querySelector('#recipeguide').value;
  const courseselect = document.querySelector('#courseselect').value;
  const recipetimeInput = document.querySelector('#recipetimeInput').value;
  const recipepriceInput = document.querySelector('#addrecipePrice').value;

  const addForm = document.querySelector('#recipeAddimagebutton');

  const fd = new FormData(addForm);
  fd.append('name', recipenameInput);
  fd.append('guide', recipeguide);
  fd.append('course', courseselect);
  fd.append('time', recipetimeInput);
  fd.append('mealtypes', selectedTags);
  fd.append('price', recipepriceInput);


  const fetchOptions = {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + sessionStorage.getItem('token'),
    },
    body: fd,
  };
  const response = await fetch(url + '/recipes', fetchOptions);
  const json = await response.json();
  alert(json.message);
  if (json.message === 'Resepti lisätty') {
    location.href = 'index.html';
  }
});
