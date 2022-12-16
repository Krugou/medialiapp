'use strict';



const getQParam = (param) => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(param);
};




const profileUser = getQParam('username');

const createProfileRecipes = async (username) => {




    // KIRJAUTUNUT KÄYTTÄJÄ


    const fetchOptions = {
        headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        },
    };
    console.log('username', username);
    fetch(url + '/recipeslimited/profile/' + username, fetchOptions)
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
    let response;
    let Imagefilepath
    // KIRJAUTUMATON KÄYTTÄJÄ
    if (!sessionStorage.getItem('token') || !sessionStorage.getItem('user')) {
        response = await fetch(url + '/userslimited/limited/' + username);
    } else {
        const fetchOptions = {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token'),
            },
        };
        response = await fetch(url + '/users/' + username, fetchOptions);
    }
    const json = await response.json();
    Imagefilepath = json.image[0]?.Imagefilepath;
    username = json.info.Username;
    profiledetails(Imagefilepath, username);

    // Rakenna profiili sivulle

};
function profiledetails(Imagefilepath, username) {
    if (Imagefilepath === 'undefined' || Imagefilepath === undefined || Imagefilepath === null || Imagefilepath === 'null' || Imagefilepath === '') {
        Imagefilepath = './media/logos/jakrecipeslogo.svg';
    }


    const userProfile = document.getElementById('userProfile');
    const profilePic = document.createElement('IMG');
    profilePic.setAttribute('alt', 'jakrecipeslogo');
    profilePic.setAttribute('id', 'profilepic');
    profilePic.src = url + '/' + Imagefilepath;
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
        const editModal = document.getElementById('editModal');






        const noButton = document.getElementById('noButton');

        const editProfile = document.getElementById('editModal');
        editProfile.style.display = 'none';

        const closeModal = document.getElementsByClassName('close')[0];

        const closeDelete = document.getElementsByClassName('closeDelete')[0];

        const deleteProfile = document.getElementById('deleteModal');

        const deleteButton = document.getElementById('delete');
        const saveButton = document.getElementById('saveButton');
        window.onclick = function (event) {
            if (event.target == editProfile) {
                editProfile.style.display = 'none';
            }
        };
        profileButton.onclick = function () {
            editProfile.style.display = 'block';
        };
        saveButton.onclick = function () {
            const newusername = document.getElementById('newusername').value;
            // validate newusername from sql

            const addForm = document.querySelector('#userProfileImage');

            const formData = new FormData(addForm);

            formData.append('Username', newusername);
            formData.append('oldUsername', profileUser);

            // put new username into sessionstorage


            fetch(url + '/users/profiledetails/' + JSON.parse(sessionStorage.getItem('user')).Username, {
                method: 'PUT',
                headers: {
                    // 'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + sessionStorage.getItem('token'),

                },
                body: formData
            }).then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw 'HTTP ERROR';
                }
            }).then((data) => {
                const user = JSON.parse(sessionStorage.getItem('user'));
                user.Username = newusername;
                sessionStorage.setItem('user', JSON.stringify(user));
                location.href = 'logout.html';
            }).catch((error) => {
                console.log('error', error);
            });

            editProfile.style.display = 'none';
        };

        closeModal.onclick = function () {
            editProfile.style.display = 'none';
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
        yesButton.onclick = function () {
            fetch(url + '/users/profiledetails/' + JSON.parse(sessionStorage.getItem('user')).Username, {
                method: 'DELETE',
                headers: {

                    Authorization: 'Bearer ' + sessionStorage.getItem('token'),
                },
            }).then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw 'HTTP ERROR';
                }
            }).then((queryData) => {
                console.log("delete onnistui", queryData);
                sessionStorage.clear();
                window.location.href = 'index.html';
            }).catch((error) => {
                console.log(error);
            });
            deleteProfile.style.display = 'none';
        }

    }
}
createProfileRecipes(profileUser)
createProfileUser(profileUser)




