'use strict';

(async () => {
  try {

    // remove token
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    document.write('Sinut ohjataan etusivulle...');

    function redirect() {

      location.href = 'index.html';
    }

    // Delay
    setTimeout(redirect, 500); // ms

  } catch (e) {
    console.log(e.message);
  }
})();
