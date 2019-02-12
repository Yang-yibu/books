class IndexController {
  constructor() { }
  
  actionsIndex() {
    return async (ctx, next) => {
      ctx.body = 'hello'
    }
  }

  actionsView() {
    return async (ctx, next) => {
      ctx.body = await ctx.render('index');
    }
  }
}

module.exports = IndexController;