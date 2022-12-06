'use strict';


const pageGeneration = document.getElementById('pageGeneration');
const SignInNavLink = document.getElementById('signIn');
const SignUpNavLink = document.getElementById('signUp');
const logOutNavLink = document.getElementById('logOut');
const frontPageNavLink = document.getElementById('frontpage');

function startUp() {
    if (sessionStorage.getItem('token') === null) {
       
        // removeChildren(logOutNavLink);
        frontPage();
        newestPresentationData();
        // SignIn();
       

    } else {
        // removeChildren(SignInNavLink);
        frontPage();
        newestPresentationData();
    }
}
startUp();

async function newestPresentationData() {
    const response = await fetch(url + '/recipes/allrecipes/newest');
    const json = await response.json();
    let loadout = "";
    console.log("newest")
    const presentationdata = document.getElementById('presentationdata');

    for (let i = 0; i < (json.length); i++) {

        // jos kuvaa ei ole, laitetaan placeholder
        if (json[i].Imagefilepath === 'null') {
            const replaceimage = "./media/logos/jakrecipeslogo.svg";
            loadout += '<figure class="recipefigure"><img src="' + replaceimage + '"><p>' + json[i].Recipename + '</p><p>' + json[i].Recipetime + '</p><p>' + json[i].Coursetype + '</p><p>' + json[i].Mealtype + '</p> <button > Katso resepti</button ></figure >'
        } else {
            loadout += '<figure class="recipefigure"><img src="' + url + '/' + json[i].Imagefilepath + '"><p>' + json[i].Recipename + '</p><p>' + json[i].Recipetime + '</p><p>' + json[i].Coursetype + '</p><p>' + json[i].Mealtype + '</p> <button > Katso resepti</button ></figure >'
        }
        presentationdata.innerHTML = loadout;
    }
}
// page generation
function removeChildren(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}


