'use strict';

//Vaihetaan arvoa, jos resepti on suosikeissa.
let favorited = false;

const getQParam = (param) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
};

// Haetaan id osoitekentästä
const recipe_id = getQParam('id');

// Haetaan elementtejä
const img = document.querySelector('#recipesImage');
const recipeName = document.querySelector('#recipeName');
const instructions = document.querySelector('#instructionPara');
const recipeTime = document.querySelector('#recipesTime');
const recipeTags = document.querySelector('#recipesTags');
const postComment = document.querySelector('#postACommentButton');
const openComments = document.querySelector('#openCommentsButton');
const recipeComments = document.querySelector('#recipeCommentsId');
const favoriteIcon = document.querySelector('#favoriteHeart');
const recipeLike = document.getElementById("recipeThumbsup");
const recipeDislike = document.getElementById("recipeThumbsdown");
const likes = document.getElementById('Likes');
const editButtonDiv = document.getElementById('ediRecipeDiv');
//Tällä haetaan reseptin tiedot sivulle
const getRecipe = async (id) => {
  const fetchOptions = {
    headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
    },
  };
  const response = await fetch(url + '/recipes/' + id, fetchOptions);
  const recipe = await response.json();

  console.log(recipe);
  recipeName.innerHTML = recipe.recipes.Recipename;
  instructions.innerText = recipe.recipes.Recipeguide;
  instructions.classList.add('fontsizeforp');

  // Jos reseptille on asetettu valmistusaika, näytetään se sivulla.
  if (recipe.recipes.Recipetime) {
    const recipeTimePara = document.createElement('p');
    recipeTimePara.innerText = 'Valmistusaika: ' + recipe.recipes.Recipetime +
        ' Minuuttia';
    recipeTimePara.classList.add('fontsizeforp');
    recipeTime.appendChild(recipeTimePara);
  }

  // Jos reseptille on annettu tageja, näytettään ne sivulla.
  if (recipe.mealtypes) {
    for (let i = 0; i < recipe.mealtypes.length; i++) {
      const button = document.createElement('button');
      button.innerText = recipe.mealtypes[i].Mealtype;
      button.classList.add('postRecipe');
      recipeTags.appendChild(button);
    }
  }

  //Luodaan "course"- eli ruuan tarjoiluaika sivulle.
  const button = document.createElement('button');
  button.innerText = recipe.course.Coursetype;
  button.classList.add('postRecipe');
  recipeTags.appendChild(button);
  console.log(recipe.images[0]);
  img.src = url + '/' + recipe.images[0].Imagefilepath;
  if (recipe.images[0].Imagefilepath === 'undefined') {
    img.src = './media/logos/jakrecipeslogo.svg';

  }
  //Jos resepti on suosikeissa, vaihdetaan ikoni.
  if (recipe.favorite === true) {
    console.log('löytyy suosikeista');
    const likeHeart = document.querySelector('#likeHeart'); // Pitää hakea tässä kohtaa, muuten ei saada selectattua fontawesomin dynaamista ikonia
    likeHeart.classList.add('favorited');
    favorited = true;
  }

  // Lisätään hinta näkyviin, jos se on määritetty
  if (recipe.recipes.Recipeprice !== 0) {
    console.log('Reseptin hinta', recipe.recipes.Recipeprice.toFixed(2));
    const p = document.createElement('p');
    p.innerText = 'Kokonaishinta: ' + recipe.recipes.Recipeprice.toFixed(2) +
        '€';
    p.classList.add('fontsizeforp');
    recipeTime.appendChild(p);

  }
    //Jos resepti on jo arvosteltu, näytetään se käyttäjälle
    if (recipe.rating?.find === true){
      if (recipe.rating.value[0].Stars===1) {
        recipeLike.classList.add('liked');
      }
      if (recipe.rating.value[0].Stars===-1) {
        recipeDislike.classList.add('disliked');
      }
    }
    //Laitetaan arvostelu näkyviin, jos reseptiä on arvosteltu
    if (recipe.ratingsum.likes !== null) {
      const likeCount = recipe.ratingsum.likes
      likes.innerText = likeCount;
      if (likeCount>=0){
        likes.classList.add('positive');
      }
      else {
        likes.classList.add('negative');
      }
    }

    // Luodaan sivulle edit nappi, ensin katsotaan että käyttäjä on kirjautunut jotta ei tuu erroria
  if (sessionStorage.getItem('token') || sessionStorage.getItem('user')) {
    //Laitetaan näkyviin jos käyttäjä on omistaja
    if (JSON.parse(sessionStorage.getItem('user')).Userid === recipe.recipes.Recipemaker || JSON.parse(sessionStorage.getItem('user')).Userrole === 0) {
      const editButton = document.createElement('button');
    editButton.id = "editRecipe";
    editButton.classList.add('postRecipe');
    editButton.innerHTML = "Edit recipe";
    editButton.addEventListener('click', evt => {
      location.href = 'modifyrecipe.html?id=' + recipe_id;
    });
    editButtonDiv.appendChild(editButton);

    //Luodaaan sivulle delete nappi

    const deleteButton = document.createElement('button');
    deleteButton.id = "deleteRecipe";
    deleteButton.innerHTML = "Poista Resepti";
    deleteButton.classList.add('postRecipe');
    deleteButton.addEventListener('click', evt => {
      let confirmDelete = confirm("Haluatko poistaa reseptin?")
      if (confirmDelete) {
        deleteThisRecipe(recipe_id);
      }
    });
      editButtonDiv.appendChild(deleteButton);
    }
  }
};
const deleteThisRecipe = async (id) => {

  const fetchOptions = {
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      'Content-Type': 'application/json',
    },
  };
  const response = await fetch(url + '/recipes/'+id, fetchOptions)
  const json = await response.json();
  alert(json.message);
  if (json.message === "Recipe Deleted") {
    location.href = "frontpage.html";
  }

}
postComment.addEventListener('click', async evt => {

    let commentField = document.querySelector('#commentField').value;
    evt.preventDefault();
    console.log('jepjep');
    console.log(commentField);
    const data = {
      comment: commentField,
      recipeid: recipe_id,
    };
    const fetchOptions = {
      method: 'POST',
      headers: {
         Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(url + '/recipes/comment', fetchOptions);
    const json = await response.json();
    alert(json.message);
    document.querySelector('#commentField').value = '';
    // document.location.reload();
});
//Haetaan kommentit
const getComments = async (id) => {
  let comments;

  const fetchOptions = {
    headers: {
       Authorization: 'Bearer ' + sessionStorage.getItem('token'),
    },
  };
  const response = await fetch(url + '/recipes/comment/' + id, fetchOptions);
   comments = await response.json();

  console.log(comments);
  console.log(comments.length);
  console.log('asdawiojd');

  // Luodaan kommentit sivulle
  for (let i = 0; i < comments.length; i++) {
    const li = document.createElement('li');
    li.classList.add('recipeUserComment');
    const divParent = document.createElement('div');
    const divUsername = document.createElement('div');
    const divContent = document.createElement('div');
    const divStats = document.createElement('div');


    divUsername.classList.add('commentUsername');
    divContent.classList.add('commentContent');
    divStats.classList.add('commentStats');

    const img = document.createElement('img');
    img.src = 'media/logos/jakrecipeslogo.svg';
    img.alt = 'Käyttäjän profiilikuva';

    divUsername.appendChild(img);

    const a = document.createElement('a');
    a.href = 'profile.html'; // + id
    a.innerText = comments[i].Username;

    divUsername.appendChild(a);

    const p = document.createElement('p');
    p.innerHTML = comments[i].Commenttext;
    p.classList.add('fontsizeforp');

    divContent.appendChild(p);

    // Luodaan like/dislike ikonit
    const spanUp = document.createElement('span');
    const spanDown = document.createElement('span');
    spanUp.classList.add('recipeCommentsThumbsUp');
    spanDown.classList.add('recipeCommentsThumbsDown');

    spanUp.innerHTML += '<svg class="svg-inline--fa fa-thumbs-up" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="thumbs-up" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 25.3-19.5 46-44.3 47.9c7.7 8.5 12.3 19.8 12.3 32.1c0 23.4-16.8 42.9-38.9 47.1c4.4 7.2 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z"></path></svg>';
    spanDown.innerHTML += '<svg class="svg-inline--fa fa-thumbs-down" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="thumbs-down" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M313.4 479.1c26-5.2 42.9-30.5 37.7-56.5l-2.3-11.4c-5.3-26.7-15.1-52.1-28.8-75.2H464c26.5 0 48-21.5 48-48c0-25.3-19.5-46-44.3-47.9c7.7-8.5 12.3-19.8 12.3-32.1c0-23.4-16.8-42.9-38.9-47.1c4.4-7.3 6.9-15.8 6.9-24.9c0-21.3-13.9-39.4-33.1-45.6c.7-3.3 1.1-6.8 1.1-10.4c0-26.5-21.5-48-48-48H294.5c-19 0-37.5 5.6-53.3 16.1L202.7 73.8C176 91.6 160 121.6 160 153.7V192v48 24.9c0 29.2 13.3 56.7 36 75l7.4 5.9c26.5 21.2 44.6 51 51.2 84.2l2.3 11.4c5.2 26 30.5 42.9 56.5 37.7zM32 320H96c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32H32C14.3 32 0 46.3 0 64V288c0 17.7 14.3 32 32 32z"></path></svg>';


    // Jos käyttäjä on tykännyt kommentista ennen, vaihetaan sen ikonin väri
    if (comments[i].rating?.find === true){
      if (comments[i].rating.value[0].Direction===1) {
        console.log("ON TYKÄTTY")
        spanUp.firstChild.classList.add('liked');
      }
      if (comments[i].rating.value[0].Direction===-1) {
        spanDown.firstChild.classList.add('disliked');
      }
    }

    // Lisätään like/dislike ikoneille eventlistener, joka kutsuu kommentti tietojen päivitystä
    spanUp.addEventListener('click', evt => {
      console.log("liked")
      updateCommentRating("like", comments[i].Commentid)
      console.log("hahaha")
      spanDown.firstChild.classList.remove('disliked');
      spanUp.firstChild.classList.add('liked');
    });
    spanDown.addEventListener('click', evt => {
      console.log("disliked")
      updateCommentRating("dislike", comments[i].Commentid)
      spanUp.firstChild.classList.remove('liked');
      spanDown.firstChild.classList.add('disliked');
    });


    const pLikes = document.createElement('p');

    // Jos kommenttia on valmiiksi arvostelut, vaihdetaan like/dislike ikoneiden väri
    pLikes.innerText = comments[i].Commentrating;
    if (comments[i].Commentrating>0){
      pLikes.classList.add('positive');
    } else {
      pLikes.classList.add('negative');
    }

    divStats.appendChild(spanUp);
    divStats.appendChild(spanDown);
    divStats.appendChild(pLikes);

    divContent.appendChild(divStats);
    divParent.appendChild(divUsername);
    divParent.appendChild(divContent);
    li.appendChild(divParent);

    recipeComments.appendChild(li);

  }
  // Päivitetään kommenttien liket/disliket
  const updateCommentRating = async (rating, id) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      },
    };
    const response = await fetch(url + '/recipes/comment/'+rating+'/' + id, fetchOptions);


    if (response.ok && rating==="like"){
      recipeDislike.classList.remove('disliked')
      recipeLike.classList.add('liked')
    }
    if (response.ok && rating==="dislike"){
      recipeLike.classList.remove('liked')
      recipeDislike.classList.add('disliked')
    }
    console.log("response");


  }

  //const

};

