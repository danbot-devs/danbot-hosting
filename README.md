# DanBotHosting API Wrapper

- Discord: https://discord.gg/rYzHH5N
- Site: https://stats.danbot.xyz

# How to get API Key

- join our Discord (link above)
- go into our #bot-commands channel
- type `DBH!ApiKey` and you'll get an API Key!

# Examples

**Most Needs async:**

Creating Client:
_no-sharding_

```javascript
const Discord = require("discord.js");
let client = new Discord.Client();

var DanBotHosting = require("danbot-hosting");

client.on("ready", async () => {
const API = new DanBotHosting.Client("danbot-KEY", client);
  console.log("bot is now ready");

  // Start posting
  let initalPost = await API.autopost();

  if (initalPost) {
    console.error(initalPost); // console the error
  }
});
```

**sharding**

```javascript
const Discord = require("discord.js");
let client = new Discord.Client();

var DanBotHosting = require("danbot-hosting");
const manager = new Discord.ShardingManager("./bot.js", { token: "TOKEN" });
const API = new DanBotHosting.ShardingClient("danbot-KEY", manager);
```
