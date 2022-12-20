const pageGeneration = document.getElementById('pageGeneration');
const SignInNavLink = document.getElementById('signIn');
const SignUpNavLink = document.getElementById('signUp');
const logOutNavLink = document.getElementById('logOut');
const frontPageNavLink = document.getElementById('frontpage');
const profileNavLink = document.getElementById('profile');
const RecipeNavLink = document.getElementById('recipes');
const contactUsNavLink = document.getElementById('contact');
const supportSiteNavLink = document.getElementById('supportSite');
const aboutUsNavLink = document.getElementById('aboutUs');

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

async function newestPresentationData() {
  const response = await fetch(url + '/recipes/newest');
  const json = await response.json();

  createRecipes(json);

}

function createRecipes(json) {
  for (let i = 0; i < (json.length); i++) {

    const figure = document.createElement('figure');
    const img = document.createElement('img');

    // jos kuvaa ei ole, laitetaan placeholder
    if (json[i].Imagefilepath === 'null') {
      img.src = './media/logos/jakrecipeslogo.svg';

    } else {
      img.src = url + '/' + json[i].Imagefilepath;
      //loadout += '<figure class="recipefigure"><img src="' + url + '/' + json[i].Imagefilepath + '"><p class="fontsizeforp">' + json[i].Recipename + '</p><p class="fontsizeforp">' + json[i].Recipetime + '</p><p class="fontsizeforp">' + json[i].Coursetype + '</p><p class="fontsizeforp">' + json[i].Mealtype + '</p> <button class="recipesButtonFront"id="'+json[i].Recipeid+'"> Katso resepti</button ></figure >'
    }
    img.alt = 'Reseptin kuva';
    const p = document.createElement('p');
    const p2 = document.createElement('p');
    const p3 = document.createElement('p');
    const p4 = document.createElement('p');
    const button = document.createElement('button');
    button.addEventListener('click', () => {
      console.log('täälä');
      location.href = 'recipe.html?id=' + json[i].Recipeid;
    });
    p.innerText = json[i].Recipename;
    p2.innerText = json[i].Recipetime;
    p3.innerText = json[i].Coursetype;
    p4.innerText = json[i].Mealtype;
    button.innerText = 'Katso resepti';
    figure.appendChild(img);
    figure.appendChild(p);
    figure.appendChild(p2);
    figure.appendChild(p3);
    figure.appendChild(p4);
    figure.appendChild(button);
    figure.classList.add('recipefigure');
    presentationdata.appendChild(figure);
  }
}

