const Koa = require('koa');
const app = new Koa();
const path = require('path');
const co = require('co'); // 处理 Generator (yield)函数 成 async
const render = require('koa-swig'); // 模板引擎
const serve = require('koa-static'); // 静态资源中间件
const log4js = require('log4js'); // 日志
const errorHandler = require('./middlewares/errorHandler');
const config = require('./config/index');

// 静态资源中间件
// app.use(serve(__dirname + '/assets'))
app.use(serve(config.staticDir))

app.context.render = co.wrap(render({
  // root: path.join(__dirname, 'views'),
  root: path.join(config.viewDir),
  autoescape: true,
  cache: config.cacheModel, // swig 高效：会在一段时间内缓存模板
  ext: 'html',
  varControls: ["[[", "]]"], // 自定义模板语法标记
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

app.listen(config.port, () => {
  console.log('server running 3000');
})
