const Index = require('../models');
const {
  url
} = require('url');

class IndexController {
  constructor() {}

  actionsIndex() {
    return async (ctx, next) => {
      // 导致服务器内部错误
      // indexModels();

      ctx.body = 'hello'
    }
  }
  // 采用此种写法也可以：index.js 
  // 路由注册中心相应更改 _.get('/', indexController.actionsIndex)
  async actionsIndex1(ctx, next) {
    ctx.body = 'hhhhh'
  }

  actionsList() {
    return async (ctx, next) => {
      const index = new Index();
      const result = await index.getData();
      console.log('IndexController - getData: ', result);

      // SSR
      ctx.body = await ctx.render('index', {
        data: result.data,
        title: '新闻列表'
      });
    }
  }
  actionsAdd() {

    // 只吐个壳 交给 Vue 渲染
    return async (ctx, next) => {
      ctx.body = await ctx.render('add')
    }
  }
  actionsSave() {
    return async (ctx, next) => {
      const index = new Index();
      const params = new URLSearchParams();

      params.append('Books[name]', '测试');
      params.append('Books[author]', '测试作者');

      const result = await index.saveData({
        params
      });
      ctx.body = result;
    }
  }
}

module.exports = IndexController;