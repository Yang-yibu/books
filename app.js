const Koa = require('koa');
const app = new Koa();
const path = require('path');
const co = require('co');
const render = require('koa-swig');
const serve = require('koa-static');
const errorHandler = require('./middlewares/errorHandler');
const log4js = require('log4js');

app.use(serve(__dirname + '/assets'))

app.context.render = co.wrap(render({
  root: path.join(__dirname, 'views'),
  autoescape: true,
  cache: 'memory',
  ext: 'html',
  writeBody: false
}));

// 逻辑和业务错误 http 日志
log4js.configure({
  appenders: { cheese: { type: 'file', filename: __dirname + '/logs/book.log' } },
  categories: { default: { appenders: ['cheese'], level: 'error' } }
})
const logger = log4js.getLogger();
errorHandler.error(app, logger);

// 注入路由机制
require('./controllers')(app);

app.listen(3000, () => {
  console.log('server running 3000');
})
