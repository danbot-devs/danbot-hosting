'use strict';

module.exports = {
  Client: require('./DanBot'),
  ShardClient: require('./DanBotShards.js'),
  Version: require('../package.json').version,
}
