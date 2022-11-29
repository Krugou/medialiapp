'use strict';
const url = 'https://10.114.34.72/app'
//const url = 'http://localhost:3000'; // change url when uploading to server
const signupButton = document.querySelector('#signupNappi');


signupButton.addEventListener('click', async(evt) => {
    evt.preventDefault();
    const emailInput = document.querySelector('#emailInput').value;
    const usernameInput = document.querySelector('#usernameInput').value;
    const passwordInput = document.querySelector('#passwordInput').value;

    const data = {
        email:emailInput,
        password:passwordInput
    };


    console.log(data);

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

});

