'use strict';
require('dotenv').config();
const admin = require('./db/db');

const { Client, Events, GatewayIntentBits, Message, Messageembed } = require('discord.js');
const { token } = require('./config.json');
require('discord-reply');
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
jakbot.login(token);
jakbot.once(Events.ClientReady, c => {
    console.log(`Ready! Logged in as ${c.user.tag}`);

});



jakbot.on('ready', jakbot => {

    jakbot.user.setUsername('JAK-BOT running');
    jakbot.user.setActivity('Node.js', { type: 'PLAYING' });
    jakbot.channels.cache.get(channelIDstart).send('Node.js is running! at ' + new Date(Date.now()).toISOString());
});

const restart = true
const importantStuff = async (restart) => {

    jakbot.on('ready', jakbot => {



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
                            jakbot.channels.cache.get(channelID).send('Node.js restarted ' + new Date(Date.now()).toISOString());

                        }
                        jakbot.channels.cache.get(ChannelIDrecipes).send('Our newest 3 recipes as time now ' + new Date(Date.now()).toISOString());
                        for (let i = 0; i < result.length; i++) {
                            jakbot.channels.cache.get(ChannelIDrecipes).send('recipename: ' + result[i].Recipename);
                        }
                    });
                admin.query(
                    'SELECT Useremail  FROM `users` group by Userid limit 1;',
                    function (err, result) {
                        if (err) throw err;
                        if (restart === true) {
                            jakbot.channels.cache.get(channelID).send('Node.js restarted ' + new Date(Date.now()).toISOString());

                        }
                        jakbot.channels.cache.get(channelIDwelcome).send('Our newest user as time now ' + new Date(Date.now()).toISOString());
                        for (let i = 0; i < result.length; i++) {
                            jakbot.channels.cache.get(channelIDwelcome).send('Useremail: ' + result[i].Useremail);
                        }
                    });
                // if (process.env.NODE_ENV === 'production') {
                //     fetch('http://10.114.34.72/status/apachestatus')
                //         .then(res => res.json())
                //         .then(json => jakbot.channels.cache.get(ChannelIDstatus).send('Apache status: ' + json[0].status))
                //         .catch(err => console.log(err));
                //     fetch('http://10.114.34.72/status/mariadbstatus')
                //         .then(res => res.json())
                //         .then(json => jakbot.channels.cache.get(ChannelIDstatus).send('MariaDB status: ' + json[0].status))
                //         .catch(err => console.log(err));
                //     fetch('http://10.114.34.72/status/starttime')
                //         .then(res => res.json())
                //         .then(json => jakbot.channels.cache.get(ChannelIDwebsite).send('Server uptime: ' + Math.floor((dateNow - json[0].datenow) / 1000 / 60) % 60 + ' minutes ' + Math.floor((dateNow - json[0].datenow) / 1000 % 60) + ' seconds'))
                //         .catch(err => console.log(err));
                // } else {
                //     fetch('http://localhost:3000/status/apachestatus')
                //         .then(res => res.json())
                //         .then(json => jakbot.channels.cache.get(ChannelIDstatus).send('Apache status: ' + json[0].status))
                //         .catch(err => console.log(err));
                //     fetch('http://localhost:3000/status/mariadbstatus')
                //         .then(res => res.json())
                //         .then(json => jakbot.channels.cache.get(ChannelIDstatus).send('MariaDB status: ' + json[0].status))
                //         .catch(err => console.log(err));
                //     fetch('http://localhost:3000/status/starttime')
                //         .then(res => res.json())
                //         .then(json => jakbot.channels.cache.get(ChannelIDwebsite).send('Server uptime: ' + Math.floor((dateNow - json[0].datenow) / 1000 / 60) % 60 + ' minutes ' + Math.floor((dateNow - json[0].datenow) / 1000 % 60) + ' seconds'))
                //         .catch(err => console.log(err));


                // }
            });

    })
};


importantStuff(restart);
setInterval(importantStuff, 1200000);