async function frontPage() {
 console.log("frontpage")
    pageGeneration.innerHTML = ` <section id="etuyla" class="Etuylä"> <input type="text" aria-label="Reseptien haku" placeholder="Hae Resepti" class="Haeresepti marginhalfrem"> <button id="filter" class="marpad1rem">Filter</button> <div id="filterModal" class="modal"> <div class="modal-content"> <span class="close">&times;</span> <div class="modaladd"> <h3>Add Filters</h3> <div class="filters"> </div><div class="filtersave"> </div></div></div></div><div class="addRecipes"> <button href="addRecipe.html" id="addrecipesButton" class="marpad1rem">Tee resepti</a></button> </div></section> <h2 class="otsikko"> Uusimmat Reseptit</h2> <hr> <div class="reseptit" id="presentationdata"> </div>`
}
function clearPage() {
    pageGeneration.innerHTML = "";
}
async function addRecipes() {

    pageGeneration.innerHTML = `<h2 class="otsikko">Tee Uusi Resepti</h2> <div class="addRecipe_detail"> <div class="recipename"> <input id="recipenameInput" placeholder="Reseptin nimi 	&#40pakollinen&#41."> <button id="tag">Lisää tagi</button> <select title="ruoka" name="course" id="courseselect"> <option value="1">Aamiainen</option> <option value="2">Lounas</option> <option value="3">Päivällinen</option> <option value="4">Illallinen</option> </select> </div><div id="editModal" class="modal"> <div class="modal-content"> <span class="close">&times;</span> <div class="modaladd"> <h3>Lisää tageja</h3> <div class="tags" id="tags"> </div></div></div></div><form id="recipeAddimagebutton" class="imagebutton" enctype="multipart/form-data"> <input type="file" multiple="multiple" name="recipe" accept="image/*" 
     id="file"> </form> </div></div><div class="Recipe_desc"> <div class="instruction"> <form> <textarea id="recipeguide" placeholder="Reseptin ohje &#40pakollinen&#41."></textarea> </form> </div><input type="number" id="recipetimeInput" placeholder="Reseptin valmistusaika."> <div class="postButton"> <button class="postRecipe" id="postRecipe">Tee Lisäys!</button> </div></div>`
    const postButton = document.querySelector('#postRecipe');
    const tagModal = document.querySelector('#tags');
    const tagButton = document.querySelector('#tag');
    let selectedTags = []; // Tähän syötetään valittujen mealtyypien id:t
    const instructionDiv = document.querySelector('.instruction');

    const addTags = (tags) => { // Syötetään objekti jossa mealtype infot

        tagModal.innerHTML = "";
        tags.forEach((tag) => {
            const button = document.createElement('button');
            button.innerHTML = tag.Mealtype;
            button.classList.add('mealtypeButtons');
            if (!selectedTags.includes(tag.Mealid)) {
                tagModal.appendChild(button);
                button.addEventListener('click', () => {
                    selectedTags.push(tag.Mealid); // Laitetaan Valittuihin tageihin ainoastaan ID:t
                    tagModal.removeChild(button);

                    // TODO NÄYTÄ SELECTEDTAGS SIVULLA, MISTÄ VOI MYÖS POISTAA KO. TAGIN
                    const button2 = document.createElement('button');
                    button2.innerHTML = tag.Mealtype;
                    button2.classList.add("selectedMealTypeButtons");
                    instructionDiv.appendChild(button2);
                    button2.addEventListener('click', () => {
                        const poista = selectedTags.indexOf(tag.Mealid);
                        selectedTags.splice(poista, 1);
                        instructionDiv.removeChild(button2);
                        alert('Tagi: "' + tag.Mealtype + '" poistettiin.');
                    });

                });
            }
        });

    };


    tagButton.addEventListener('click', async (evt) => {
        evt.preventDefault()
        //TODO HAE TAGIT DYNAAMISESTI TIETOKANNASTA
        try {
            const response = await fetch(url + '/recipes/mealtypes');
            const tags2 = await response.json();
            addTags(tags2);
        } catch (e) {
            // console.log(e.message);
        }
    });

    postButton.addEventListener('click', async (evt) => {
        evt.preventDefault();
        const recipenameInput = document.querySelector('#recipenameInput').value;
        const recipeguide = document.querySelector('#recipeguide').value;
        const courseselect = document.querySelector('#courseselect').value;
        const recipetimeInput = document.querySelector('#recipetimeInput').value;
        const addForm = document.querySelector('#recipeAddimagebutton');




        const fd = new FormData(addForm);
        fd.append("name", recipenameInput);
        fd.append("guide", recipeguide);
        fd.append("course", courseselect);
        fd.append("time", recipetimeInput);
        fd.append("mealtypes", selectedTags);

        console.log("fd", fd);
        const fetchOptions = {
            method: 'POST',
            headers: {
                // Authorization: 'Bearer ' + sessionStorage.getItem('token'),
            },
            //  body: JSON.stringify(data),
            body: fd,
        };
        console.log(fetchOptions);
        const response = await fetch(url + '/recipes', fetchOptions);
        const json = await response.json();
        alert(json.message);
        //  location.href = 'frontpage.html';

    });
}

