const router = require('koa-simple-router');
const IndexController = require('./IndexController');
const TestController = require('./TestController');

const indexController = new IndexController();
const testController = new TestController;

// 路由注册中心
module.exports = (app) => {
  app.use(router(_ => {
    // _.get('/', (ctx, next) => {
      // ctx.body = 'hello'
    // })

    _.get('/', indexController.actionsIndex())
    _.get('/index.html', indexController.actionsIndex()); // 伪静态页面
    _.get('/test', testController.actionsIndex());

    _.get('/list', indexController.actionsList());
    _.get('/add', indexController.actionsAdd());

  }))
}