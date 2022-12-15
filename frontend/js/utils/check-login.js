
(async () => {
  'use strict';
    if (!sessionStorage.getItem('token') || !sessionStorage.getItem('user')) {
        location.href = 'signIn.html';
    }
})();




