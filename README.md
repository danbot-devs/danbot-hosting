# DanBotHosting API Wrapper

- Discord: https://discord.gg/rYzHH5N
- Site: https://stats.danbot.xyz

# How to get API Key

- join our Discord (link above)
- go into our [#bot-commands channel](https://discord.com/channels/639477525927690240/738532075476615288)
- type `DBH!ApiKey` and you'll get an API Key!

# Installation

**Node.js 12.0.0 or newer is required.**  
Ignore any warnings about unmet peer dependencies, as they're all optional.

npm: `npm i danbot-hosting`

yarn: `yarn add danbot-hosting`


# Examples

**Most Needs async:**

Creating Client:
_no-sharding_

```javascript
const Discord = require("discord.js");
let client = new Discord.Client();

var DanBotHosting = require("danbot-hosting");

client.on("ready", async () => {
  console.log("bot is now ready");
  const API = new DanBotHosting.Client("danbot-KEY", client);

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

**get bot info**
- only for the client, you are logged in as

```javascript
 let res = await API.botInfo()
 console.log(res)
```

## Contributors

 TheTeaCup - [GitHub](https://github.com/TheTeaCup)
 Wilbert-mad - [GitHub](https://github.com/Wilbert-mad)

 