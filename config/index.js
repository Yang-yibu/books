const { join } = require('path');

const _ = require('lodash');

let config = {
  "viewDir": join(__dirname, "..", "views"),
  "staticDir": join(__dirname, "..", "assets")
}

if (process.env.NODE_ENV == "development") {
  const localConfig = {
    baseURL: 'http://localhost:8080/web/index.php?r=',
    port: 3000
  }
  config = _.extend(config, localConfig);
}

if (process.env.NODE_ENV == "production") {
  const prodConfig = {
    baseURL: '',
    port: 8081
  }
  config = _.extend(config, prodConfig);
}

module.exports = config;