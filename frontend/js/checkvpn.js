// Check if vpn is online to metropolia
function existsFile(url) {
    let http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status != 404;
}
const checkvalue = existsFile('10.114.34.72');

if (checkvalue === true) {
    var url = 'https://10.114.34.72/app'
    // console.log('vpn is online');
} else {
    var url = 'http://localhost:3000'
    // console.log('vpn is offline');
}
