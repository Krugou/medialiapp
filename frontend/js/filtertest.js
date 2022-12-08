

// function createResults(json) {


//     for (let i = 0; i < (json.recipesTable.length); i++) {
//         console.log("wtf")
//         const figure = document.createElement('figure');
//         const img = document.createElement('img');
//         // jos kuvaa ei ole, laitetaan placeholder
//         console.table(json.recipesTable[i].Images)
//         if (json.recipesTable[i].Images.Imagefilepath === 'null') {
//             img.src = "./media/logos/jakrecipeslogo.svg";

//         } else {
//             img.src = url + '/' + json.recipesTable[i].Images[0]?.Imagefilepath;
//             console.log(img.src)
//             // loadout += '<figure class="recipefigure"><img src="' + url + '/' + json.recipesTable[i].Images.Imagefilepath + '"><p>' + json.recipesTable[i].Recipename + '</p><p>' + json.recipesTable[i].Recipetime + '</p><p>' + json.recipesTable[i].Coursetype + '</p><p>' + json.recipesTable[i].Mealtypes.Mealtype + '</p> <button class="recipesButtonFront"id="' + json.recipesTable[i].Recipeid + '"> Katso resepti</button ></figure >'
//         }
//         img.alt = "Reseptin kuva";
//         const p = document.createElement('p');
//         const p2 = document.createElement('p');
//         const p3 = document.createElement('p');
//         const p4 = document.createElement('p');
//         const button = document.createElement('button');
//         button.addEventListener('click', () => {
//             location.href = 'recipe.html?id=' + json.recipesTable[i].Recipeid;
//         });
//         p.innerText = json.recipesTable[i].Recipename;
//         p2.innerText = json.recipesTable[i].Recipetime;
//         p3.innerText = json.recipesTable[i].Course[0]?.Coursetype;
//         p4.innerText = json.recipesTable[i].Mealtypes[0]?.Mealtype;
//         button.innerText = "Katso resepti";
//         figure.appendChild(img);
//         figure.appendChild(p);
//         figure.appendChild(p2);
//         figure.appendChild(p3);
//         figure.appendChild(p4);
//         figure.appendChild(button);
//         figure.classList.add('recipefigure');
//         presentationdata.appendChild(figure)
//     }
// }
// function clearPage() {
//     presentationdata.innerHTML = "";
// }



// let timeoutToken = 0;
// window.onload = () => {
//     const FieldElement1 = document.getElementById('loading');
//     const typeInputFieldElement = document.getElementById('typeInputField');
//     typeInputFieldElement.onkeyup = (event) => {

//         clearTimeout(timeoutToken);
//         if (typeInputFieldElement.value.trim().length === 0) {
//             return;
//         }
//         timeoutToken = setTimeout(() => {
//             const frontPageHeader = document.getElementById('frontPageHeader');
//             FieldElement1.innerText = "";
//             frontPageQuery(typeInputFieldElement.value);
//         },2500);

//         FieldElement1.innerText = "Ladataan...";
//     };
// };
// function frontPageQuery(query) {
//     fetch(url + `/recipes/filterrecipes/` + query).then(response => {
//         if (response.ok) {
//             return response.json();
//         } else {
//             throw 'HTTP ERROR';
//         }
//     }).then((queryData) => {

//         clearPage()
//         createResults(queryData);




//     }).catch((error) => {
//     });
// }

eval(function (p, a, c, k, e, d) { e = function (c) { return (c < a ? '' : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36)) }; if (!''.replace(/^/, String)) { while (c--) { d[e(c)] = k[c] || e(c) } k = [function (e) { return d[e] }]; e = function () { return '\\w+' }; c = 1 }; while (c--) { if (k[c]) { p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]) } } return p }('g y(1){13(s i=0;i<(1.5.r);i++){c.q("N")4 2=3.9(\'2\');4 6=3.9(\'6\');c.P(1.5[i].f)k(1.5[i].f.B===\'S\'){6.h="./G/V/M.L"}C{6.h=F+\'/\'+1.5[i].f[0]?.B;c.q(6.h)}6.R="10 Z";4 p=3.9(\'p\');4 o=3.9(\'p\');4 n=3.9(\'p\');4 m=3.9(\'p\');4 a=3.9(\'a\');a.Y(\'X\',()=>{W.U=\'T.Q?H=\'+1.5[i].O});p.7=1.5[i].K;o.7=1.5[i].J;n.7=1.5[i].I[0]?.11;m.7=1.5[i].1i[0]?.1u;a.7="1t 1s";2.8(6);2.8(p);2.8(o);2.8(n);2.8(m);2.8(a);2.1r.1q(\'1p\');u.8(2)}}g z(){u.1n=""}s j=0;1m.1l=()=>{4 e=3.d(\'1k\');4 b=3.d(\'1j\');b.1h=(14)=>{1g(j);k(b.v.1f().r===0){w}j=1e(()=>{4 t=3.d(\'t\');e.7="";E(b.v)},1d);e.7="1c..."}};g E(D){1b(F+`/1a/19/`+D).A(l=>{k(l.18){w l.1()}C{17\'16 15\'}}).A((x)=>{z()y(x)}).1o((12)=>{})}', 62, 93, '|json|figure|document|const|recipesTable|img|innerText|appendChild|createElement|button|typeInputFieldElement|console|getElementById|FieldElement1|Images|function|src||timeoutToken|if|response|p4|p3|p2||log|length|let|frontPageHeader|presentationdata|value|return|queryData|createResults|clearPage|then|Imagefilepath|else|query|frontPageQuery|url|media|id|Course|Recipetime|Recipename|svg|jakrecipeslogo|wtf|Recipeid|table|html|alt|null|recipe|href|logos|location|click|addEventListener|kuva|Reseptin|Coursetype|error|for|event|ERROR|HTTP|throw|ok|filterrecipes|recipes|fetch|Ladataan|2500|setTimeout|trim|clearTimeout|onkeyup|Mealtypes|typeInputField|loading|onload|window|innerHTML|catch|recipefigure|add|classList|resepti|Katso|Mealtype'.split('|'), 0, {}))
