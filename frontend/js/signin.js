'use strict';

const signinButton = document.querySelector('#signinNappi');

signinButton.addEventListener('click', async (evt) => {
  console.log('asd');
  evt.preventDefault();
  const emailInput = document.querySelector('#emailInput').value;
  //const usernameInput = document.querySelector('#usernameInput').value;
  const passwordInput = document.querySelector('#passwordInput').value;
  const data = {
    username: emailInput,
    password: passwordInput,
  };
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  console.log(data);
  console.log(url);
  const response = await fetch(url + '/auth/login', fetchOptions);
  const json = await response.json();
  console.log('login response', json);
  if (!json.user) {
    alert(json.message);
  } else {
    // save token
    sessionStorage.setItem('token', json.token);
    sessionStorage.setItem('user', JSON.stringify(json.user));
    location.href = 'index.html';
  }
});