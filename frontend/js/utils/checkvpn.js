// Check if vpn is online to metropolia
function existsFile(url) {
  const xhr = new XMLHttpRequest();

  xhr.open('GET', url, false);
  xhr.send();

  if (xhr.status === 200) {
    console.log('File exists: ' + url);

    return true;
  } else {
    console.log('File does not exist: ' + url);
    xhr.abort();
    return false;
  }
}
const checkvalue = existsFile('https://10.114.34.72/app/status');
if (checkvalue === true) {
  var url = 'https://10.114.34.72/app';
  console.log('vpn is online ' + url);
} else {
  var url = 'http://localhost:3000';
  console.log('vpn is offline ' + url);
}
