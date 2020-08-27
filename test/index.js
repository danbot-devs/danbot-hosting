const auth = require('./auth.js');
const Discord = require('discord.js');
const DanBotHosting = require('../src');
const client = new Discord.Client();

client.on("ready", async () => {
  console.log("bot is now ready");
  const API = new DanBotHosting.Client("danbot-KEY", client);

  // Start posting
  let initalPost = await API.autopost();

  if (initalPost) {
    console.error(initalPost); // console the error
  }
});

client.login(auth.key);