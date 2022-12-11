'use strict';
document.body.style.backgroundColor = 'black';
document.body.style.color = 'white';
document.body.style.fontFamily = 'monospace';
document.body.style.fontSize = '1.5em';
document.body.style.width = '100vw';

function wholePage() {

  document.body.innerHTML = '<img src="https://www.metropolia.fi/sites/default/files/styles/logo_logobank/public/logos/thumbnails/metropolia_l_black_negative.png" alt="metropolia" > <br> <h1>Okay lets try the metropolia educloud server first</h1> ';

  fetch('https://10.114.34.72/jak/status').then(response => {
    document.body.innerHTML = '<h1>well we got something back</h1>';
    if (response.status === 200) {
      document.body.innerHTML = '<h1>it should redirect you now</h1>';
      window.location.href = 'https://10.114.34.72/jak/status';
      let meta = document.createElement('meta');
      meta.httpEquiv = 'refresh';
      meta.content = '2; url=https://10.114.34.72/jak/status';
      let body = getElementsById('link');
      body.innerHTML = '<p class="fontsizeforp">Not redirected? Go to <a href=' +
          url + '"/status">status</a></p>';
    } else { throw document.body.innerHTML = 'well lets try localhost then'; }
  }).catch(error => {
    fetch('http://localhost:3000/status').then(response => {
      document.body.innerHTML = '<h1>well we got something back</h1>';
      document.body.innerHTML = '<h1>it should redirect you now</h1>';
      window.location.href = 'http://localhost:3000/status';
      let meta = document.createElement('meta');
      meta.httpEquiv = 'refresh';
      meta.content = '2; url=http://localhost:3000';
      let body = getElementsById('link');
      body.innerHTML = '<p class="fontsizeforp">Not redirected? Go to <a href="http://localhost:3000/status">status</a></p>';
    }).catch(error => {
      document.body.innerHTML = '';
      const hr = document.createElement('hr');
      const h1 = document.createElement('H1');
      const p = document.createElement('P');
      const img = document.createElement('IMG');
      const strong = document.createElement('STRONG');
      h1.innerHTML = 'You <strong>idiot</strong> you forgot to turn on the node.js server';
      document.body.appendChild(h1);
      document.body.appendChild(hr);
      p.innerHTML = 'Take this puppy. Program restarting shortly';
      p.style.textAlign = 'center';

      document.body.appendChild(p);
      document.body.appendChild(hr);
      hr.style.height = '1rem';
      hr.style.backgroundColor = 'white';
      h1.style.textAlign = 'center';
      img.setAttribute('src',
          'https://place-puppy.com/' + parseInt(screen.width * 0.25) + 'x' +
          parseInt(screen.height * 0.25));
      img.setAttribute('alt', 'puppy');
      img.style.display = 'flex';
      img.style.margin = 'auto';
      img.style.width = '50vw';
      img.style.height = 'auto';
      img.style.justifyContent = 'center';
      img.style.alignItems = 'center';
      document.body.appendChild(img);
    });
  });
}

wholePage();
setInterval(wholePage, 25000);





