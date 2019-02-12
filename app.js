const Koa = require('koa');
const app = new Koa();
const path = require('path');
const co = require('co');
const render = require('koa-swig');
const serve = require('koa-static');
const errorHandler = require('./middlewares/errorHandler');

app.use(serve(__dirname + '/assets'))

app.context.render = co.wrap(render({
  root: path.join(__dirname, 'views'),
  autoescape: true,
  cache: 'memory',
  ext: 'html',
  writeBody: false
}));

errorHandler.error(app);

// 注入路由机制
require('./controllers')(app);

app.listen(3000, () => {
  console.log('server running 3000');
})