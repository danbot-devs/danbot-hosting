# DanBotHosting API Wrapper

- Discord: https://discord.gg/DBH
- Site: https://danbot.host

# How to get API Key

- Join our Discord server (link above).
- Go into our `#bot-commands` channel.
- Type `DBH!ApiKey` and the bot will send your API Key in your DM's.

# Examples

**Most Needs async:**

Creating Client:
_no-sharding_

```javascript
const Discord = require("discord.js");
const client = new Discord.Client();

const DanBotHosting = require("danbot-hosting");

client.once("ready", async () => {
  console.log(`Logged in as ${client.user.tag}`);
  const API = new DanBotHosting.Client("danbot-API-KEY", client);

  // Start posting
  let initalPost = await API.autopost();

  if (initalPost) {
    console.error(initalPost); // console the error
  }
});
```

**sharding**

```javascript
const { ShardingManager } = require("discord.js");

const DanBotHosting = require("danbot-hosting");
const manager = new ShardingManager("./bot.js", { token: "your-bot-token-here" });
const API = new DanBotHosting.ShardingClient("danbot-API-KEY", manager);

manager.spawn();
manager.on('shardCreate', shard => console.log(`Shard #${shard.id} is online`));
```

**get bot info**
- only for the client you are logged in as

```javascript
 let res = await API.botInfo()
 console.log(res)
```
