const presentationdata = document.getElementById('presentationdata');




async function loadDBPresentationData() {
    const response = await fetch(url+'/recipes/allrecipes');
    const json = await response.json();
    let loadout = "";

    for (let i = 0; i < (json.length); i++) {
        loadout += '<figure class="recipefigure"><img src="' + json[i].Imagefilepath + '"><p>' + json[i].Recipename + '</p><p>' + json[i].Recipetime + '</p><p>' + json[i].Coursetype + '</p><p>' + json[i].Mealtype + '</p> <button > Katso resepti</button ></figure >'
        presentationdata.innerHTML = loadout;
        console.log('<figure class="recipefigure"><img src="' + json[i].Imagefilepath + '"><p>')
    }
}

loadDBPresentationData()
