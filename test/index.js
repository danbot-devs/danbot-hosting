const auth = require('./auth.js');
const Discord = require('discord.js');
const DanBotHosting = require('../');
const client = new Discord.Client();

// const time = (new Date()).toLocaleString();
// console.log(time);

// API.on('ready', () => console.log('ready'));

client.on('ready', async () => {
  const API = new DanBotHosting.Client(auth.key, client);
  console.log('bot is now ready');
  await API.autopost().catch(console.log);
  // console.log(await API.botInfo());
  // error with start post
  API.on('autoPost', (time) => console.log(`started ${time}`));
  // works
  API.on('post', (time) => console.log(`posted ${time}`));
  // Start posting
  // const res = await API.botInfo();
  // console.log(res)
});


// client.on('message', async(message) => {
//   if (message.author.bot) return;

//   const messageArray = message.content.split(' ');
//   const command = messageArray[1];
//   const args = messageArray.slice(1);

//   switch (command) {
//     case 'ping': {
//       await message.channel.send('pong');
//       break;
//     }
//   };
// });

client.login(auth.token);