const Index = require('../models');

class IndexController {
  constructor() { }
  
  actionsIndex() {
    return async (ctx, next) => {
      // 导致服务器内部错误
      // indexModels();

      ctx.body = 'hello'
    }
  }
  // 采用此种写法也可以：index.js 
  // 路由注册中心相应更改 _.get('/', indexController.actionsIndex)
  async actionsIndex1 (ctx, next) {
    ctx.body = 'hhhhh'
  }

  actionsView() {
    return async (ctx, next) => {
      const index = new Index();
      const result = await index.getData();
      console.log('IndexController - getData: ', result);

      // SSR
      ctx.body = await ctx.render('index', {
        data: result.data
      });
    }
  }
}

module.exports = IndexController;