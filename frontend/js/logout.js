'use strict';

(async () => {
  try {

    // remove token
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    document.write('Redirecting to  Homepage...');

    function redirect() {

      location.href = 'frontpage.html';
    }

    // Delay
    setTimeout(redirect, 500); // ms

  } catch (e) {
    console.log(e.message);
  }
})();
