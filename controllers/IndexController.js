class IndexController {
  constructor() { }
  
  actionsIndex() {
    return async (ctx, next) => {
      // 导致服务器内部错误
      // indexModels();

      ctx.body = 'hello'
    }
  }

  actionsView() {
    return async (ctx, next) => {
      ctx.body = await ctx.render('index', {
        data: 'hello Yn'
      });
    }
  }
}

module.exports = IndexController;