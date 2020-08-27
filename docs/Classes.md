# Table of contents
#[Client](#Client) - #[ShardingClient](#ShardingClient) 
-

# Classes

## Client

**Constructor**

```js

new  DanBotHosting.Client(key, client);

```

  

| Parameter | Type | Opitonal | Description |
|---|---|---|---|
| key | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)| | posts your app/bot status|
| client | [Discord.Client](https://discord.js.org/#/docs/main/stable/class/Client) | | the discord client (your discord bot instance)|
---
| **Properties** | **Methods** |
|---|--|
| [key](#key) | [post](#post) 
| [activeUsers](#activeusers) | [autopost](#autopost)
| [commandsRun](#commandsrun) | [botInfo](#botinfo)
| [baseApiUrl](#baseapiurl) | 
---

## key
```diff
- This should be kept private at all times.
```
 **`.key`**

Authorization key to create the instance.

Returns:  [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
 
 
##  activeUsers
**`.activeUsers`**

*No info found.*

Returns:  [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)<[User](https://discord.js.org/#/docs/main/stable/class/User)>
 
 
## commandsRun
**`.commandsRun`**

*No info found.*

Returns:  [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)


## baseApiUrl 
**`.baseApiUrl`** *Read-Only*

The base url used to hit the backend of the website.

Returns:  [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)


## post
**`.post()`**

Will post your bots status.

Returns:  [Promise]([https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise))<[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/boolean) | [Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)>

## autopost
**`.autopost()`**

Will post your bots status every hours automatically.

Returns:  [Promise]([https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise))<[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/boolean) | [Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)>


## botInfo
**`.botInfo()`**

client's user info.
Returns:  [Promise]([https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise))<any | [Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)>

## ShardingClient

**Constructor**
```js
new  DanBotHosting.ShardingClient(key, manager);
```
| Parameter | Type | Opitonal | Description |
|---|---|---|---|
| key | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)| | posts your app/bot status|
| manager | [Discord.ShardingManager]([https://discord.js.org/#/docs/main/stable/class/ShardingManager](https://discord.js.org/#/docs/main/stable/class/ShardingManager)) | | discord ShardingManager (your discord Manager instance)|

---

| **Properties** | **Methods** |
|---|--|
**Coming...**
---