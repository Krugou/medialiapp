const presentationdata = document.getElementById('presentationdata');




async function newestPresentationData() {
    const response = await fetch(url + '/recipes/allrecipes/newest');
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

newestPresentationData()
