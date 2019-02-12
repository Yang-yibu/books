module.exports = {
  error(app) {
    app.use(async (ctx, next) => {
      await next();

      if (404 != ctx.status) {
        return;
      }

      // 设置 404 时，百度 SEO 会降权
      ctx.status = 200;
      ctx.body = '<script type="text/javascript" src="//qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js" charset="utf-8"></script>'
    })
  }
}