const datenow = Date.now();
const alluserscount = document.getElementById('alluserscount');
const userscount = document.getElementById('userscount');
const recipecount = document.getElementById('recipecount');
const commentcount = document.getElementById('commentcount');
const imagecount = document.getElementById('imagecount');
const reciperatingcount = document.getElementById('reciperatingcount');
const commentratingcount = document.getElementById('commentratingcount');
const nodejsstatus = document.getElementById('nodejsstatus');
const mariadbstatus = document.getElementById('mariadbstatus');
const mariadbuptime = document.getElementById('mariadbuptime');
const serveruptime = document.getElementById('serveruptime');
const quotesinput = document.getElementById('admin-quotes');

// get username from sessionstorage 
const username = sessionStorage.getItem('username');
const token = sessionStorage.getItem('token');

function checkData() {

}

function getCounts() {
  fetch(urladmin + '/a/c').then(function(response) {
    return response.json();
  }).then(function(data) {

    alluserscount.innerHTML = 'alluserscount  ' + data[2].count;
    alluserscount.style = 'background-color: #00df30;';
    userscount.innerHTML = 'userscount  ' + data[1].count;
    userscount.style = 'background-color: #00df30;';
    recipecount.innerHTML = 'recipecount  ' + data[0].count;
    recipecount.style = 'background-color: #00df30;';
    commentcount.innerHTML = 'commentcount  ' + data[3].count;
    commentcount.style = 'background-color: #00df30;';
    imagecount.innerHTML = 'imagecount  ' + data[5].count;
    imagecount.style = 'background-color: #00df30;';
    reciperatingcount.innerHTML = 'reciperatingcount  ' +
        data[6].count;
    reciperatingcount.style = 'background-color: #00df30;';
    commentratingcount.innerHTML = 'commentratingcount  ' +
        data[8].count;
    commentratingcount.style = 'background-color: #00df30;';

    const ctx = document.getElementById('myChart');

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['alluserscount', 'userscount', 'recipecount', 'commentcount', 'imagecount', 'reciperatingcount', 'commentratingcount'],
        datasets: [{
          label: 'counts',
          data: [data[2].count, data[1].count, data[0].count, data[3].count, data[5].count, data[6].count, data[8].count],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

  });
}

// node.js status
function getnodejs() {
  fetch(urladmin + '/a/n').then(function(response) {
    return response.json();
  }).then(function(data) {
    nodejsstatus.innerHTML = data[0].status;
    nodejsstatus.style = 'background-color: #00df30;';
  });
}

// mariadb status
function getmariadb() {

  fetch(urladmin + '/a/m').then(function(response) {
    return response.json();
  }).then(function(data) {
    mariadbstatus.innerHTML = 'mariadbstatus: ' + data[0].status;
    mariadbstatus.style = 'background-color: #00df30;';
  });
}

// apache status
function getapache() {

  fetch(urladmin + '/a/a').then(function(response) {
    return response.json();
  }).then(function(data) {
    apachestatus.innerHTML = 'apachestatus: ' + data[0].status;
    apachestatus.style = 'background-color: #00df30;';
  });
}

// mariadb uptime
function getmariadbuptime() {
  fetch(urladmin + '/a/ut').then(function(response) {
    return response.json();
  }).then(function(data) {
    const uptime = (data[0].Value);
    let newdate = (uptime);
    let seconds = Math.floor(newdate % 60);
    let minutes = Math.floor((newdate / 60) % 60);
    let hours = Math.floor((newdate / (60 * 60)) % 24);
    let days = Math.floor(newdate / (60 * 60 * 24));
    if (days == 0 && hours > 0) {
      mariadbuptime.innerHTML = 'mariadbuptime:  ' + hours +
          ' hours ' + minutes + ' mins ' + seconds + ' secs ';
      mariadbuptime.style = 'background-color: #00df30;';

    } else if (days == 0 && hours == 0 && minutes > 0) {
      mariadbuptime.innerHTML = 'mariadbuptime:  ' + minutes +
          ' mins ' + seconds + ' secs ';
      mariadbuptime.style = 'background-color: #00df30;';

    } else if (days == 0 && hours == 0 && minutes == 0 && seconds > 0) {
      mariadbuptime.innerHTML = 'mariadbuptime:  ' + seconds +
          ' secs ';
      mariadbuptime.style = 'background-color: #00df30;';

    } else {
      mariadbuptime.innerHTML = 'mariadbuptime:  ' + days +
          ' days ' + hours + ' hours ' + minutes + ' mins ' + seconds +
          ' secs ';
      mariadbuptime.style = 'background-color: #00df30;';

    }
  });
}

// server uptime
function getServeruptime() {
  fetch(urladmin + '/a/n/s').then(function(response) {
    return response.json();
  }).then(function(data) {
    const uptime = datenow - data[0].datenow;
    let newdate = (uptime / 1000);
    let seconds = Math.floor(newdate % 60);
    let minutes = Math.floor((newdate / 60) % 60);
    let hours = Math.floor((newdate / (60 * 60)) % 24);
    let days = Math.floor(newdate / (60 * 60 * 24));
    if (days == 0 && hours > 0) {

      serveruptime.innerHTML = 'serveruptime:  ' + hours +
          ' hours ' + minutes + ' mins ' + seconds + ' secs ';
      serveruptime.style = 'background-color: #00df30;';

    } else if (days == 0 && hours == 0 && minutes > 0) {
      serveruptime.innerHTML = 'serveruptime: ' + minutes +
          ' mins ' + seconds + ' secs ';
      serveruptime.style = 'background-color: #00df30;';

    } else if (days == 0 && hours == 0 && minutes == 0) {
      serveruptime.innerHTML = 'serveruptime:  ' + seconds +
          ' secs ';
      serveruptime.style = 'background-color: #00df30;';

    } else {
      serveruptime.innerHTML = 'serveruptime:  ' + days +
          ' days ' + hours + ' hours ' + minutes + ' mins ' + seconds +
          ' secs ';
      serveruptime.style = 'background-color: #00df30;';

    }
  });
}

function getRecipeData(amount) {
  fetch(urladmin + '/a/rd').then(function(response) {
    return response.json();
  }).then(function(data) {
    const section = document.getElementById('entryTables');
    const admintable2 = document.getElementById('admintable');
    console.log("🚀 ~ file: adminmain.js:159 ~ fetch ~ admintable2", admintable2)

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
    tr.appendChild(Imagefilepath,
    );
    table.appendChild(tr);
    for (let i = 0; i < data.length; i++) {
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
    if (admintable2 !== null){
      admintable2.remove();
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
  const deletebutton = document.getElementById('deletebutton');
  deletebutton.addEventListener('click', function () {
    const deleteid = document.getElementById('deleteid').value;
    fetch(urladmin + '/b/recipes/' + deleteid, {
      method: 'DELETE',
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      console.log(data);
      // reload page 
      
    });
    window.location.reload(true);
  }
  );

}
function getUsersData(amount) {
  fetch(urladmin + '/a/au').then(function (response) {
    return response.json();
  }).then(function (data) {
    
    const section = document.getElementById('entryTables');
    const admintable2 = document.getElementById('admintable');

    const table = document.createElement('table');
    table.setAttribute('id', 'admintable');
    table.setAttribute('class', 'admintable');
    const tr = document.createElement('tr');
    table.appendChild(tr);
    const Userid = document.createElement('th');
    const Username = document.createElement('th');
    const Useremail = document.createElement('th');
    const Userpassword = document.createElement('th');
    const Userrole = document.createElement('th');
    const Userimage = document.createElement('th');
    Userid.innerHTML = 'Userid';
    Username.innerHTML = 'Username';
    Useremail.innerHTML = 'Useremail';
    Userpassword.innerHTML = 'Userpassword';
    Userrole.innerHTML = 'Userrole';
    Userimage.innerHTML = 'Userimage';
    tr.appendChild(Userid);
    tr.appendChild(Username);
    tr.appendChild(Useremail);
    tr.appendChild(Userpassword);
    tr.appendChild(Userrole);
    tr.appendChild(Userimage,
    );
    table.appendChild(tr);
    for (let i = 0; i < data.length; i++) {
      const tr = document.createElement('tr');
      const Userid = document.createElement('td');
      const Username = document.createElement('td');
      const Useremail = document.createElement('td');
      const Userpassword = document.createElement('td');
      const Userrole = document.createElement('td');
      const Userimage = document.createElement('td');
      Userid.innerHTML = data[i].Userid;
      Username.innerHTML = data[i].Username;
      Useremail.innerHTML = data[i].Useremail;
      Userpassword.innerHTML = data[i].Userpassword;
      Userrole.innerHTML = data[i].Userrole;
      Userimage.innerHTML = data[i].Userimage;
      tr.appendChild(Userid);
      tr.appendChild(Username);
      tr.appendChild(Useremail);
      tr.appendChild(Userpassword);
      tr.appendChild(Userrole);
      tr.appendChild(Userimage);
      table.appendChild(tr);
    }
    admintable2.remove();
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
  const deletebutton = document.getElementById('deletebutton');
  deletebutton.addEventListener('click', function () {
    const deleteid = document.getElementById('deleteid').value;
    fetch(urladmin + '/b/users/' + deleteid, {
      method: 'DELETE',
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      console.log(data);
      // reload page 

    });
    window.location.reload(true);
  }
  );
}
function getAllcomments(amount) {
  fetch(urladmin + '/a/co').then(function (response) {
    return response.json();
  }
  ).then(function (data) {
    const section = document.getElementById('entryTables');
    const admintable2 = document.getElementById('admintable');
    
    const table = document.createElement('table');
    table.setAttribute('id', 'admintable');
    table.setAttribute('class', 'admintable');
    const tr = document.createElement('tr');
    table.appendChild(tr);
    const Commentid = document.createElement('th');
    const Commenttext = document.createElement('th');
    const Commentrecipe = document.createElement('th');
    const Commentuserid = document.createElement('th');
    Commentid.innerHTML = 'Commentid';
    Commenttext.innerHTML = 'Commenttext';
    Commentrecipe.innerHTML = 'Commentrecipe';
    Commentuserid.innerHTML = 'Commentuserid';
    tr.appendChild(Commentid);
    tr.appendChild(Commenttext);
    tr.appendChild(Commentrecipe);
    tr.appendChild(Commentuserid);
    table.appendChild(tr);
    for (let i = 0; i < data.length; i++) {
      const tr = document.createElement('tr');
      const Commentid = document.createElement('td');
      const Commenttext = document.createElement('td');
      const Commentrecipe = document.createElement('td');
      const Commentuserid = document.createElement('td');
      Commentid.innerHTML = data[i].Commentid;
      Commenttext.innerHTML = data[i].Commenttext;
      Commentrecipe.innerHTML = data[i].Commentrecipe;
      Commentuserid.innerHTML = data[i].Commentuserid;
      tr.appendChild(Commentid);
      tr.appendChild(Commenttext);
      tr.appendChild(Commentrecipe);
      tr.appendChild(Commentuserid);
      table.appendChild(tr);
    }
    admintable2.remove();
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
  const deletebutton = document.getElementById('deletebutton');
  deletebutton.addEventListener('click', function () {
    const deleteid = document.getElementById('deleteid').value;
    fetch(urladmin + '/b/comments/' + deleteid, {
      method: 'DELETE',
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      console.log(data);
      // reload page 

    });
    window.location.reload(true);
  }
  );
}


const getallrecipesbutton = document.getElementById('getallrecipesbutton');
getallrecipesbutton.addEventListener('click', function () {
  getRecipeData();
});
const getallusersbutton = document.getElementById('getallusersbutton');
getallusersbutton.addEventListener('click', function () {
  getUsersData();
});
const getallcommentsbutton = document.getElementById('getallcommentsbutton');
getallcommentsbutton.addEventListener('click', function () {
  getAllcomments();
});





// default quote if api is offline
quotesinput.innerHTML = '<h4 id="admin-quotes">“The only thing that interferes with my learning is my education.”   Albert Einstein';
let theRandomNumber;

function quotes() {
  fetch('https://type.fit/api/quotes').then(function(response) {
    return response.json();
  }).then(function(data) {
    theRandomNumber = Math.floor(Math.random() * (data.length - 1));
    if (data[theRandomNumber].author == null) {
      data[theRandomNumber].author = '>Unknown';
    }

    quotesinput.innerHTML = '<h4 id="admin-quotes">' +
        data[theRandomNumber].text + '   -' + data[theRandomNumber].author +
        '';
  });

}

async function runDashboard() {
  await getmariadb();
  await getapache();
  await getnodejs();
  await getmariadbuptime();
  await getServeruptime();
  await getCounts();
  await getRecipeData(99);
  await quotes();

}

runDashboard();