async function SignIn() {
    pageGeneration.innerHTML = `  <img id="signupImage" src="media/logos/jakrecipeslogo.png" alt="jakrecipeslogo"> <H2 class="otsikko">Kirjaudu</H2> <div class="signup"> <ul class="tiedot"> <li> <p>Email</p></li><li><input id="emailInputSignIn"></li><li> <p>Password</p></li><li><input id="passwordInputSignIn"></li></ul> </div><div id="signinNappi" class="nappi"> <button>Sign In</button> </div>`
    const signinButton = document.querySelector('#signinNappi');

    signinButton.addEventListener('click', async (evt) => {
        // console.log("asd");
        evt.preventDefault();
        const emailInputSignIn = document.querySelector('#emailInputSignIn').value;
        //const usernameInput = document.querySelector('#usernameInput').value;
        const passwordInput = document.querySelector('#passwordInputSignIn').value;
        const data = {
            username: emailInputSignIn,
            password: passwordInput
        }
        const fetchOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        };
        // console.log(data);
        const response = await fetch(url + '/auth/login', fetchOptions);
        const json = await response.json();
        // console.log('login response', json);
        if (!json.user) {
            alert(json.message);
        } else {
            // save token
            sessionStorage.setItem('token', json.token);
            sessionStorage.setItem('user', JSON.stringify(json.user));
            location.href = 'frontpage.html';
        }
    });
}
function register() {
    pageGeneration.innerHTML = ` <img id="signupImage" src="media/logos/jakrecipeslogo.svg" alt="jakrecipeslogo"> <H2 class="otsikko">Rekisteröidy</H2> <div class="signup"> <ul class="tiedot"> <li> <p>Email</p></li><li><input required type="email" id="emailInputSignUp" placeholder="(Eg. John@gmail.com)"></li><li> <p>Password</p></li><li><input pattern="(?=.*[\p{Lu}]).{8,}" required type="password" id="passwordInputSignUp" placeholder="(Atleast 8 letters & 1 capital)"></li></ul> </div><div class="nappi"> <button id="signupNappi">Sign Up</button> </div>`
    const signupButton = document.querySelector('#signupNappi');


    signupButton.addEventListener('click', async (evt) => {
        evt.preventDefault();
        const emailInputSignUp = document.querySelector('#emailInputSignUp').value;
        //const usernameInput = document.querySelector('#usernameInput').value;
        const passwordInput = document.querySelector('#passwordInputSignUp').value;

        const data = {
            email: emailInputSignUp,
            password: passwordInput
        };

        // console.log(data);

        const fetchOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        };

        const response = await fetch(url + '/users', fetchOptions);
        const json = await response.json();
        alert(json.message);
        document.querySelector('#emailInputSignUp').value = "";
        document.querySelector('#passwordInputSignUp').value = "";

        if (json.message === "User Created" || "") {
            location.href = 'signIn.html';
        }

    });
}
function profile() {
    pageGeneration.innerHTML = ` <H2 class="otsikko">Profiili</H2> <article id="profileArticle"> <div class="userPosts"> <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto at corporis, eaque enim esse iure qui rerum. Ad deleniti ex libero molestias unde? Blanditiis dolorem eius est nostrum, placeat quidem? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium assumenda dolorem doloremque, eum facere incidunt ipsum iste laudantium modi molestias numquam placeat qui quia quo ratione repudiandae tempore, velit voluptatibus.</p><br><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto at corporis, eaque enim esse iure qui rerum. Ad deleniti ex libero molestias unde? Blanditiis dolorem eius est nostrum, placeat quidem? Lorem ipsum dolor sit amet,
     consectetur adipisicing elit. Accusantium assumenda dolorem doloremque, eum facere incidunt ipsum iste laudantium modi molestias numquam placeat qui quia quo ratione repudiandae tempore, velit voluptatibus.</p></div><div class="userProfile"> <img id="profilepic" src="media/logos/jakrecipeslogo.svg" alt="jakrecipeslogo"> <p>Username</p><button id="editProfile">Edit Profile</button> </div><div id="editModal" class="modal"> <div class="modal-content"> <span class="close">&times;</span> <div class="username"> <p>Username</p><input> </div><div class="pic"> <p>Profile Picture</p><button>Upload Image</button> </div><div class="save"> <button>Save</button> <button id="delete">Delete Profile</button> </div><div id="deleteModal" class="modal"> <div class="modal-content"> <span class="closeDelete">&times;</span> <div> <p>Are you sure you want to delete your profile?</p></div><div class="deleteProfile"> <button id="noButton">No</button> <button>Yes</button> </div></div></div></div></div><script>const noButton=document.getElementById("noButton"); const editProfile=document.getElementById("editModal"); const button=document.getElementById("editProfile"); let closeModal=document.getElementsByClassName("close")[0]; let closeDelete=document.getElementsByClassName("closeDelete")[0]; const deleteProfile=document.getElementById("deleteModal"); const deleteButton=document.getElementById("delete"); button.onclick=function (){editProfile.style.display="block";}closeModal.onclick=function (){editProfile.style.display="none";}window.onclick=function (event){if (event.target==editProfile){editProfile.style.display="none";}}deleteButton.onclick=function (){deleteProfile.style.display="block";}closeDelete.onclick=function (){deleteProfile.style.display="none";}noButton.onclick=function (){deleteProfile.style.display="none";}</script> </article> `
}
function LogOut() {
    alert("Olet kirjautunut ulos")
}


SignInNavLink.addEventListener('click', async (evt) => {
    evt.preventDefault();
    clearPage();
    SignIn();
});
frontPageNavLink.addEventListener('click', async (evt) => {
    evt.preventDefault();
    clearPage();
    frontPage();
    newestPresentationData()
});
logOutNavLink.addEventListener('click', async (evt) => {
    evt.preventDefault();
    clearPage();
    LogOut()
    frontPage();
});
SignUpNavLink.addEventListener('click', async (evt) => {
    evt.preventDefault();
    clearPage();
    register();
});