openComments.addEventListener('click', async evt => {
  //  evt.preventDefault();
  console.log('asd');
  await getComments(recipe_id);
});

favoriteIcon.addEventListener('click', async evt => {
  evt.preventDefault();
  await addOrRemoveFavorite(recipe_id);
});

//Lisätään tai poistetaan suosikki riippuen favorited arvosta
const addOrRemoveFavorite = async (id) => {
  const likeHeart = document.querySelector('#likeHeart'); // Pitää hakea tässä kohtaa, muuten ei saada selectattua fontawesomin dynaamista ikonia
  if (favorited === false) {
    const fetchOptions = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      },
    };
    console.log(fetchOptions);
    const response = await fetch(url + '/recipes/addfavorite/' + id,
        fetchOptions);
    if (response.ok) {
      likeHeart.classList.add('favorited');
      favorited = true;
      return;
    }
  }
   if (favorited === true) {
    let confirmFav = confirm('Poistetaanko Suosikeista?');   //Varmistetaan käyttäjältä haluaako hän poistaa suosikin, ennen poistamista
     if (confirmFav === true) {
      const fetchOptions = {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        },
      };
      const response = await fetch(url + '/recipes/removefavorite/' + id,
          fetchOptions);
      if (response.ok) {
        likeHeart.classList.remove('favorited');
        favorited = false;
      }
    }
  }

};
recipeLike.addEventListener('click', async evt => {
  console.log("asd");
 await updateRecipeRating("like", recipe_id);

});
recipeDislike.addEventListener('click', async evt => {

  await updateRecipeRating("dislike", recipe_id);

});

