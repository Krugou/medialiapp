
const datenow = Date.now()
const alluserscount = document.getElementById('alluserscount')
const userscount = document.getElementById('userscount')
const recipecount = document.getElementById('recipecount')
const commentcount = document.getElementById('commentcount')
const imagecount = document.getElementById('imagecount')
const reciperatingcount = document.getElementById('reciperatingcount')
const commentratingcount = document.getElementById('commentratingcount')
const nodejsstatus = document.getElementById('nodejsstatus')
const mariadbstatus = document.getElementById('mariadbstatus')
const mariadbuptime = document.getElementById('mariadbuptime')
const serveruptime = document.getElementById('serveruptime')
const quotesinput = document.getElementById('admin-quotes');


function checkData() {




}
function getCounts() {
    fetch(urladmin + '/a/c')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {


            alluserscount.innerHTML = '<h4>alluserscount</h4>  <br><p>' + data[2].count;
            alluserscount.style = 'background-color: #00df30;'
            userscount.innerHTML = '<h4>userscount</h4>  <br><p>' + data[1].count;
            userscount.style = 'background-color: #00df30;'
            recipecount.innerHTML = '<h4>recipecount</h4>  <br><p>' + data[0].count;
            recipecount.style = 'background-color: #00df30;'
            commentcount.innerHTML = '<h4>commentcount</h4>  <br><p>' + data[3].count;
            commentcount.style = 'background-color: #00df30;'
            imagecount.innerHTML = '<h4>imagecount</h4>  <br><p>' + data[5].count;
            imagecount.style = 'background-color: #00df30;'
            reciperatingcount.innerHTML = '<h4>reciperatingcount</h4>  <br><p>' + data[6].count;
            reciperatingcount.style = 'background-color: #00df30;'
            commentratingcount.innerHTML = '<h4>commentratingcount</h4>  <br><p>' + data[8].count
            commentratingcount.style = 'background-color: #00df30;'

        });
}
// node.js status
function getnodejs() {
    fetch(urladmin + '/a/n')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            nodejsstatus.innerHTML = data[0].status;
            nodejsstatus.style = 'background-color: #00df30;'
        });
}
// mariadb status
function getmariadb() {

    fetch(urladmin + '/a/m')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            mariadbstatus.innerHTML = '<h4>mariadbstatus: ' + data[0].status;
            mariadbstatus.style = 'background-color: #00df30;'
        });
}
// apache status
function getapache() {

    fetch(urladmin + '/a/a')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            apachestatus.innerHTML = '<h4>apachestatus: ' + data[0].status;
            apachestatus.style = 'background-color: #00df30;'
        });
}

// mariadb uptime
function getmariadbuptime() {
    fetch(urladmin + '/a/ut')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            const uptime = (data[0].Value)
            console.log(uptime)
            let newdate = (uptime);
            let seconds = Math.floor(newdate % 60);
            let minutes = Math.floor((newdate / 60) % 60);
            let hours = Math.floor((newdate / (60 * 60)) % 24);
            let days = Math.floor(newdate / (60 * 60 * 24));
            if (days == 0 && hours > 0) {
                mariadbuptime.innerHTML = '<h4>mariadbuptime:</h4>  <br><p>' + hours + " hours " + minutes + ' mins ' + seconds + ' secs </p>'
                mariadbuptime.style = 'background-color: #00df30;'

            } else if (days == 0 && hours == 0 && minutes > 0) {
                mariadbuptime.innerHTML = '<h4>mariadbuptime:</h4>  <br><p>' + minutes + ' mins ' + seconds + ' secs </p>'
                mariadbuptime.style = 'background-color: #00df30;'

            } else if (days == 0 && hours == 0 && minutes == 0 && seconds > 0) {
                mariadbuptime.innerHTML = '<h4>mariadbuptime:</h4>  <br><p>' + seconds + ' secs </p>'
                mariadbuptime.style = 'background-color: #00df30;'

            }
            else {
                mariadbuptime.innerHTML = '<h4>mariadbuptime:</h4>  <br><p>' + days + ' days ' + hours + ' hours ' + minutes + ' mins ' + seconds + ' secs </p>'
                mariadbuptime.style = 'background-color: #00df30;'

            }
        });
}



// server uptime
function getServeruptime() {
    fetch(urladmin + '/a/n/s')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            const uptime = datenow - data[0].datenow
            let newdate = (uptime / 1000);
            let seconds = Math.floor(newdate % 60);
            let minutes = Math.floor((newdate / 60) % 60);
            let hours = Math.floor((newdate / (60 * 60)) % 24);
            let days = Math.floor(newdate / (60 * 60 * 24));
            if (days == 0 && hours > 0) {

                serveruptime.innerHTML = '<h4>serveruptime:</h4>  <br><p>' + hours + " hours " + minutes + ' mins ' + seconds + ' secs </p>'
                serveruptime.style = 'background-color: #00df30;'

            } else if (days == 0 && hours == 0 && minutes > 0) {
                serveruptime.innerHTML = '<h4>serveruptime:</h4> <br><p>' + minutes + ' mins ' + seconds + ' secs </p>'
                serveruptime.style = 'background-color: #00df30;'

            } else if (days == 0 && hours == 0 && minutes == 0) {
                serveruptime.innerHTML = '<h4>serveruptime:</h4>  <br><p>' + seconds + ' secs </p>'
                serveruptime.style = 'background-color: #00df30;'


            }
            else {
                serveruptime.innerHTML = '<h4>serveruptime:</h4>  <br><p>' + days + ' days ' + hours + ' hours ' + minutes + ' mins ' + seconds + ' secs </p>'
                serveruptime.style = 'background-color: #00df30;'

            }
        });
}
function getRecipeData() {
    fetch(urladmin + '/a/rd')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.table(data)
        });
}

// default quote if api is offline
quotesinput.innerHTML = '<h4> id="admin-quotes">“The only thing that interferes with my learning is my education.” <br>  Albert Einstein</h4>';

function quotes() {
    fetch("https://type.fit/api/quotes")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (data[theRandomNumber].author == null) {
                data[theRandomNumber].author = '>Unknown';
            }
            const theRandomNumber = Math.floor(Math.random() * (data.length - 1));
            quotesinput.innerHTML = '<h4 id="admin-quotes">' + data[theRandomNumber].text + '<br>  -' + data[theRandomNumber].author + '</h4>';
            // console.table(data);
        });


}


async function runDashboard() {
    await getmariadb()
    await getapache()
    await getnodejs()
    await getmariadbuptime();
    await getServeruptime();
    await getCounts()
    await quotes();

}
runDashboard();