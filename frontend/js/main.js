const presentationdata = document.getElementById('presentationdata');

let loadout = ""; 
function insertPresentationData(amount) {
    for (let i = 0; i < (amount); i++) {
        loadout += '<figure class="recipefigure"><img src="media/logos/jakrecipeslogo.svg"><p>Nimi</p><p>Aika:'+i+'</p><p>Vaikeus</p><p>Arviot</p><p>Hinta</p><p>Tags</p><button>Katso resepti</button></figure>'

    }
    presentationdata.innerHTML = loadout;
   
}
// esimerkki ei toimi
function loadDBPresentationData() {
    const response = await fetch(url + '/recipes', fetchOptions);
    const json = await response.json();
    for (let i = 0; i < (json.length); i++) {
        loadout += '<figure class="recipefigure"><img src="' + json.img[i] + '"><p>' + json.name[i] + '</p><p>' + json.time[i] + '</p><p>' + json.difficulty[i] + '</p><p>' + json.rating[i] + '</p><p>' + json.price[i] + '</p><p>' + json.tags[i]  

    }
}

// valitse korttien määrä 

insertPresentationData(6);