// kesken
// async function checktoken() {
//     // check sessionStorage
//     if (!sessionStorage.getItem('token') || !sessionStorage.getItem('user')) {
//         location.href = 'login.html';
//         return;
//     }
//     // check if token valid
//     try {
//         const fetchOptions = {
//             headers: {
//                 Authorization: 'Bearer ' + sessionStorage.getItem('token'),
//             },
//         };
//         const response = await fetch(url + '/user/token', fetchOptions);
//         if (!response.ok) {
//             location.href = 'logout.html';
//         } else {
//             const json = await response.json();
//             sessionStorage.setItem('user', JSON.stringify(json.user));
//         }
//     } catch (e) {
//         // console.log(e.message);
//     }

// }
// main.js alkaa tästä


async function oldestPresentationData() {
    const response = await fetch(url + '/recipes/allrecipes/oldest');
    const json = await response.json();
    let loadout = "";


    for (let i = 0; i < (json.length); i++) {

        // jos kuvaa ei ole, laitetaan placeholder
        if (json[i].Imagefilepath === 'null') {
            const replaceimage = "./media/logos/jakrecipeslogo.svg";
            loadout += '<figure class="recipefigure"><img src="' + replaceimage + '"><p>' + json[i].Recipename + '</p><p>' + json[i].Recipetime + '</p><p>' + json[i].Coursetype + '</p><p>' + json[i].Mealtype + '</p> <button > Katso resepti</button ></figure >'
        } else {
            loadout += '<figure class="recipefigure"><img src="' + url + '/' + json[i].Imagefilepath + '"><p>' + json[i].Recipename + '</p><p>' + json[i].Recipetime + '</p><p>' + json[i].Coursetype + '</p><p>' + json[i].Mealtype + '</p> <button > Katso resepti</button ></figure >'
        }
        presentationdata.innerHTML = loadout;
    }
}



// main.js loppuu tähän
// frontpage.html alkaa tästä
const editFilter = document.getElementById("filterModal");
const filterButton = document.getElementById("filter");
let close = document.getElementsByClassName("close")[0]
filterButton.onclick = function () {
    editFilter.style.display = "block";
}

close.onclick = function () {
    editFilter.style.display = "none";
}
window.onclick = function (event) {
    if (event.target == editFilter) {
        editFilter.style.display = "none";
    }
}
// frontpage.html loppuu tähän

//frontpage.js alkaa tästä

const addRecipeButton = document.querySelector('#addrecipesButton');

addRecipeButton.addEventListener('click', async (evt) => {
    evt.preventDefault();
    clearPage();
    addRecipes()


});
// frontpage.js loppuu tähän

