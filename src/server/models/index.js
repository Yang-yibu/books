/**
 * @fileoverview 实现 Index 的数据模型
 * @author Yn
 */

const SafeRequest = require('../utils/SafeRequest');

/**
 * Index 类 获取后台关于图书相关的数据类
 * @class
 */
class Index {
  /**
   * @constructor 
   * @param {string} app Koa2 执行上下文
   */
  constructor(app) {

  }

  /**
   * 获取后台全部图书的数据
   * @param {*} options 配置项
   * @example
   * return new Promise
   * getData(options)
   */
  getData(options) {
    const safeRequest = new SafeRequest('books/index');

    return safeRequest.fetch({});
  }
  
  /**
   * 把用户传过来的书名全部加入到 PHP 接口 
   * @param {*} options 参数项
   * @example
   * return new Promise
   * saveData(options)
   */
  saveData(options) {
    const safeRequest = new SafeRequest('books/create');

    return safeRequest.fetch({
      methods: 'POST',
      params: options.params
    });
  }
}

module.exports = Index;