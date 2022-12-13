'use strict';



const getQParam = (param) => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(param);
};




const profileUser = getQParam('username');
console.log(profileUser);

const createProfileRecipes = async (username) => {




    // KIRJAUTUNUT KÄYTTÄJÄ


        const fetchOptions = {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token'),
            },
        };
        console.log('username', username);
        const response = await fetch(url + '/recipes/profile/' + username, fetchOptions);
        const json = await response.json();

        console.log("reseptien tiedot", json);


    // Rakenna reseptit sivulle
};

const createProfileUser = async (username) => {

    // KIRJAUTUMATON KÄYTTÄJÄ
    if (!sessionStorage.getItem('token') || !sessionStorage.getItem('user')) {
        console.log('username', username);
        const response = await fetch(url + '/users/limited/' + username);
        const json = await response.json();
        console.log("tietoa KIRJAUTUMATON", json);

    } else { // KIRJAUTUNUT KÄYTTÄJÄ
        const fetchOptions = {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token'),
            },
        };
        const response = await fetch(url + '/users/' + username, fetchOptions);
        const json = await response.json();
        console.log("tietoa KIRJAUTUNUT EI AUTHENTIKOI KÄYTTÄJÄÄ VIELÄ", json);

    }

// Rakenna profiili sivulle
};


createProfileRecipes(profileUser)

createProfileUser(profileUser)


