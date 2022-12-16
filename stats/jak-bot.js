import 'dotenv/config';
import fetch from 'node-fetch';
import mysql from 'mysql2';
import {Client, Events, GatewayIntentBits} from 'discord.js';
import 'discord-reply';

const jakbot = new Client({intents: [GatewayIntentBits.Guilds]});
const dateStarted = Date.now();
const channelIDstart = '1049544820277911582';
const channelID = '1044563808716328960';
const channelIDwelcome = '1049557618261250119';
const ChannelIDrecipes = '1049558898706759751';
const ChannelIDUptime = '1049563466794532944';
const ChannelIDwebsite = '1049563915719299142';
const ChannelIDApache = '1050156462795653191';
const ChannelIDMariadb = '1050156941864874014';

const admin = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER_ALL,
  password: process.env.DB_PASS_ALL,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10000,
  queueLimit: 0,
  multipleStatements: true,
});
jakbot.login(process.env.DISCORD_TOKEN);
jakbot.once(Events.ClientReady, c => {
  // console.log(`Ready! Logged in as ${c.user.tag}`);

});

jakbot.on('ready', jakbot => {

  jakbot.channels.cache.get(channelIDstart).
      send('Node.js restarted at ' + new Date(Date.now()).toISOString());
});

const restart = true;

jakbot.on('ready', async jakbot => {
  setInterval(async () => {
    jakbot.user.setUsername('JAK-BOT status');

    jakbot.user.setUsername('JAK-BOT running');
    if (process.env.NODE_ENV === 'production') {
      const response1 = await fetch(
          'https://10.114.34.72/jak/status/apachestatus');
      const fetchDataJson1 = await response1.json();
      jakbot.channels.cache.get(ChannelIDApache).
          send('Apache status: ' + fetchDataJson1[0].status);
      const response2 = await fetch(
          'https://10.114.34.72/jak/status/mariadbstatus');
      const fetchDataJson2 = await response2.json();
      jakbot.channels.cache.get(ChannelIDMariadb).
          send('MariaDB status: ' + fetchDataJson2[0].status);
      const response3 = await fetch(
          'https://10.114.34.72/jak/status/starttime');
      const fetchDataJson3 = await response3.json();
      const howlonghavewebeenthere = dateStarted - fetchDataJson3[0].datenow;
      if (howlonghavewebeenthere < 120000) { // what 2 minutes is in ms? 120000
        jakbot.channels.cache.get(ChannelIDwebsite).
            send('Server restarted less than 2 minutes ago');
      } else if (howlonghavewebeenthere < 0) {
        jakbot.channels.cache.get(ChannelIDwebsite).send('Server down');

      } else {
        jakbot.channels.cache.get(ChannelIDwebsite).
            send('Server uptime: ' +
                Math.floor((howlonghavewebeenthere) / 1000 / (60 * 60) % 24) +
                ' hours ' +
                Math.floor((howlonghavewebeenthere) / 1000 / 60 % 60) +
                ' minutes ' + Math.floor((howlonghavewebeenthere) / 1000 % 60) +
                ' seconds');
      }
    } else {
      const response1 = await fetch(
          'http://localhost:3000/status/apachestatus');
      const fetchDataJson1 = await response1.json();
      jakbot.channels.cache.get(ChannelIDApache).
          send(' Local Apache status: ' + fetchDataJson1[0].status);
      const response2 = await fetch(
          'http://localhost:3000/status/mariadbstatus');
      const fetchDataJson2 = await response2.json();
      jakbot.channels.cache.get(ChannelIDMariadb).
          send(' Local MariaDB status: ' + fetchDataJson2[0].status);
      const response3 = await fetch('http://localhost:3000/status/starttime');
      const fetchDataJson3 = await response3.json();
      const howlonghavewebeenthere = dateStarted - fetchDataJson3[0].datenow;

      if (howlonghavewebeenthere < 120000) { // what 2 minutes is in ms? 120000
        jakbot.channels.cache.get(ChannelIDwebsite).
            send('Server restarted less than 2 minutes ago');
      } else if (howlonghavewebeenthere < 0) {
        jakbot.channels.cache.get(ChannelIDwebsite).send('Server down');

      } else {
        jakbot.channels.cache.get(ChannelIDwebsite).
            send('Server uptime: ' +
                Math.floor((howlonghavewebeenthere) / 1000 / (60 * 60) % 24) +
                ' hours ' +
                Math.floor((howlonghavewebeenthere) / 1000 / 60 % 60) +
                ' minutes ' + Math.floor((howlonghavewebeenthere) / 1000 % 60) +
                ' seconds');
      }

    }
    jakbot.user.setUsername('J A K B O T');
  }, 10000);
});

