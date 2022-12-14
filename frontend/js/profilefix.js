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
        const editModal = document.getElementById('editModal');




        const modal2_2 = document.createElement('DIV');
        modal2_2.setAttribute('class', 'modal-content');
        editModal.appendChild(modal2_2);

        const modal2_3 = document.createElement('SPAN');
        modal2_3.setAttribute('class', 'close');
        modal2_2.appendChild(modal2_3);

        const modal2_4 = document.createElement('DIV');
        modal2_4.setAttribute('class', 'username');
        modal2_2.appendChild(modal2_4);

        const modal2_5 = document.createElement('P');
        modal2_5.setAttribute('class', 'fontsizeforp');
        modal2_4.appendChild(modal2_5);

        const modal2_6 = document.createTextNode((new String("Käyttäjänimi")));
        modal2_5.appendChild(modal2_6);

        const modal2_7 = document.createElement('P');
        modal2_7.setAttribute('class', 'fontsizeforp');
        modal2_7.setAttribute('id', 'usernameset');
        modal2_4.appendChild(modal2_7);

        const modal2_8 = document.createElement('P');
        modal2_8.setAttribute('class', 'fontsizeforp');
        modal2_4.appendChild(modal2_8);

        const modal2_9 = document.createTextNode((new String("vaihda uuteen")));
        modal2_8.appendChild(modal2_9);

        const modal2_10 = document.createElement('INPUT');
        modal2_10.setAttribute('id', 'newusername');
        modal2_10.setAttribute('name', 'username');
        modal2_10.setAttribute('type', 'text');
        modal2_10.setAttribute('placeholder', 'nimimerkki');
        modal2_4.appendChild(modal2_10);

        const modal2_11 = document.createElement('DIV');
        modal2_11.setAttribute('class', 'pic');
        modal2_2.appendChild(modal2_11);

        const modal2_12 = document.createElement('P');
        modal2_12.setAttribute('class', 'fontsizeforp');
        modal2_11.appendChild(modal2_12);

        const modal2_13 = document.createTextNode((new String("Profile Picture")));
        modal2_12.appendChild(modal2_13);

        const modal2_14 = document.createElement('IMG');
        modal2_14.setAttribute('id', 'currentuserimage');
        modal2_14.setAttribute('alt', 'currentuserimage');
        modal2_11.appendChild(modal2_14);

        const modal2_15 = document.createElement('P');
        modal2_15.setAttribute('class', 'fontsizeforp');
        modal2_11.appendChild(modal2_15);

        const modal2_16 = document.createTextNode((new String("vaihda uuteen")));
        modal2_15.appendChild(modal2_16);

        const modal2_17 = document.createElement('INPUT');
        modal2_17.setAttribute('accept', 'image/*');
        modal2_17.setAttribute('id', 'file');
        modal2_17.setAttribute('multiple', 'multiple');
        modal2_17.setAttribute('name', 'userProfileImage');
        modal2_17.setAttribute('type', 'file');
        modal2_17.setAttribute('placeholder', 'kuva');
        modal2_11.appendChild(modal2_17);

        const modal2_18 = document.createElement('DIV');
        modal2_18.setAttribute('class', 'save');
        modal2_2.appendChild(modal2_18);

        const modal2_19 = document.createElement('BUTTON');
        modal2_19.setAttribute('id', 'saveButton');
        modal2_18.appendChild(modal2_19);

        const modal2_20 = document.createTextNode((new String("Save")));
        modal2_19.appendChild(modal2_20);

        const modal2_21 = document.createElement('BUTTON');
        modal2_21.setAttribute('id', 'delete');
        modal2_18.appendChild(modal2_21);

        const modal2_22 = document.createTextNode((new String("Delete Profile")));
        modal2_21.appendChild(modal2_22);

        const modal2_23 = document.createElement('DIV');
        modal2_23.setAttribute('class', 'modal');
        modal2_23.setAttribute('id', 'deleteModal');
        modal2_2.appendChild(modal2_23);

        const modal2_24 = document.createElement('DIV');
        modal2_24.setAttribute('class', 'modal-content');
        modal2_23.appendChild(modal2_24);

        const modal2_25 = document.createElement('SPAN');
        modal2_25.setAttribute('class', 'closeDelete');
        modal2_24.appendChild(modal2_25);

        const modal2_26 = document.createElement('DIV');
        modal2_24.appendChild(modal2_26);

        const modal2_27 = document.createElement('P');
        modal2_27.setAttribute('class', 'fontsizeforp');
        modal2_26.appendChild(modal2_27);

        const modal2_28 = document.createElement('DIV');
        modal2_28.setAttribute('class', 'deleteProfile');
        modal2_24.appendChild(modal2_28);

        const modal2_29 = document.createElement('BUTTON');
        modal2_29.setAttribute('id', 'noButton');
        modal2_28.appendChild(modal2_29);

        const modal2_30 = document.createTextNode((new String("Ei")));
        modal2_29.appendChild(modal2_30);

        const modal2_31 = document.createElement('BUTTON');
        modal2_31.setAttribute('id', 'yesButton');
        modal2_28.appendChild(modal2_31);


        const noButton = document.getElementById('noButton');

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




            fetch(url + '/users/profiledetails/' + JSON.parse(sessionStorage.getItem('user')).Username, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify({
                    Username: JSON.parse(sessionStorage.getItem('user')).Username,
                    Newusername: document.getElementById('newusername').value,

                    Imagefilepath: document.getElementById('userProfileImage').src,
                }),
            }).then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw 'HTTP ERROR';
                }
            }).then((data) => {
                console.log('data', data);
                sessionStorage.setItem('user', JSON.stringify(data));
                window.location.reload();
            }).catch((error) => {
                console.log('error', error);
            });
            console.log("🚀 ~ file: profilefix.js:156 ~ fetch ~ headers", headers)
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
                window.location.href = 'frontpage.html';
            }).catch((error) => {
                console.log(error);
            });
            deleteProfile.style.display = 'none';
        }

    }
}
createProfileRecipes(profileUser)
createProfileUser(profileUser)




