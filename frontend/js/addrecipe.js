'use strict';
const postButton = document.querySelector('.post');
const tagModal = document.querySelector('.tags');
const tagButton = document.querySelector('#tag');
//const mealtypeButtons = document.querySelector('.tagButtons')
let selectedTags = []; // Tähän syötetään valittujen mealtyypien id:t
const instructionDiv = document.querySelector('.instruction');
let tags = [
    {
        Mealid: 1,
        Mealtype: "Kasvisruoka",  //Fake database

    },
    {
        Mealid: 2,
        Mealtype: "Liharuoka",
    }
];
const addTags = (tags) => { // Syötetään objekti jossa mealtype infot

    tagModal.innerHTML = "";
    tags.forEach((tag) => {
        const button = document.createElement('button');
        button.innerHTML = tag.Mealtype;
        button.classList.add('mealtypeButtons');
        tagModal.appendChild(button);
        button.addEventListener('click', () => {
            console.log("asd1");
            for (let i = 0; i < selectedTags.length; i++) {
                if (selectedTags[i] === tag.Mealtype)
                    return;
            }
            selectedTags.push(tag.Mealtype);
            console.log(selectedTags);

            // TODO NÄYTÄ SELECTEDTAGS SIVULLA, MISTÄ VOI MYÖS POISTAA KO. TAGIN
            const button2 = document.createElement('button');
            button2.innerHTML = tag.Mealtype;
            button2.classList.add("selectedMealTypeButtons");
            instructionDiv.appendChild(button2);
            button2.addEventListener('click', () => {
               // console.log("hähää");
             //   console.log(tag.Mealtype);
                const poista = selectedTags.indexOf(tag.Mealtype);
                 selectedTags.splice(poista, 1);
                instructionDiv.removeChild(button2);
               // console.log(selectedTags);
                alert('Tagi: "'+ tag.Mealtype + '" poistettiin.');
            });

            });

    });

};


tagButton.addEventListener('click', async (evt) => {
    evt.preventDefault()



    addTags(tags);


});


postButton.addEventListener('click', async (evt) => {
    evt.preventDefault();
    const emailInput = document.querySelector('#emailInput').value;
    const passwordInput = document.querySelector('#passwordInput').value;
    const fd = new FormData(addForm);
    const fetchOptions = {
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        },
        body: fd,
    };
    console.log(fetchOptions);
    const response = await fetch(url + '/cat', fetchOptions);
    const json = await response.json();
    alert(json.message);
    location.href = 'front.html';

});