jakbot.on('ready', jakbot => {
  jakbot.user.setActivity('Node js ', {type: 'PLAYING'});

  setInterval(() => {
    jakbot.user.setUsername('JAK-BOT uptime');
    admin.query(
        'show status LIKE "uptime%"',
        function(err, result) {
          if (err) throw err;
          let serverUptimeInMilliseconds = result[0].Value;
          serverUptimeInMilliseconds = Math.floor(
                  serverUptimeInMilliseconds / (60 * 60 * 24)) + ' days ' +
              Math.floor(serverUptimeInMilliseconds / (60 * 60) % 24) +
              ' hours ' + Math.floor(serverUptimeInMilliseconds / 60 % 60) +
              ' minutes ' + Math.floor(serverUptimeInMilliseconds % 60) +
              ' seconds';
          jakbot.channels.cache.get(ChannelIDUptime).
              send('with SHOW STATUS db uptime since ' +
                  serverUptimeInMilliseconds);
        },
    );
    jakbot.user.setUsername('J A K B O T');
  }, 65000); // 1 hour 50 minutes
  setInterval(() => {
    jakbot.user.setUsername('JAK-BOT counting');
    admin.query(
        'SELECT * FROM `jakrecipes`.`allthecounts`;',
        function(err, result) {
          if (err) throw err;

          jakbot.channels.cache.get(channelID).
              send('Results:\n Allusers: ' + result[2].count +
                  '\n Users: ' + result[1].count +
                  '\n Recipes: ' + result[0].count +
                  '\n Reciperatings: ' + result[8].count +
                  '\n Comments: ' + result[3].count +
                  '\n Commentratings: ' + result[6].count +
                  '\n Images: ' + result[5].count);

        });
    jakbot.user.setUsername('J A K B O T');

  }, 45000); // 1,5 hours

  setInterval(() => {
    jakbot.user.setUsername('JAK-BOT new data');
    admin.query(
        'SELECT `Recipename` FROM `Recipes` group by Recipeid limit 6;',
        function(err, result) {
          if (err) throw err;

          jakbot.channels.cache.get(ChannelIDrecipes).
              send('Our newest 6 recipes as time now ' +
                  new Date(Date.now()).toISOString());
          for (let i = 0; i < result.length; i++) {
            jakbot.channels.cache.get(ChannelIDrecipes).
                send('recipename: ' + result[i].Recipename);
          }
        });
    jakbot.user.setUsername('J A K B O T');

  }, 60000); // 2 hours
  setInterval(() => {
    jakbot.user.setUsername('JAK-BOT new usr');
    admin.query(
        'SELECT Useremail  FROM `Users` group by Userid limit 10;',
        function(err, result) {
          if (err) throw err;

          jakbot.channels.cache.get(channelIDwelcome).
              send('Our newest users as time now ' +
                  new Date(Date.now()).toISOString());
          for (let i = 0; i < result.length; i++) {
            jakbot.channels.cache.get(channelIDwelcome).
                send('Useremail: ' + result[i].Useremail);
          }
        });
    jakbot.user.setUsername('J A K B O T');
  }, 12000);

});



