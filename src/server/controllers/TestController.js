class IndexController {
  constructor() { }
  
  actionsIndex() {
    return async (ctx, next) => {
      ctx.body = {
        data: 'Hello Test Controller',
        msg: 'ok',
        code: 200
      }
    }
  }
}

module.exports = IndexController