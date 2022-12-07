import "dotenv/config";
import fetch from 'node-fetch';
import mysql from 'mysql2'
import { Client, Events, GatewayIntentBits } from 'discord.js';
import "discord-reply"
const jakbot = new Client({ intents: [GatewayIntentBits.Guilds] });
const dateStarted = Date.now();
const channelIDstart = '1049544820277911582'
const channelID = '1044563808716328960';
const channelIDwelcome = '1049557618261250119';
const ChannelIDrecipes = '1049558898706759751'
const ChannelIDstatus = '1049563466794532944'
const ChannelIDwebsite = '1049563915719299142'


const admin = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER_ALL,
    password: process.env.DB_PASS_ALL,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10000,
    queueLimit: 0,
    multipleStatements: true
});
jakbot.login(process.env.DISCORD_TOKEN);
jakbot.once(Events.ClientReady, c => {
    // console.log(`Ready! Logged in as ${c.user.tag}`);

});



jakbot.on('ready', jakbot => {



    jakbot.channels.cache.get(channelIDstart).send('Node.js restarted at ' + new Date(Date.now()).toISOString());
});

const restart = true


jakbot.on('ready', async jakbot => {
    setInterval(async () => {
        jakbot.user.setUsername('JAK-BOT status');

        jakbot.user.setUsername('JAK-BOT running');
        if (process.env.NODE_ENV === 'production') {
            const response1 = await fetch('https://10.114.34.72/jak/status/apachestatus')
            const fetchDataJson1 = await response1.json()
            jakbot.channels.cache.get(ChannelIDstatus).send('Apache status: ' + fetchDataJson1[0].status);
            const response2 = await fetch('https://10.114.34.72/jak/status/mariadbstatus')
            const fetchDataJson2 = await response2.json()
            jakbot.channels.cache.get(ChannelIDstatus).send('MariaDB status: ' + fetchDataJson2[0].status);
            const response3 = await fetch('https://10.114.34.72/jak/status/starttime')
            const fetchDataJson3 = await response3.json()
            jakbot.channels.cache.get(ChannelIDwebsite).send('Server uptime: ' + Math.floor((dateStarted - fetchDataJson3[0].datenow) / 1000 / (60 * 60) % 24) + ' hours ' + Math.floor((dateStarted - fetchDataJson3[0].datenow) / 1000 / 60 % 60) + ' minutes ' + Math.floor((dateStarted - fetchDataJson3[0].datenow) / 1000 % 60) + ' seconds')
        } else {

            const response1 = await fetch('http://localhost:3000/status/apachestatus')
            const fetchDataJson1 = await response1.json()
            jakbot.channels.cache.get(ChannelIDstatus).send(' Local Apache status: ' + fetchDataJson1[0].status)
            const response2 = await fetch('http://localhost:3000/status/mariadbstatus')
            const fetchDataJson2 = await response2.json()
            jakbot.channels.cache.get(ChannelIDstatus).send(' Local MariaDB status: ' + fetchDataJson2[0].status)
            const response3 = await fetch('http://localhost:3000/status/starttime')
            const fetchDataJson3 = await response3.json()
            jakbot.channels.cache.get(ChannelIDwebsite).send(' Local Server uptime: ' + Math.floor((dateStarted - fetchDataJson3[0].datenow) / 1000 / (60 * 60) % 24) + ' hours ' + Math.floor((dateStarted - fetchDataJson3[0].datenow) / 1000 / 60 % 60) + ' minutes ' + Math.floor((dateStarted - fetchDataJson3[0].datenow) / 1000 % 60) + ' seconds')


        }
        jakbot.user.setUsername('J A K B O T');
    }, 100000);
});





jakbot.on('ready', jakbot => {
    jakbot.user.setActivity('Node js ', { type: 'PLAYING' });



    setInterval(() => {
        jakbot.user.setUsername('JAK-BOT uptime');
        admin.query(
            'show status LIKE "uptime%"',
            function (err, result) {
                if (err) throw err;
                let serverUptimeInMilliseconds = result[0].Value;
                serverUptimeInMilliseconds = Math.floor(serverUptimeInMilliseconds / (60 * 60 * 24)) + ' days ' + Math.floor(serverUptimeInMilliseconds / (60 * 60) % 24) + ' hours ' + Math.floor(serverUptimeInMilliseconds / 60 % 60) + ' minutes ' + Math.floor(serverUptimeInMilliseconds % 60) + ' seconds'
                jakbot.channels.cache.get(ChannelIDstatus).send('with SHOW STATUS db uptime since ' + serverUptimeInMilliseconds);
            }
        );
        jakbot.user.setUsername('J A K B O T');
    }, 650000);
    // 10 minutes in ms  600000
    setInterval(() => {
        jakbot.user.setUsername('JAK-BOT counting');
        admin.query(
            'SELECT * FROM `jakrecipes`.`allthecounts`;',
            function (err, result) {
                if (err) throw err;
                if (restart === true) {
                    jakbot.channels.cache.get(channelID).send('Node.js restarted ' + new Date(Date.now()).toISOString());

                }
                jakbot.channels.cache.get(channelID).send('Results:\n Allusers: ' + result[2].count +
                    '\n Users: ' + result[1].count +
                    '\n Recipes: ' + result[0].count +
                    '\n Reciperatings: ' + result[8].count +
                    '\n Comments: ' + result[3].count +
                    '\n Commentratings: ' + result[6].count +
                    '\n Images: ' + result[5].count);


            });
        jakbot.user.setUsername('J A K B O T');

    }, 450000);

    setInterval(() => {
        jakbot.user.setUsername('JAK-BOT new data');
        admin.query(
            'SELECT `Recipename` FROM `Recipes` group by Recipeid limit 6;',
            function (err, result) {
                if (err) throw err;
                if (restart === true) {
                    jakbot.channels.cache.get(ChannelIDrecipes).send('Node.js restarted ' + new Date(Date.now()).toISOString());

                }
                jakbot.channels.cache.get(ChannelIDrecipes).send('Our newest 3 recipes as time now ' + new Date(Date.now()).toISOString());
                for (let i = 0; i < result.length; i++) {
                    jakbot.channels.cache.get(ChannelIDrecipes).send('recipename: ' + result[i].Recipename);
                }
            });
        jakbot.user.setUsername('J A K B O T');

    }, 600000);
    setInterval(() => {
        jakbot.user.setUsername('JAK-BOT new usr');
        admin.query(
            'SELECT Useremail  FROM `Users` group by Userid limit 10;',
            function (err, result) {
                if (err) throw err;
                if (restart === true) {
                    jakbot.channels.cache.get(channelIDwelcome).send('Node.js restarted ' + new Date(Date.now()).toISOString());

                }

                jakbot.channels.cache.get(channelIDwelcome).send('Our newest users as time now ' + new Date(Date.now()).toISOString());
                for (let i = 0; i < result.length; i++) {
                    jakbot.channels.cache.get(channelIDwelcome).send('Useremail: ' + result[i].Useremail);
                }
            });
        jakbot.user.setUsername('J A K B O T');
    }, 120000);



})



