
// hae käyttäjän id session storagesta
// const userid = sessionStorage.getItem('userid');
// hae käyttäjän id:n perusteella reseptit
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
    }).catch((error) => {
    }
    );