// logout.js alkaa tästä
function logOut() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    frontPage();
}

    // logout.js loppuu tähän

    // addRecipe.js alkaa tästä
    // const postButton = document.querySelector('#postRecipe');
    // const tagModal = document.querySelector('#tags');
    // const tagButton = document.querySelector('#tag');
    // let selectedTags = []; // Tähän syötetään valittujen mealtyypien id:t
    // const instructionDiv = document.querySelector('.instruction');

    // const addTags = (tags) => { // Syötetään objekti jossa mealtype infot

    //     tagModal.innerHTML = "";
    //     tags.forEach((tag) => {
    //         const button = document.createElement('button');
    //         button.innerHTML = tag.Mealtype;
    //         button.classList.add('mealtypeButtons');
    //         if (!selectedTags.includes(tag.Mealid)) {
    //             tagModal.appendChild(button);
    //             button.addEventListener('click', () => {
    //                 selectedTags.push(tag.Mealid); // Laitetaan Valittuihin tageihin ainoastaan ID:t
    //                 tagModal.removeChild(button);

    //                 // TODO NÄYTÄ SELECTEDTAGS SIVULLA, MISTÄ VOI MYÖS POISTAA KO. TAGIN
    //                 const button2 = document.createElement('button');
    //                 button2.innerHTML = tag.Mealtype;
    //                 button2.classList.add("selectedMealTypeButtons");
    //                 instructionDiv.appendChild(button2);
    //                 button2.addEventListener('click', () => {
    //                     const poista = selectedTags.indexOf(tag.Mealid);
    //                     selectedTags.splice(poista, 1);
    //                     instructionDiv.removeChild(button2);
    //                     alert('Tagi: "' + tag.Mealtype + '" poistettiin.');
    //                 });

    //             });
    //         }
    //     });

    // };


    // tagButton.addEventListener('click', async (evt) => {
    //     evt.preventDefault()
    //     //TODO HAE TAGIT DYNAAMISESTI TIETOKANNASTA
    //     try {
    //         const response = await fetch(url + '/recipes/mealtypes');
    //         const tags2 = await response.json();
    //         addTags(tags2);
    //     } catch (e) {
    //         // console.log(e.message);
    //     }
    // });

    // postButton.addEventListener('click', async (evt) => {
    //     evt.preventDefault();
    //     const recipenameInput = document.querySelector('#recipenameInput').value;
    //     const recipeguide = document.querySelector('#recipeguide').value;
    //     const courseselect = document.querySelector('#courseselect').value;
    //     const recipetimeInput = document.querySelector('#recipetimeInput').value;
    //     const addForm = document.querySelector('#recipeAddimagebutton');




    //     const fd = new FormData(addForm);
    //     fd.append("name", recipenameInput);
    //     fd.append("guide", recipeguide);
    //     fd.append("course", courseselect);
    //     fd.append("time", recipetimeInput);
    //     fd.append("mealtypes", selectedTags);

    //     console.log("fd", fd);
    //     const fetchOptions = {
    //         method: 'POST',
    //         headers: {
    //             // Authorization: 'Bearer ' + sessionStorage.getItem('token'),
    //         },
    //         //  body: JSON.stringify(data),
    //         body: fd,
    //     };
    //     console.log(fetchOptions);
    //     const response = await fetch(url + '/recipes', fetchOptions);
    //     const json = await response.json();
    //     alert(json.message);
    //     //  location.href = 'frontpage.html';

    // });
    // addRecipe.js loppuu tähän

    // signIn.js alkaa tästä
    // const signinButton = document.querySelector('#signinNappi');

    // signinButton.addEventListener('click', async (evt) => {
    //     // console.log("asd");
    //     evt.preventDefault();
    //     const emailInputSignIn = document.querySelector('#emailInputSignIn').value;
    //     //const usernameInput = document.querySelector('#usernameInput').value;
    //     const passwordInput = document.querySelector('#passwordInputSignIn').value;
    //     const data = {
    //         username: emailInputSignIn,
    //         password: passwordInput
    //     }
    //     const fetchOptions = {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(data),
    //     };
    //     // console.log(data);
    //     const response = await fetch(url + '/auth/login', fetchOptions);
    //     const json = await response.json();
    //     // console.log('login response', json);
    //     if (!json.user) {
    //         alert(json.message);
    //     } else {
    //         // save token
    //         sessionStorage.setItem('token', json.token);
    //         sessionStorage.setItem('user', JSON.stringify(json.user));
    //         location.href = 'frontpage.html';
    //     }
    // });
    // signIn.js loppuu tähän

    // registration.js alkaa tästä
    // const signupButton = document.querySelector('#signupNappi');


    // signupButton.addEventListener('click', async (evt) => {
    //     evt.preventDefault();
    //     const emailInputSignUp = document.querySelector('#emailInputSignUp').value;
    //     //const usernameInput = document.querySelector('#usernameInput').value;
    //     const passwordInput = document.querySelector('#passwordInputSignUp').value;

    //     const data = {
    //         email: emailInputSignUp,
    //         password: passwordInput
    //     };

    //     // console.log(data);

    //     const fetchOptions = {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(data),
    //     };

    //     const response = await fetch(url + '/users', fetchOptions);
    //     const json = await response.json();
    //     alert(json.message);
    //     document.querySelector('#emailInputSignUp').value = "";
    //     document.querySelector('#passwordInputSignUp').value = "";

    //     if (json.message === "User Created" || "") {
    //         location.href = 'signIn.html';
    //     }

    // });
// registration.js loppuu tähän

// recipe.js alkaa tästä

// recipe.js loppuu tähän


