const fetch = require('node-fetch');
const config = require('../config');

class SafeRequest {
  constructor(url) {
    this.url = url;
    this.baseURL = config.baseURL;
  }

  fetch(opt) {
    let yFetch = fetch(this.baseURL + this.url);
    console.log('opt: ', opt);
    if (opt.params) {
      yFetch = fetch(this.baseURL + this.url, {
        method: opt.methods ,
        body: opt.params
      })
    }

    return new Promise((resolve, reject) => {
      let result = {
        code: 0, // 请求正常
        msg: '',
        data: []
      }; // node 容错

      yFetch
        .then(res => res.json())
        .then((json) => {
          console.log('Safe-suc: \n', json);
          
          result.data = json;
          resolve(result);
        }).catch(err => {
          console.log('Safe-err:\n', err);
          result.code = 1;
          result.msg = 'node-fetch 和后端通讯异常';
          reject(result);
        })
    })
  }

}

module.exports = SafeRequest;