function removeChildren(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function frontPage() {
  pageGeneration.innerHTML = ` <section id="frontUp" class="frontUp"> <div class="recipeSearch"> <input type="text" id="typeInputField" aria-label="Reseptien haku" placeholder="Hae Resepti" class="recipeSearchInput "> <button id="filter" class="filterStyle marpad1rem">Filter</button><button  id="hae" class="filterStyle marpad1rem">Hae</button></div> <div id="filterModal" class="modal"> <div class="modal-content"> <span class="close">&times;</span> <div class="modaladd"> <h3>Add Filters</h3> <div class="filters"> </div><div class="filtersave"> </div></div></div></div><div class="addRecipes"> <button href="addRecipe.html" id="addrecipesButton" >Tee resepti</a></button> </div></section> <h2 id="frontPageHeader" class="otsikko"> Uusimmat Reseptit</h2> <hr> <div class="reseptit" id="presentationdata"> </div>`;
}

function clearPage() {
  pageGeneration.innerHTML = '';
}

async function oldestPresentationData() {
  const response = await fetch(url + '/recipes/oldest');
  const json = await response.json();
  let loadout = '';

  for (let i = 0; i < (json.length); i++) {

    // jos kuvaa ei ole, laitetaan placeholder
    if (json[0].Imagefilepath === 'null') {
      const replaceimage = './media/logos/jakrecipeslogo.svg';
      loadout += '<figure class="recipefigure"><img src="' + replaceimage +
        '"><p class="fontsizeforp">' + json[0].Recipename +
        '</p><p class="fontsizeforp">' + json[0].Recipetime +
        '</p><p class="fontsizeforp">' + json[0].Coursetype +
        '</p><p class="fontsizeforp">' + json[0].Mealtype +
        '</p> <button > Katso resepti</button ></figure >';
    } else {
      loadout += '<figure class="recipefigure"><img src="' + url + '/' +
        json[0].Imagefilepath + '"><p class="fontsizeforp">' +
        json[0].Recipename + '</p><p class="fontsizeforp">' +
        json[0].Recipetime + '</p><p class="fontsizeforp">' +
        json[0].Coursetype + '</p><p class="fontsizeforp">' +
        json[0].Mealtype + '</p> <button > Katso resepti</button ></figure >';
    }
    presentationdata.innerHTML = loadout;
  }
}

// nav polut ja eventlistenerit
contactUsNavLink.addEventListener('click', async (evt) => {
  evt.preventDefault();
  clearPage();
  contactUs();
});
aboutUsNavLink.addEventListener('click', async (evt) => {
  evt.preventDefault();
  clearPage();
  aboutUs();
});
SignInNavLink.addEventListener('click', async (evt) => {
  evt.preventDefault();
  clearPage();
  SignIn();
});
frontPageNavLink.addEventListener('click', async (evt) => {
  evt.preventDefault();
  clearPage();
  frontPage();
  newestPresentationData();
});
logOutNavLink.addEventListener('click', async (evt) => {
  evt.preventDefault();
  clearPage();
  LogOut();
  frontPage();
});
SignUpNavLink.addEventListener('click', async (evt) => {
  evt.preventDefault();
  clearPage();
  register();
});
profileNavLink.addEventListener('click', async (evt) => {
  evt.preventDefault();
  clearPage();
  profile();
});
RecipeNavLink.addEventListener('click', async (evt) => {
  evt.preventDefault();
  clearPage();
  recipePage();
});

function openFunction() {
  document.getElementById('comments').style.display = 'unset';
  document.getElementById('openCommentsButton').remove();
  const hide = document.createElement('button');
  hide.setAttribute('id', 'hideCommentsButton');
  hide.innerText = 'Hide Comments';
  document.getElementById('openComments').append(hide);

  document.getElementById('hideCommentsButton').
    addEventListener('click', function () {
      document.getElementById('comments').style.display = 'none';
      document.getElementById('hideCommentsButton').remove();
      const show = document.createElement('button');
      show.setAttribute('id', 'openCommentsButton');
      show.setAttribute('onclick', 'openFunction()');
      show.innerText = 'Show Comments';
      document.getElementById('openComments').append(show);
    });
}

// const editFilter = document.getElementById("filterModal");

// const filterButton = document.getElementById("filter");
// let close = document.getElementsByClassName("close")[0]
// filterButton.onclick = function () {
//     editFilter.style.display = "block";
// }

// close.onclick = function () {
//     editFilter.style.display = "none";
// }
// window.onclick = function (event) {
//     if (event.target == editFilter) {
//         editFilter.style.display = "none";
//     }
// }

async function addRecipes() {

  pageGeneration.innerHTML = `<h2 class="otsikko">Tee Uusi Resepti</h2> <div class="addRecipe_detail"> <div class="recipename"> <input id="recipenameInput" placeholder="Reseptin nimi 	&#40pakollinen&#41."> <input type="number" id="recipetimeInput" placeholder="Reseptin valmistusaika."> <button id="tag">Lisää tagi</button> <select title="ruoka" name="course" id="courseselect"> <option value="1">Aamiainen</option> <option value="2">Lounas</option> <option value="3">Päivällinen</option> <option value="4">Illallinen</option> </select> </div><div id="editModal" class="modal"> <div class="modal-content"> <span class="close">&times;</span> <div class="modaladd"> <h3>Lisää tageja</h3> <div class="tags" id="tags"> </div></div></div></div><form id="recipeAddimagebutton" class="imagebutton" enctype="multipart/form-data"> <input type="file" multiple="multiple" name="recipe" accept="image/*" 
     id="file"> </form> </div></div><div class="recipe_desc"> <div class="instruction"> <form> <textarea id="recipeguide" placeholder="Reseptin ohje &#40pakollinen&#41."></textarea> </form> </div> <div class="postButton"> <button class="postRecipe" id="postRecipe">Tee Lisäys!</button> </div></div>`;
  const postButton = document.querySelector('#postRecipe');
  const tagModal = document.querySelector('#tags');
  const tagButton = document.querySelector('#tag');
  let selectedTags = []; // Tähän syötetään valittujen mealtyypien id:t
  const instructionDiv = document.querySelector('.instruction');

  const addTags = (tags) => { // Syötetään objekti jossa mealtype infot

    tagModal.innerHTML = '';
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
          button2.classList.add('selectedMealTypeButtons');
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
    evt.preventDefault();
    //TODO HAE TAGIT DYNAAMISESTI TIETOKANNASTA
    try {
      const response = await fetch(url + '/recipes/mealtypes');
      const tags2 = await response.json();
      addTags(tags2);
    } catch (e) {
      // console.log(e.message);
    }
  });

}