// Arvostellaan resepti
const updateRecipeRating = async (rating, id) => {
  const fetchOptions = {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + sessionStorage.getItem('token'),
    },
  };
  const response = await fetch(url + '/recipes/'+rating+'/' + id, fetchOptions); // Haetaan reitti arvostelun mukaan ja id:llä
  if (response.ok && rating==="like"){ // Vaihdetaan värejä ikoneille
    recipeDislike.classList.remove('disliked')
    recipeLike.classList.add('liked')
  }
  if (response.ok && rating==="dislike"){ // Vaihdetaan värejä ikoneille
    recipeLike.classList.remove('liked')
    recipeDislike.classList.add('disliked')
  }
  console.log("response");
  
}

getRecipe(recipe_id);



/*
const editRecipe = document.getElementById('editRecipeModal');

const closeModal = document.getElementsByClassName('closeEditRecipe')[0];

const editButton = document.getElementById("editRecipe");

const tags = document.getElementById("tag");




editButton.onclick = function () {

  editRecipe.style.display = 'block';
};

closeModal.onclick = function () {
  editRecipe.style.display = 'none';
};

window.onclick = function (event) {
  if (event.target == editRecipe) {
    location.href = 'modifyrecipe.html?id=' + json[i].Recipeid;
    editRecipe.style.display = 'none';
  }
};
*/
