const body = document.querySelector('body');
header = document.createElement('header');
body.appendChild(header);
h1 = document.createElement('h1');
h1.innerHTML = 'JAKrecipes Admin Dashboard';
header.appendChild(h1);
header.classList.add('admin-header');
h1.classList.add('admin-header__title');
nav = document.createElement('nav');
nav.classList.add('admin-nav');
header.appendChild(nav);
ul = document.createElement('ul');
ul.classList.add('admin-nav__list');
nav.appendChild(ul);
li = document.createElement('li');
li.classList.add('admin-nav__item');
ul.appendChild(li);
loginlink = document.createElement('a');
loginlink.classList.add('admin-nav__link');
loginlink.setAttribute ('id','admin-nav_login') 
loginlink.innerHTML = 'login';
li.appendChild(loginlink);
main = document.createElement('main');
main.classList.add('admin-main');
body.appendChild(main);
section = document.createElement('section');
section.classList.add('admin-main__section');
main.appendChild(section);
h2 = document.createElement('h2');
h2.classList.add('admin-main__title');
h2.innerHTML = 'Recipes';
section.appendChild(h2);
form = document.createElement('form');
form.classList.add('admin-main__form');
section.appendChild(form);
form.setAttribute("method", "post");
admininputid = document.createElement("input");
admininputid.setAttribute("type", "text");
admininputid.setAttribute("name", "username");
admininputid.setAttribute("placeholder", "admin");
admininputid.setAttribute("id", "admin-input-id");
admininputid.classList.add('admin-inputs');
adminpassword = document.createElement("input");
adminpassword.setAttribute("type", "password");
adminpassword.setAttribute("name", "password");
adminpassword.setAttribute("placeholder", "Password");
adminpassword.setAttribute("id", "admin-input-password");
adminpassword.classList.add('admin-inputs');
adminsubmitbutton = document.createElement("input");
adminsubmitbutton.setAttribute("type", "submit");
adminsubmitbutton.setAttribute("value", "Submit");
form.append(admininputid);
form.append(adminpassword);
form.append(adminsubmitbutton);
adminsubmitbutton.classList.add('admin-submit-button');
adminsubmitbutton.setAttribute("id", "admin-submit-button");
quotes = document.createElement('div');
quotes.classList.add('admin-quotes');
quotes.setAttribute('id', 'admin-quotes');
main.appendChild(quotes);

quotesinput = document.getElementById('admin-quotes');
quotesinput.innerHTML = '“The only thing that interferes with my learning is my education.”  Albert Einstein';


document.getElementById("admin-submit-button").addEventListener("click", function () {
    const username = document.getElementById('admin-input-id').value;
    const password = document.getElementById('admin-input-password').value;
    if (username == "admin" && password == "admin") {
        alert("Login successfully");
        window.location = "admin.html"; // Redirecting to other page.
        return false;
    }
    else {
        alert("Invalid username or password");
    }

    // evt.preventDefault();
    // const emailInput = document.querySelector('#emailInput').value;
    // //const usernameInput = document.querySelector('#usernameInput').value;
    // const passwordInput = document.querySelector('#passwordInput').value;
    // const data = {
    //     username: emailInput,
    //     password: passwordInput
    // }
    // const fetchOptions = {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(data),
    // };
    // console.log(data);
    // const response = await fetch(url + '/auth/login', fetchOptions);
    // const json = await response.json();
    // console.log('login response', json);
    // if (!json.user) {
    //     alert(json.message);
    // } else {
    //     // save token
    //     sessionStorage.setItem('token', json.token);
    //     sessionStorage.setItem('user', JSON.stringify(json.user));
    //     location.href = 'frontpage.html';
    // }
});

