'use strict';

module.exports = {
  Client: require('./DanBot'),
  ShardingClient: require('./DanBotShards.js'),
  Version: require('../package.json').version,
}
