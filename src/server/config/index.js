// const { join } = require('path');
// const _ = require('lodash');

import { join } from  'path';
import _ from 'lodash';
// import { extend } from 'lodash-es';

let config = {
  "viewDir": join(__dirname, "..", "views"),
  "staticDir": join(__dirname, "..", "assets")
}

// 会被清洗掉
if (false) {
  var a = 1;
}

// 会被清洗 测试
if (process.env.NODE_ENV == "development") {
  const localConfig = {
    baseURL: 'http://localhost:8080/web/index.php?r=',
    port: 3000,
    cacheModel: false,
  }
  config = _.extend(config, localConfig);
}

if (process.env.NODE_ENV == "production") {
  const prodConfig = {
    baseURL: '',
    port: 8081,
    cacheModel: 'memory'
  }
  config = _.extend(config, prodConfig);
}

module.exports = config;