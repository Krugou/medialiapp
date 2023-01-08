

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

  fetch(url + '/recipes/favorites/' + JSON.parse(sessionStorage.getItem('user')).Userid, {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + sessionStorage.getItem('token'),
    }
  })
    .then((response) => response.json())
    .then((json) => {
      clearPage()
      createResults(json, presentationdata);
      ;
    }
    ).catch((error) => {
      alert('Suosikkeja ei löytynyt');
    });
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
    const p5 = document.createElement('p');
    const button = document.createElement('button');

    p.innerText = json[i].Recipename;

    p.setAttribute("id", "recipeFigureName")
    p.classList.add('cardtitle')
    figure.addEventListener('click', () => {
      location.href = 'recipe.html?id=' + json[i].Recipeid;
    });
    p2.innerText = "Aika: " + json[i].Recipetime + "min";
    p3.innerText = json[i].Coursetype;
    p4.innerText = json[i].Mealtype;
    p5.innerText = "Hinta: " + json[i].Recipeprice.toFixed(2) + "€";
    p2.classList.add('cardtext')
    p3.classList.add('cardtext')
    p4.classList.add('cardtext')
    p5.classList.add('cardtext')
    figure.appendChild(img);
    figure.appendChild(p);
    figure.appendChild(p2);
    figure.appendChild(p3);
    figure.appendChild(p4);
    figure.appendChild(p5);
    figure.classList.add('recipefigure');
    presentationdata.appendChild(figure);
  }
}
if (!sessionStorage.getItem('token') || !sessionStorage.getItem('user')) {
  const suosikitButton = document.getElementById('suosikitButton');
  suosikitButton.remove();
}
const mostlikedbetter = document.getElementById('mostliked');
mostlikedbetter.onclick = () => {
  fetch(url + `/recipeslimited/filterbylikes/`).then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw 'HTTP ERROR';
    }
  }).then((queryData) => {
    console.log("🚀 ~ file: generateresults.js:203 ~ fetch ~ queryData", queryData)
    clearPage();

    createResults(queryData, presentationdata);
    FieldElement1.innerText = '';
  }).catch((error) => {


  }
  );
}
const newest = document.getElementById('newest');
newest.onclick = () => {
  clearPage();
  fetchNewestPresentationData()

}
const haebutton = document.getElementById('haebutton');
haebutton.addEventListener('click', () => {
  const typeInputFieldElement = document.getElementById('typeInputField');
  frontPageQuery(typeInputFieldElement.value);
});
fetchNewestPresentationData();
