/**
 * @fileoverview 实现 Index 的数据模型
 * @author Yn
 */

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
    return {};
  }
}

module.exports = Index;