postButton.addEventListener('click', async (evt) => {
  evt.preventDefault();
  const recipenameInput = document.querySelector('#recipenameInput').value;
  const recipeguide = document.querySelector('#recipeguide').value;
  const courseselect = document.querySelector('#courseselect').value;
  const recipetimeInput = document.querySelector('#recipetimeInput').value;
  const addForm = document.querySelector('#recipeAddimagebutton');
  const fd = new FormData(addForm);
  fd.append('name', recipenameInput);
  fd.append('guide', recipeguide);
  fd.append('course', courseselect);
  fd.append('time', recipetimeInput);
  fd.append('mealtypes', selectedTags);

  console.log('fd', fd);
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
  //  location.href = 'index.html';

});

async function SignIn() {
  pageGeneration.innerHTML = `  <img id="signupImage" src="media/logos/jakrecipeslogo.png" alt="jakrecipeslogo"> <H2 class="otsikko">Kirjaudu</H2> <div class="signup"> <ul class="tiedot"> <li> <p class="fontsizeforp">Email</p></li><li><input id="emailInputSignIn"></li><li> <p class="fontsizeforp">Password</p></li><li><input id="passwordInputSignIn"></li></ul> </div><div id="signinNappi" class="nappi"> <button>Sign In</button> </div>`;
  const signinButton = document.querySelector('#signinNappi');

  signinButton.addEventListener('click', async (evt) => {
    // console.log("asd");
    evt.preventDefault();
    const emailInputSignIn = document.querySelector('#emailInputSignIn').value;
    //const usernameInput = document.querySelector('#usernameInput').value;
    const passwordInput = document.querySelector('#passwordInputSignIn').value;
    const data = {
      username: emailInputSignIn,
      password: passwordInput,
    };
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
      location.href = 'index.html';
    }
  });
}

