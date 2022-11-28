'use strict';

const signupButton = document.querySelector('#signupNappi');


signupButton.addEventListener('click', () => {

    const emailInput = document.querySelector('#emailInput').value;
    const usernameInput = document.querySelector('#usernameInput').value;
    const passwordInput = document.querySelector('#passwordInput').value;

    const data = [];

    data.push(emailInput, usernameInput, passwordInput);


    console.log(data);


    console.log("asd");


});

