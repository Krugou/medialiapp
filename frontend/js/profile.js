
let userid = ""
// hae käyttäjän id session storagesta
const sessionStorageDetails = sessionStorage.getItem('userid');
// haetaan urlista id

const urlParams = new URLSearchParams(window.location.search);
if (sessionStorageDetails === urlParams.get('id')) {
    userid = sessionStorageDetails;

}
else {
    userid = urlParams.get('id');

}


const userposts = document.getElementById('userPosts');

fetch(url + '/recipes/reguserprofile/3'/* + userid*/)
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw 'HTTP ERROR';
        }
    }

    ).then((queryData) => {

        createResults(queryData, userposts);
        getProfileDetails(userid);
    }).catch((error) => {
    }
    );
function getProfileDetails(userid) {
    let Imagefilepath
    // poista 3 ennen tuotantoon
    fetch(url + '/users/profiledetails/image/3'/* + userid*/)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw 'HTTP ERROR';
            }
        }
        ).then((result) => {


            const Imagefilepath = result.Imagefilepath;
            fetch(url + '/users/profiledetails/username/3'/* + userid*/)

                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw 'HTTP ERROR';
                    }
                }
                ).then((username) => {

                    profiledetails(Imagefilepath, username[0].Username);
                }).catch((error) => {
                    console.log(error);
                }
                );


        }
        ).catch((error) => {
            console.log(error);
        }

        );
}

function profiledetails(Imagefilepath, username) {
    if (Imagefilepath === 'undefined' || Imagefilepath === undefined) {
        Imagefilepath = './media/logos/jakrecipeslogo.svg';
    }


    userProfile = document.getElementById('userProfile');
    const profilePic = document.createElement('IMG');
    profilePic.setAttribute('alt', 'jakrecipeslogo');
    profilePic.setAttribute('id', 'profilepic');
    profilePic.setAttribute('src', Imagefilepath);
    userProfile.appendChild(profilePic);

    const profileP = document.createElement('P');
    profileP.setAttribute('class', 'fontsizeforp');
    userProfile.appendChild(profileP);
    profileP.innerText = username;

    if (sessionStorageDetails === urlParams.get('id') && sessionStorageDetails !== null ) {
        console.log(sessionStorageDetails)
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


