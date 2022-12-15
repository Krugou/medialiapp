'use strict';

const signupButton = document.querySelector('#signupNappi');

signupButton.addEventListener('click', async (evt) => {
  evt.preventDefault();
  const emailInput = document.querySelector('#emailInput').value;
  const usernameInput = document.querySelector('#userNameInput').value;
  const passwordInput = document.querySelector('#passwordInput').value;

  const data = {
    email: emailInput,
    password: passwordInput,
    username: usernameInput,
  };

  console.log(data);

  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(url + '/userslimited', fetchOptions);
  const json = await response.json();
  alert(json.message);
  document.querySelector('#emailInput').value = '';
  document.querySelector('#passwordInput').value = '';

  if (json.message === 'Tili luotu' || '') {
    location.href = 'signIn.html';
  }

});

