const presentationdata = document.getElementById('presentationdata');

let loadout = ""; 
function insertPresentationData(amount) {
    for (let i = 0; i < (amount); i++) {
        loadout += '<figure class="recipefigure"><img src="media/logos/jakrecipeslogo.svg"><p>Nimi</p><p>Aika:'+i+'</p><p>Vaikeus</p><p>Arviot</p><p>Hinta</p><p>Tags</p><button>Katso resepti</button></figure>'

    }
    presentationdata.innerHTML = loadout;
   
}

// valitse korttien määrä 

insertPresentationData(99);