'use strict';
const signInLinkNav = document.getElementById('signInLink');
const profileLinkNav = document.getElementById('profileLink');
const registerLinkNav = document.getElementById('registrationLink');
const signOutLinkNav = document.getElementById('signOutLink');


// JOS käyttäjä ei ole kirjautunut
if (!sessionStorage.getItem('token') || !sessionStorage.getItem('user')) {
    profileLinkNav.remove();
    signOutLinkNav.remove();

} else {
    signInLinkNav.remove();
    registerLinkNav.remove();

}
// JOS KÄYTTÄJÄ on kirjatunut, profiili linkki vie hänen profiilisivullensa
if (sessionStorage.getItem('token') || sessionStorage.getItem('user')) {
    const profileLink = document.getElementById('profileLink');
    profileLink.href = 'profile.html?username=' + JSON.parse(sessionStorage.getItem('user')).Username;
}

