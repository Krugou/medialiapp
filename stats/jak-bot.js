import "dotenv/config";
import fetch from 'node-fetch';
import mysql from 'mysql2'
import { Client, Events, GatewayIntentBits } from 'discord.js';
import "discord-reply"
const dateStarted = Date.now();
let dbStarted
const jakbot = new Client({ intents: [GatewayIntentBits.Guilds] });
const dateNow = Date.now();
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



    jakbot.channels.cache.get(channelIDstart).send('Node.js is running! at ' + new Date(Date.now()).toISOString());
});

const restart = true
const websiteHealth = async () => {
    jakbot.on('ready', async jakbot => {
        if (process.env.NODE_ENV === 'production') {
            const response1 = await fetch('http://10.114.34.72/jak/status/apachestatus')
            const fetchDataJson1 = await response1.json()
            jakbot.channels.cache.get(ChannelIDstatus).send('Apache status: ' + fetchDataJson1[0].status);
            const response2 = await fetch('http://10.114.34.72/jak/status/mariadbstatus')
            const fetchDataJson2 = await response2.json()
            jakbot.channels.cache.get(ChannelIDstatus).send('MariaDB status: ' + fetchDataJson2[0].status);
            const response3 = await fetch('http://10.114.34.72/jak/status/starttime')
            const fetchDataJson3 = await response3.json()
            jakbot.channels.cache.get(ChannelIDwebsite).send('Server uptime: ' + Math.floor((dateNow - fetchDataJson3[0].datenow) / 1000 / 60) % 60 + ' minutes ' + Math.floor((dateNow - fetchDataJson3[0].datenow) / 1000 % 60) + ' seconds')
        } else {

            const response1 = await fetch('http://localhost:3000/status/apachestatus')
            const fetchDataJson1 = await response1.json()
            jakbot.channels.cache.get(ChannelIDstatus).send(' Local Apache status: ' + fetchDataJson1[0].status)
            const response2 = await fetch('http://localhost:3000/status/mariadbstatus')
            const fetchDataJson2 = await response2.json()
            jakbot.channels.cache.get(ChannelIDstatus).send(' Local MariaDB status: ' + fetchDataJson2[0].status)
            const response3 = await fetch('http://localhost:3000/status/starttime')
            const fetchDataJson3 = await response3.json()
            jakbot.channels.cache.get(ChannelIDwebsite).send(' Local Server uptime: ' + Math.floor((dateNow - fetchDataJson3[0].datenow) / 1000 / 60) % 60 + ' minutes ' + Math.floor((dateNow - fetchDataJson3[0].datenow) / 1000 % 60) + ' seconds')


        }
    });
}




const importantStuff = async (restart) => {

    jakbot.on('ready', jakbot => {
        jakbot.user.setUsername('JAK-BOT running');
        jakbot.user.setActivity('Node.js', { type: 'PLAYING' });


        admin.query(
            'show status LIKE "uptime%"',
            function (err, result) {
                if (err) throw err;
                dbStarted = dateNow - result[0].Value;
                dbStarted = new Date(dbStarted).toISOString();
                jakbot.channels.cache.get(ChannelIDstatus).send('with SHOW STATUS db uptime since ' + dbStarted);
            }
        );
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



                admin.query(
                    'SELECT `Recipename` FROM `Recipes` group by Recipeid limit 3;',
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
                admin.query(
                    'SELECT Useremail  FROM `Users` group by Userid limit 1;',
                    function (err, result) {
                        if (err) throw err;
                        if (restart === true) {
                            jakbot.channels.cache.get(channelIDwelcome).send('Node.js restarted ' + new Date(Date.now()).toISOString());

                        }
                        jakbot.channels.cache.get(channelIDwelcome).send('Our newest user as time now ' + new Date(Date.now()).toISOString());
                        for (let i = 0; i < result.length; i++) {
                            jakbot.channels.cache.get(channelIDwelcome).send('Useremail: ' + result[i].Useremail);
                        }
                    });

            });
        jakbot.user.setUsername('JAK-BOT on break');
        console.log('JAK-BOT cycle done');
    })
};


importantStuff(restart);
websiteHealth();
setInterval(importantStuff, 1200000); //
setInterval(websiteHealth, 600000); // 10 minutes

