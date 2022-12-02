// Check if vpn is online to metropolia
function existsFile(url) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.send();
    console.log('kill xhr')
    setTimeout(() => {
        xhr.abort();
    }, 1000);
}
const checkvalue = existsFile('https://10.114.34.72/app/status');

if (checkvalue === true) {
    var url = 'https://10.114.34.72/app'
    console.log('vpn is online '+url);
} else {
    var url = 'http://localhost:3000'
    console.log('vpn is offline '+ url);
}
