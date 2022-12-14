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
    fetch(url + '/recipes/profile/' + username, fetchOptions)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw 'HTTP ERROR';
            }
        }
        ).then((queryData) => {
            console.log("reseptien tiedot", queryData);
            if (queryData.length === 0) {
                const userposts = document.getElementById('userPosts');
                const noRecipes = document.createElement('P');
                noRecipes.setAttribute('class', 'fontsizeforp');
                userposts.appendChild(noRecipes);
                noRecipes.innerText = 'Ei reseptejä';
            } else {
                // Rakenna reseptit sivulle
                const userposts = document.getElementById('userPosts');
                createResults(queryData, userposts);
            }
        }).catch((error) => {
            const userposts = document.getElementById('userPosts');
            const noRecipes = document.createElement('P');
            noRecipes.setAttribute('class', 'fontsizeforp');
            userposts.appendChild(noRecipes);
            noRecipes.innerText = 'Ei reseptejä';
        }
        );
};

const createProfileUser = async (username) => {
    let Imagefilepath
    // KIRJAUTUMATON KÄYTTÄJÄ
    if (!sessionStorage.getItem('token') || !sessionStorage.getItem('user')) {
        console.log('username', username);
        const response = await fetch(url + '/users/limited/' + username);
        const json = await response.json();
        console.log("tietoa KIRJAUTUMATON", json);
        Imagefilepath = json[0]?.Imagefilepath;
        username = json[0]?.Username;
        profiledetails(Imagefilepath, username);
    } else { // KIRJAUTUNUT KÄYTTÄJÄ
        const fetchOptions = {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token'),
            },
        };
        const response = await fetch(url + '/users/' + username, fetchOptions);
        const json = await response.json();
        console.log("tietoa KIRJAUTUNUT EI AUTHENTIKOI KÄYTTÄJÄÄ VIELÄ", json);
        Imagefilepath = json.image[0]?.Imagefilepath;
        username = json.info.Username;
        profiledetails(Imagefilepath, username);
    }

    // Rakenna profiili sivulle


};
function profiledetails(Imagefilepath, username) {
    if (Imagefilepath === 'undefined' || Imagefilepath === undefined) {
        Imagefilepath = './media/logos/jakrecipeslogo.svg';
    }


    const userProfile = document.getElementById('userProfile');
    const profilePic = document.createElement('IMG');
    profilePic.setAttribute('alt', 'jakrecipeslogo');
    profilePic.setAttribute('id', 'profilepic');
    profilePic.setAttribute('src', Imagefilepath);
    userProfile.appendChild(profilePic);

    const profileP = document.createElement('P');
    profileP.setAttribute('class', 'fontsizeforp');
    userProfile.appendChild(profileP);
    profileP.innerText = username;
    if (JSON.parse(sessionStorage.getItem('user')).Username === profileUser) {
        const profileButton = document.createElement('BUTTON');
        profileButton.setAttribute('id', 'editProfile');
        userProfile.appendChild(profileButton);
        profileButton.innerText = 'Muokkaa profiilia';


        const noButton = document.getElementById('noButton');

        const editProfile = document.getElementById('editModal');

        const closeModal = document.getElementsByClassName('close')[0];

        const closeDelete = document.getElementsByClassName('closeDelete')[0];

        const deleteProfile = document.getElementById('deleteModal');

        const deleteButton = document.getElementById('delete');

        profileButton.onclick = function () {
            editProfile.style.display = 'block';
        };

        closeModal.onclick = function () {
            editProfile.style.display = 'none';
        };

        window.onclick = function (event) {
            if (event.target == editProfile) {
                editProfile.style.display = 'none';
            }
        };
        deleteButton.onclick = function () {
            deleteProfile.style.display = 'block';
        };
        closeDelete.onclick = function () {
            deleteProfile.style.display = 'none';
        };

        noButton.onclick = function () {
            deleteProfile.style.display = 'none';
        };
    }
}
createProfileRecipes(profileUser)
createProfileUser(profileUser)




