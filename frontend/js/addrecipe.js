'use strict';
const postButton = document.querySelector('.post');
const tagModal = document.querySelector('.tags');
const tagButton = document.querySelector('#tag');
//const mealtypeButtons = document.querySelector('.tagButtons')
let selectedTags = [];
let tags = [
    {
        Mealid:1,
        Mealtype:"Kasvisruoka",

    },
    {
        Mealid:2,
        Mealtype:"Liharuoka",
    }
];
const addTags = (tags) => {
    tagModal.innerHTML = "";
    tags.forEach((tag) => {
        const button = document.createElement('button');
        button.innerHTML = tag.Mealtype;
        button.classList.add('mealtypeButtons');
        tagModal.appendChild(button);
        button.addEventListener('click', () => {
            console.log("asd1");
            for (let i=0; i<selectedTags.length; i++)
            {
                if (selectedTags[i]===tag.Mealid)
                    return;
            }
            console.log("asd2");

            selectedTags.push(tag.Mealid);


        });

    });

    console.log(selectedTags);
};




tagButton.addEventListener('click', (evt) => {
    evt.preventDefault()
    addTags(tags);


});











postButton.addEventListener('click', async(evt) => {
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