function register() {
  pageGeneration.innerHTML = ` <img id="signupImage" src="media/logos/jakrecipeslogo.svg" alt="jakrecipeslogo"> <H2 class="otsikko">Rekisteröidy</H2> <div class="signup"> <ul class="tiedot"> <li> <p class="fontsizeforp">Email</p></li><li><input required type="email" id="emailInputSignUp" placeholder="(Eg. John@gmail.com)"></li><li> <p class="fontsizeforp">Password</p></li><li><input pattern="(?=.*[\p{Lu}]).{8,}" required type="password" id="passwordInputSignUp" placeholder="(Atleast 8 letters & 1 capital)"></li></ul> </div><div class="nappi"> <button id="signupNappi">Sign Up</button> </div>`;
  const signupButton = document.querySelector('#signupNappi');

  signupButton.addEventListener('click', async (evt) => {
    evt.preventDefault();
    const emailInputSignUp = document.querySelector('#emailInputSignUp').value;
    //const usernameInput = document.querySelector('#usernameInput').value;
    const passwordInput = document.querySelector('#passwordInputSignUp').value;

    const data = {
      email: emailInputSignUp,
      password: passwordInput,
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
    document.querySelector('#emailInputSignUp').value = '';
    document.querySelector('#passwordInputSignUp').value = '';

    if (json.message === 'User Created' || '') {
      location.href = 'signIn.html';
    }

  });
}

function profile() {
  pageGeneration.innerHTML = ` <H2 class="otsikko">Profiili</H2> <article id="profileArticle"> <section> <H2 id="userPostTitle">User Posts</H2> <div class="userPosts"> <figure>
     <img src="media/logos/jakrecipeslogo.svg"> <p class="fontsizeforp">Recipe Name</p> <button>Katso</button> </figure> <figure> <img src="media/logos/jakrecipeslogo.svg"> <p class="fontsizeforp">Recipe Name</p> <button>Katso</button> </figure> <figure> <img src="media/logos/jakrecipeslogo.svg"> <p class="fontsizeforp">Recipe Name</p> <button>Katso</button></figure> <figure> <img src="media/logos/jakrecipeslogo.svg"> <p class="fontsizeforp">Recipe Name</p> <button>Katso</button> </figure> </div> </section>  <div class="userProfile"> <img id="profilepic" src="media/logos/jakrecipeslogo.svg" alt="jakrecipeslogo"> <p class="fontsizeforp">Username</p><button id="editProfile">Edit Profile</button> </div><div id="editModal" class="modal"> <div class="modal-content"> <span class="close">&times;</span> <div class="username"> <p class="fontsizeforp">Username</p><input> </div><div class="pic"> <p class="fontsizeforp">Profile Picture</p><button>Upload Image</button> </div><div class="save"> <button>Save</button> <button id="delete">Delete Profile</button> </div><div id="deleteModal" class="modal"> <div class="modal-content"> <span class="closeDelete">&times;</span> <div> <p class="fontsizeforp">Are you sure you want to delete your profile?</p></div><div class="deleteProfile"> <button id="noButton">No</button> <button>Yes</button> </div></div></div></div></div><script>const noButton=document.getElementById("noButton"); const editProfile=document.getElementById("editModal"); const button=document.getElementById("editProfile"); let closeModal=document.getElementsByClassName("close")[0]; let closeDelete=document.getElementsByClassName("closeDelete")[0]; const deleteProfile=document.getElementById("deleteModal"); const deleteButton=document.getElementById("delete"); button.onclick=function (){editProfile.style.display="block";}closeModal.onclick=function (){editProfile.style.display="none";}window.onclick=function (event){if (event.target==editProfile){editProfile.style.display="none";}}deleteButton.onclick=function (){deleteProfile.style.display="block";}closeDelete.onclick=function (){deleteProfile.style.display="none";}noButton.onclick=function (){deleteProfile.style.display="none";}</script> </article> `;
}

function LogOut() {
  alert('Olet kirjautunut ulos');
}

function recipePage() {
  pageGeneration.innerHTML = ` <h2 id="recipeName">Recipe Name</h2> <div class="recipePic"> <img src="media/logos/jakrecipeslogo.svg" alt="jakrecipeslogo"> </div><div id="Stats" class="recipeStats"> <p class="fontsizeforp">50 Likes</p><div class="recipeTags"> <button class="postRecipe">Kasvisruoka</button> <button class="postRecipe" >Gluteiiniton</button> <button class="postRecipe" >Laktoositon</button> </div><div class="recipeTime"> <p class="fontsizeforp">Cooking time: 60 Min</p>
    </div><div class="recipeTags"> <button class="postRecipe">Mealtype</button> </div><i id="likeHeart" class="fa-solid fa-heart" ></i> </div><div class="recipe_desc"> <div class="recipeInstruction"> <h2>Instructions</h2> <p class="fontsizeforp">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus accusantium atque consequatur, corporis culpa cupiditate, dolor, error eum minus natus nihil nulla officia porro quam quasi qui sit? Consectetur odio perferendis porro sed! Ipsa non, tempora? Ab consequuntur culpa, debitis eius error exercitationem impedit natus nemo possimus similique sunt veniam. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus accusantium atque consequatur, corporis culpa cupiditate, dolor, error eum minus natus nihil nulla officia porro quam quasi qui sit? Consectetur odio perferendis porro sed! Ipsa non, tempora? Ab consequuntur culpa, debitis eius error exercitationem
     impedit natus nemo possimus similique sunt veniam. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus accusantium atque consequatur, corporis culpa cupiditate, dolor, error eum minus natus nihil nulla officia porro quam quasi qui sit? Consectetur odio perferendis porro sed! Ipsa non, tempora? Ab consequuntur culpa, debitis eius error exercitationem impedit natus nemo possimus similique sunt veniam. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus accusantium atque consequatur, corporis
     culpa cupiditate, dolor, error eum minus natus nihil nulla officia porro quam quasi qui sit? Consectetur odio perferendis porro sed! Ipsa non, tempora? Ab consequuntur culpa, debitis eius error exercitationem impedit natus nemo possimus similique sunt veniam. </p></div><div id="openComments"> <button onclick="openFunction()" id="openCommentsButton">Show Comments</button> </div><section id="comments"> <div class="addComment"> <form> <h2>Add Comment</h2> <textarea> </textarea> </form> <div class="postCommentButton"> <button>Post Comment</button> </div></div><ul class="recipeComments"> <li class="recipeUserComment"> <div> <div class="commentPicture"> <img src="media/logos/jakrecipeslogo.svg"> </div><div class="commentUsername"> <a href="profile.html">Username</a> </div><div class="commentContent"> <p class="fontsizeforp">Tämä on kommentti tähän reseptiin. Tämä on kommentti tähän reseptiin. Tämä on kommentti tähän reseptiin. Tämä on kommentti tähän reseptiin.</p><i class="fa-solid fa-thumbs-up"></i> <i class="fa-solid fa-thumbs-down"></i> </div></div></li><li class="recipeUserComment"> <div> <div class="commentPicture"> <img src="media/logos/jakrecipeslogo.svg"> </div><div class="commentUsername"> <a href="profile.html">Username</a> </div><div class="commentContent"> <p class="fontsizeforp">Tämä on kommentti tähän reseptiin. Tämä on kommentti tähän reseptiin. Tämä on kommentti tähän reseptiin. Tämä on kommentti tähän reseptiin.</p><i class="fa-solid fa-thumbs-up"></i> <i class="fa-solid fa-thumbs-down"></i> </div></div></li><li class="recipeUserComment"> <div> <div class="commentPicture"> <img src="media/logos/jakrecipeslogo.svg"> </div><div class="commentUsername"> <a href="profile.html">Username</a> </div><div class="commentContent"> <p class="fontsizeforp">Tämä on kommentti tähän reseptiin. Tämä on kommentti tähän reseptiin. Tämä on kommentti tähän reseptiin. Tämä on kommentti tähän reseptiin.</p><i class="fa-solid fa-thumbs-up"></i> <i class="fa-solid fa-thumbs-down"></i> </div></div></li></ul> </section> </div>
    `;
}

function contactUs() {
  const div = document.createElement('div');

  div.classList.add('contactUs');

  div.innerHTML = `<form class="contactUs" id="palaute2" action=".php"> <fieldset><legend>Palautelomake</legend><label for="fname">Etunimi:</label><br> <input type="text" id="fname" name="fname" placeholder="Matti"><br>  <label for="lname">Sukunimi:</label><br>  <input type="text" id="lname" name="lname" placeholder="Meikäläinen"><br> <label for="email">Sähköposti:</label><br><input type="email" id="email" name="email" placeholder="mattimeikalainen@hel.fi"> <br><br><label for="feedback">Palaute:</label><br><textarea id="feedback" placeholder="Palautteesi"></textarea><br><input type="submit" value="Submit"><input type="reset"></fieldset></form>`;
  pageGeneration.appendChild(div);
}

function aboutUs() {
  const div = document.createElement('div');

  div.classList.add('aboutUs');
  const h2 = document.createElement('h2');
  h2.classList.add('aboutTitle');
  h2.innerHTML = 'about Us';
  div.appendChild(h2);

  const p = document.createElement('p');
  p.classList.add('aboutText');
  p.innerHTML = `  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi harum voluptate magnam omnis? Ad voluptatibus dolores labore error reiciendis, sequi sunt explicabo saepe!
     Eos eum nemo id cumque aperiam at! Et consequatur cumque doloribus obcaecati placeat illum eos, animi ut repudiandae veritatis perspiciatis blanditiis accusantium quidem, rerum esse, corrupti aspernatur eligendi rem odit.Magni cumque totam veniam saepe dolores est.       Eaque natus ducimus nemo nostrum impedit iure accusamus vero pariatur reiciendis labore, assumenda harum, molestiae eius voluptatem eligendi rerum doloribus sapiente totam.Aliquid sequi facilis rem quibusdam tenetur, architecto asperiores.Repudiandae accusamus officia optio, sequi ex repellat corrupti dolorem aliquid tenetur nesciunt magnam ab voluptas similique voluptatibus ipsam soluta nulla, quae id.Aut adipisci blanditiis ex molestias ab culpa non.Reprehenderit dolores similique sequi consectetur possimus, culpa voluptatibus eius quae ipsa sed dolor iure quibusdam, omnis cumque aliquid excepturi in placeat quo, ab repellendus necessitatibus praesentium! Optio odio nulla architecto.`;
  div.appendChild(p);
  pageGeneration.appendChild(div);
}

'use strict';

'use strict';

function frontPageQuery(query) {
  try {
    const res = await fetch(url + `/recipes/filterrecipes/` + query);
    if (!res.ok) throw new Error(console.log(errormessage));
    const queryData = await res.json();

    createRecipesMatch(queryData);

  } catch (error) {
    console.log(error);
  }
}

const addRecipeButton = document.querySelector('#addrecipesButton');

addRecipeButton.addEventListener('click', async (evt) => {
  evt.preventDefault();
  clearPage();
  addRecipes();

});

function createRecipesMatch(json) {
  for (let i = 0; i < (json.length); i++) {
    const figure = document.createElement('figure');
    const img = document.createElement('img');

    // jos kuvaa ei ole, laitetaan placeholder
    if (json.recipesTable[i].Images.Imagefilepath === 'null') {
      img.src = './media/logos/jakrecipeslogo.svg';

    } else {
      img.src = url + '/' + json.recipesTable[i].Images.Imagefilepath;
      // loadout += '<figure class="recipefigure"><img src="' + url + '/' + json.recipesTable[i].Images.Imagefilepath + '"><p class="fontsizeforp">' + json.recipesTable[i].Recipename + '</p><p class="fontsizeforp">' + json.recipesTable[i].Recipetime + '</p><p class="fontsizeforp">' + json.recipesTable[i].Coursetype + '</p><p class="fontsizeforp">' + json.recipesTable[i].Mealtypes.Mealtype + '</p> <button class="recipesButtonFront"id="' + json.recipesTable[i].Recipeid + '"> Katso resepti</button ></figure >'
    }
    img.alt = 'Reseptin kuva';
    const p = document.createElement('p');
    const p2 = document.createElement('p');
    const p3 = document.createElement('p');
    const p4 = document.createElement('p');
    const button = document.createElement('button');
    button.addEventListener('click', () => {
      console.log('täälä' + json.recipesTable[i].Recipeid);
      location.href = 'recipe.html?id=' + json.recipesTable[i].Recipeid;
    });
    p.innerText = json.recipesTable[i].Recipename;
    p2.innerText = json.recipesTable[i].Recipetime;
    p3.innerText = json.recipesTable[i].Coursetype;
    p4.innerText = json.recipesTable[i].Mealtypes.Mealtype;
    button.innerText = 'Katso resepti';
    figure.appendChild(img);
    figure.appendChild(p);
    figure.appendChild(p2);
    figure.appendChild(p3);
    figure.appendChild(p4);
    figure.appendChild(button);
    figure.classList.add('recipefigure');
    presentationdata.appendChild(figure);
  }

}

function logOut() {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('user');
  frontPage();
}

const filterButtonFront = document.getElementById('hae');
filterButtonFront.addEventListener('click', async (evt) => {
  evt.preventDefault();
  frontPageQuery(typeInputFieldElement.value);

});