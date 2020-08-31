'use strict';

const fetch = require('node-fetch');
const { EventEmitter } = require('events');
const discord = require('discord.js');

/**
 * @class ShardingClient
 */
class ShardingClient extends EventEmitter {
  /**
   * shards
   * @param {string} key - your api key prefix by "danbot-""
   * @param {*} client - your discord.js client object
   */
  constructor(key, manager) {
    super();
    
    // Key error handling
    if (!key) throw new Error('"key" is missing or undefined');
    if (typeof key !== "string")
      throw new TypeError('"key" is not typeof string');
    if (!key.startsWith("danbot-"))
      throw new Error('"key" is not prefixed by "danbot-", please follow the key format');
    // Manager error handling
    if (!manager) throw new Error('"manager" is missing or undefined');
    if (!(manager instanceof discord.ShardingManager))
      throw new TypeError('"manager" is not a discord.js sharding manager');

    // API config
    this.baseApiUrl = 'https://danbot.host/api';
    this.key = key;
    this.manager = manager;

    // General config
    this.DJS12 = (discord.version.split('.')[0] === '12' ? 'v12' : 'v11') === 'v12';
    this.activeUsers = [];
    this.commandsRun = 0;

    // Check if all shards have been spawned
    this.manager.on("shardCreate", shard => {
      // Get current shard
      const currShard = this.manager.shards.get(shard.id);

      // If this is the last shard, wait until it is ready
      if (shard.id + 1 == this.manager.totalShards) {
        // When ready start auto post
        currShard.once("ready", () => {
          setTimeout(() => {
            const time = new Date();
            this.emit('autoPost', time);

            setInterval(async () => {
              await this.post();
            }, 60000);
          }, 200);
        });
      }

      // Start message listener
      currShard.on("message", async message => {
        // If there is no message or it isn't a string (ignore broadcastEvals)
        if (!message || typeof message !== "string") return;

        // Check if they are statcord messages
        if (!message.startsWith("ssc")) return;
        const args = message.split("|=-ssc-=|"); // get the args

        if (args[0] == "sscpc") return;
        else if (args[0] == "sscp") {
          // Post message
          const post = await this.post();
          if (post) console.error(new Error(post));
        }
      });
    });
  }

  /**
   * Manual posting
   * @private
   * @returns {Promise<Object>} returns false if there was no error, returns an error if there was.
   */
  async post() {
    // counts
    let guild_count = 0;
    let user_count = 0;

    // catch an error like invaled discord version
    try {
      // V12 code 
      if (DJS12) {
        guild_count = await getGuildCountV12(this.manager);
        user_count = await getUserCountV12(this.manager);
      } else {
        // V11 code
        guild_count = await getGuildCountV11(this.manager);
        user_count = await getUserCountV11(this.manager);
      }
    } catch (err) {
      throw new Error('discord.js version must be v12 or v11.');
    }

    // Get client id
    let id = (await this.manager.broadcastEval("this.user.id"))[0];
    // Get client info
    let info = (await this.manager.broadcastEval("this.user"))[0];

    // Post data
    let requestBody = {
      id, // Client id
      key: this.key, // API key
      servers: guild_count.toString(), // Server count
      users: user_count.toString(), // User count
      clientInfo: info
      //    active: this.activeUsers.length.toString(), // Users that have run commands since the last post
      //   commands: this.commandsRun.toString(), // The how many commands have been run total
    };

    // Reset stats
    this.activeUsers = [];
    this.commandsRun = 0;
    this.popularCommands = [];

    // Create post request
    const response = await fetch(`${this.baseApiUrl}/bot/${id}/stats`, {
      method: "post",
      body: JSON.stringify(requestBody),
      headers: { "Content-Type": "application/json" }
    });

    const req = new Promise(async(resolve, reject) => {
      try {
        // Statcord server side errors
        if (response.status >= 500)
          throw new Error(`DanBotHosting - server error, statuscode: ${response.status}`);
    
        // Get body as JSON
         const responseData = await response.json();
    
        // Check response for errors
        if (response.status == 200) {
          // Success
          const time = new Date();
          this.emit('post', (time));
          if (!responseData.error) {
            resolve();
          }
        } else if (response.status == 400) {
          // Bad request
          if (responseData.error)
            throw new Error(responseData.message)
        } else if (response.status == 429) {
          // Rate limit hit
          if (responseData.error)
            throw new Error(responseData.message)
        } else {
          // Other
            throw new Error('An unknown error has occurred')
        }
      } catch (err) {
        reject(err);
      }

    });
    return req;
  }
}

// V12 sharding gets
async function getGuildCountV12(manager) {
  return (await manager.fetchClientValues("guilds.cache.size"))
    .reduce((prev, current) => prev + current, 0);
}

async function getUserCountV12(manager) {
  const memberNum = await manager.broadcastEval(
    "this.guilds.cache.reduce((prev, guild) => prev + guild.memberCount, 0)"
  );
  return memberNum.reduce((prev, memberCount) => prev + memberCount, 0);
}
// end

// v11 sharding gets
async function getGuildCountV11(manager) {
  return (await manager.fetchClientValues("guilds.size"))
    .reduce((prev, current) => prev + current, 0);
}

async function getUserCountV11(manager) {
  return (await manager.fetchClientValues("users.size"))
    .reduce((prev, current) => prev + current, 0);
}
//end

module.exports = ShardingClient;
