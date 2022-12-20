'use strict';

const signinButton = document.querySelector('#signinNappi');

signinButton.addEventListener('click', async (evt) => {
  console.log('asd');
  evt.preventDefault();
 // Create a new variable to hold the value of the email input field
const emailInput = document.querySelector('#emailInput').value;

// Create a new variable to hold the value of the password input field
const passwordInput = document.querySelector('#passwordInput').value;

// Create a new object to store the email and password values
const data = {
  username: emailInput,
  password: passwordInput,
};
  // 1. Create a new object to store options for the fetch request.

// 2. Use the fetch function to make a POST request to the API endpoint.
fetch(apiUrl, fetchOptions)
// 3. Convert the response to JSON.
.then(response => response.json())
// 4. Handle the response.
.then(data => console.log(data))
  console.log(data);
  console.log(url);
   // Call the login API
  const response = await fetch(url + '/auth/login', fetchOptions);

  // Get the response data
  const json = await response.json();
  console.log('login response', json);
  // If user is not found (user is null), show error message from the JSON object
 if (!json.user) {
    alert(json.message);
  } else {
    // If user is found, save token and user info in local storage
    sessionStorage.setItem('token', json.token);
    sessionStorage.setItem('user', JSON.stringify(json.user));
    // Redirect to the index.html page
    location.href = 'index.html';
  }
});
