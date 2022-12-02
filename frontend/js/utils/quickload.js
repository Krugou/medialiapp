window.location.href = url + "/status"
let meta = document.createElement('meta');
meta.httpEquiv = "refresh"
meta.content = "2; url=" + url + '/status';
let body = getElementsById('link');
body.innerHTML = '<p>Not redirected? Go to <a href=' + url + '"/status">status</a></p>';