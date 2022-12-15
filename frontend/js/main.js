

function loopThumbnails(json) {
  for (let i = 0; i < (json.length); i++) {
    if (screen.width >= 1000) {
      thumbnail_imagefilepath = 'thumbnails/' + json[i].Imagefilepath +
        '_500px.png';
      json[i]['thumbnailImagefilepath'] = thumbnail_imagefilepath;
    }
    if (screen.width <= 780) {
      thumbnail_imagefilepath = 'thumbnails/' + json[i].Imagefilepath +
        '_300px.png';
      json[i]['thumbnailImagefilepath'] = thumbnail_imagefilepath;
    }

  }

  generateRecipesFrontpage(json);
}
function fetchFavorites() {
  const fetchOptions = {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + sessionStorage.getItem('token'),
    },
  }

  fetch(url + '/recipes/favorites/' + sessionStorage.getItem('user').Userid, {method: 'GET',
    headers: {
    Authorization: 'Bearer ' + sessionStorage.getItem('token'),
    }
  })
    .then((response) => response.json())
    .then((json) => {
      createResults(json, presentationdata);

    }
    );
}

async function fetchNewestPresentationData() {
  const response = await fetch(url + '/recipeslimited/newest');
  const json = await response.json();
  loopThumbnails(json);
}

async function fetchOldestPresentationData() {
  const response = await fetch(url + '/recipeslimited/oldest');
  const json = await response.json();
  loopThumbnails(json);
}
const showFavorites = document.getElementById('radio-5');
showFavorites.addEventListener('click', () => {
  fetchFavorites();
});

function generateRecipesFrontpage(json) {
  for (let i = 0; i < (json.length); i++) {
    const figure = document.createElement('figure');
    const img = document.createElement('img');
    // jos kuvaa ei ole, laitetaan placeholder
    if (json[i].Imagefilepath === 'undefined') {
      img.src = './media/logos/jakrecipeslogo.svg';
    } else {
      img.src = url + '/' + json[i].thumbnailImagefilepath;
      //loadout += '<figure class="recipefigure"><img src="' + url + '/' + json[i].Imagefilepath + '"><p class="fontsizeforp">' + json[i].Recipename + '</p><p class="fontsizeforp">' + json[i].Recipetime + '</p><p class="fontsizeforp">' + json[i].Coursetype + '</p><p class="fontsizeforp">' + json[i].Mealtype + '</p> <button class="recipesButtonFront"id="'+json[i].Recipeid+'"> Katso resepti</button ></figure >'
    }
    img.alt = json[i].Recipename;
    const p = document.createElement('p');
    const p2 = document.createElement('p');
    const p3 = document.createElement('p');
    const p4 = document.createElement('p');
    const button = document.createElement('button');
    button.addEventListener('click', () => {
      console.log('katso resepti');
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

// const editFilter = document.getElementById('filterModal');
// const filterButton = document.getElementById('filter');
// let close = document.getElementsByClassName('close')[0];
// filterButton.onclick = function() {
//   editFilter.style.display = 'block';
// };
// close.onclick = function() {
//   editFilter.style.display = 'none';
// };
// window.onclick = function(event) {
//   if (event.target == editFilter) {
//     editFilter.style.display = 'none';
//   }
// };

fetchNewestPresentationData();
