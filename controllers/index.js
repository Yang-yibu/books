const router = require('koa-simple-router');
const IndexController = require('./IndexController');

const indexController = new IndexController();

// 路由注册中心
module.exports = (app) => {
  app.use(router(_ => {
    // _.get('/', (ctx, next) => {
      // ctx.body = 'hello'
    // })
  
    _.get('/', indexController.actionsIndex())
    _.get('/index', indexController.actionsIndex())

    _.get('/view', indexController.actionsView())

  }))
}