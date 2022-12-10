
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
function getRecipeData(amount) {
    fetch(urladmin + '/a/rd')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            const section = document.getElementById('entryTables');

            const table = document.createElement('table');
            table.setAttribute('id', 'admintable');
            table.setAttribute('class', 'admintable');
            const tr = document.createElement('tr');
            table.appendChild(tr);
            const Recipeid = document.createElement('th');
            const Recipename = document.createElement('th');
            const Recipetime = document.createElement('th');
            const Recipeguide = document.createElement('th');
            const Recipemaker = document.createElement('th');
            const Coursetype = document.createElement('th');
            const Mealtype = document.createElement('th');
            const Imagefilepath = document.createElement('th');
            Recipeid.innerHTML = 'Recipeid';
            Recipename.innerHTML = 'Recipename';
            Recipetime.innerHTML = 'Recipetime';
            Recipeguide.innerHTML = 'Recipeguide';
            Recipemaker.innerHTML = 'Recipemaker';
            Coursetype.innerHTML = 'Coursetype';
            Mealtype.innerHTML = 'Mealtype';
            Imagefilepath.innerHTML = 'Imagefilepath';
            tr.appendChild(Recipeid);
            tr.appendChild(Recipename);
            tr.appendChild(Recipetime);
            tr.appendChild(Recipeguide);
            tr.appendChild(Recipemaker);
            tr.appendChild(Coursetype);
            tr.appendChild(Mealtype);
            tr.appendChild(Imagefilepath
            );
            table.appendChild(tr);
            for (let i = 0; i < amount; i++) {
                const tr = document.createElement('tr');
                const Recipeid = document.createElement('td');
                const Recipename = document.createElement('td');
                const Recipetime = document.createElement('td');
                const Recipeguide = document.createElement('td');
                const Recipemaker = document.createElement('td');
                const Coursetype = document.createElement('td');
                const Mealtype = document.createElement('td');
                const Imagefilepath = document.createElement('td');
                Recipeid.innerHTML = data[i].Recipeid;
                Recipename.innerHTML = data[i].Recipename;
                Recipetime.innerHTML = data[i].Recipetime;
                Recipeguide.innerHTML = data[i].Recipeguide;
                Recipemaker.innerHTML = data[i].Recipemaker;
                Coursetype.innerHTML = data[i].Coursetype;
                Mealtype.innerHTML = data[i].Mealtype;
                Imagefilepath.innerHTML = data[i].Imagefilepath;
                tr.appendChild(Recipeid);
                tr.appendChild(Recipename);
                tr.appendChild(Recipetime);
                tr.appendChild(Recipeguide);
                tr.appendChild(Recipemaker);
                tr.appendChild(Coursetype);
                tr.appendChild(Mealtype);
                tr.appendChild(Imagefilepath);

                table.appendChild(tr);



            }

            section.appendChild(table);
            const tableHeader = document.querySelectorAll('th');
            for (let i = 0; i < tableHeader.length; i++) {
                tableHeader[i].classList.add('admin-table-th');

            }

            const tableDataCell = document.querySelectorAll('td');
            for (let i = 0; i < tableDataCell.length; i++) {
                tableDataCell[i].classList.add('admin-table-td');

            }

            const tableRow = document.querySelectorAll('tr');
            for (let i = 0; i < tableRow.length; i++) {

                if (i % 2 == 0) {
                    tableRow[i].classList.add('admin-table-tr-even');
                } else {
                    tableRow[i].classList.add('admin-table-tr-odd');
                }
            }


        });
}

// default quote if api is offline
quotesinput.innerHTML = '<h4 id="admin-quotes">“The only thing that interferes with my learning is my education.” <br>  Albert Einstein</h4>';
let theRandomNumber
function quotes() {
    fetch("https://type.fit/api/quotes")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            theRandomNumber = Math.floor(Math.random() * (data.length - 1));
            if (data[theRandomNumber].author == null) {
                data[theRandomNumber].author = '>Unknown';
            }

            quotesinput.innerHTML = '<h4 id="admin-quotes">' + data[theRandomNumber].text + ' <br>  -' + data[theRandomNumber].author + '</h4>';
        });


}


async function runDashboard() {
    await getmariadb()
    await getapache()
    await getnodejs()
    await getmariadbuptime();
    await getServeruptime();
    await getCounts()
    await getRecipeData(99)
    await quotes();

}
runDashboard();