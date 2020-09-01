'use strict';

const fetch = require('node-fetch');
const { EventEmitter } = require('events');
const discord = require('discord.js');


/**
 * @class DanBotHosting
 */
class DanBot extends EventEmitter {
  /**
   * no shards
   * @param {string} key - your api key prefix by "danbot-""
   * @param {*} client - your discord.js client object
   */
  constructor(key, client) {
    super();
    // Key error handling
    if (!key) throw new Error('"key" is missing or undefined');
    if (typeof key !== "string")
      throw new TypeError('"key" is not typeof string');
    if (!key.startsWith("danbot-"))
      throw new Error('"key" is not prefixed by "danbot-", please follow the key format');
    // Client error handling
    if (!client) throw new Error('"client" is missing or undefined');
    if (!(client instanceof discord.Client || client instanceof Object)) 
      throw new TypeError('"client" must be of type discord client or Object');

    // API config
    this.baseApiUrl = 'https://danbot.host/api';
    this.key = key;
    this.client = client;

    // General config
    this.DJS12 = (discord.version.split('.')[0] === '12' ? 'v12' : 'v11') === 'v12';
    this.activeUsers = [];
    this.commandsRun = 0;

    // Check for sharding
    if (this.client.shard) {
      /** @private */
      this._sharding = true;

      throw new Error('Please use the sharding client if you wish to use shards');
    } else this._sharding = false;
  }

  async post() {
    // Non-Sharding client
    if (this._sharding)
      return new Error('Please use the statcord sharding client if you wish to use shards');

    // counts
    let guild_count = 0;
    let user_count = 0;

    // get guilds & users
    guild_count = this.DJS12 ? this.client.guilds.cache.size : this.client.guilds.size;
    user_count = this.DJS12 ? this.client.users.cache.size : this.client.users.size;

    // Post data
    let requestBody = {
      id: this.client.user.id, // Client id
      key: this.key, // API key
      servers: guild_count.toString(), // Server count
      users: user_count.toString(), // User count
      clientInfo: this.client.user
      //   active: this.activeUsers.length.toString(), // Users that have run commands since the last post
      //  commands: this.commandsRun.toString(), // The how many commands have been run total
    };

    // Reset stats
    this.activeUsers = [];
    this.commandsRun = 0;

    // Create post request
    const response = await fetch(`${this.baseApiUrl}/bot/${this.client.user.id}/stats`, {
      method: "post",
      body: JSON.stringify(requestBody),
      headers: { "Content-Type": "application/json" }
    });

    const res = new Promise(async (resolve, rejection) => {
      try {
        // Server error
        if (response.status >= 500)
          throw new Error(`DanBot Hosting server error, statuscode: ${response.status}`);

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
          // return Promise.resolve(false);
        } else if (response.status == 400) {
          // Bad request
          if (responseData.error)
            throw new Error(responseData.message)
          // return Promise.resolve(new Error(responseData.message));
        } else if (response.status == 429) {
          // Rate limit hit
          if (responseData.error)
            throw new Error(responseData.message)
          // return Promise.resolve(new Error(responseData.message));
        } else {
          // Other
          throw new Error("An unknown error has occurred")
          // return Promise.resolve(new Error("An unknown error has occurred"));
        }
      } catch (err) {
        rejection(err);
      }
    });
    return res;
  }

  /**
   * Auto posting
   * @returns {Promise<void>} returns false if there was no error, returns an error if there was. Only on the first run, otherwise the rest will be ignored
   */
  async autopost() {
    // Non-Sharding client
    if (this._sharding)
      throw new Error('Please use the sharding client if you wish to use shards');
    // create time stamp

    const time = new Date();
    this.emit('autoPost', (time));
    // emit the 'autopost' event 
    let post;
    try {
      // post = await this.post(); // Create first post
      // // set interval to post every hour
      // setInterval(async () => {
      //   await this.post(); // post once every hour
      // }, 60000);
    } catch (err) {
      return Promise.reject(new Error(err));
    }

    // resolve with initial errors
    return Promise.resolve(post);
  }

  /**
   * @returns {Promise<object>} 
   */
  async botInfo() {
    // Create post request
    const response = await fetch(`${this.baseApiUrl}/bot/${this.client.user.id}/info`, {
      method: "get",
      headers: { "Content-Type": "application/json" }
    });

    const req = new Promise(async (resolve, reject) => {
      try {
        // Server error
        if (response.status >= 500)
          throw new Error(`DanBot Hosting server error, statuscode: ${response.status}`);

        // Get body as JSON
        let responseData = await response.json();

        // Check response for errors
        if (response.status == 200) {
          // Success
          resolve(responseData);
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
          throw new Error("An unknown error has occurred")
        }
      } catch (err) {
        reject(err)
      }
    });
    return req;
  }
}
// V12 sharding gets
async function getGuildCountV12(client) {
  return (await client.shard.fetchClientValues("guilds.cache.size"))
    .reduce((prev, current) => prev + current, 0);
}

async function getUserCountV12(client) {
  return (await client.shard.fetchClientValues("users.cache.size"))
    .reduce((prev, current) => prev + current, 0);
}
// end

// v11 sharding gets
async function getGuildCountV11(client) {
  return (await client.shard.fetchClientValues("guilds.size"))
    .reduce((prev, current) => prev + current, 0);
}

async function getUserCountV11(client) {
  return (await client.shard.fetchClientValues("users.size"))
    .reduce((prev, current) => prev + current, 0);
}
//end

module.exports = DanBot;
