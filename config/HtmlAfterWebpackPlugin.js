
const pluginName = 'HtmlAfterWebpackPlugin';

const assetsHelp = (data) => {
  let js = [], css = [];
  const dir = {
    js: item => `<script src='${item}'></script>`,
    css: item => `<link rel="stylesheet" href='${item}'>`
  }

  for (let jsItem of data.js) {
    js.push(dir.js(jsItem))
  }
  for (let cssItem of data.css) {
    css.push(dir.css(cssItem))
  }
  return { js, css };
}

/**
 * 1. 何时才能拦截最后生成的 swig(html)
 * 2. 如何分清这个 swig 文件对应的 JS 和 CSS
 */
class HtmlAfterWebpackPlugin {
  // compiler: webpack 实例 官网例子
  // apply(compiler) {
  //   compiler.hooks.run.tap(pluginName, compilation => {
  //     console.log('开始构建----------------------------------');
  //   })
  // }

  apply(compiler) {
    compiler.hooks.compilation.tap(pluginName, compilation => {
      // console.log('开始 ------------------');
      compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tap(pluginName, htmlPluginData => {
        // console.log('开始 1 -----------------------------');
        // console.log('htmlPluginData ---------------------');
        // console.log(htmlPluginData);
        let _html = htmlPluginData.html;
        const result = assetsHelp(htmlPluginData.assets);
        
        // 配置资源别名
        _html = _html.replace(/pages:/g, '../../');
        _html = _html.replace(/components:/g, '../../../components/');
        
        // 注入静态资源
        _html = _html.replace('<!--injectjs-->', result.js.join(''));
        // _html = _html.replace('<!--injectcss-->', result.css.join(''));
        htmlPluginData.html = _html;
      })
    })
  }
}

module.exports = HtmlAfterWebpackPlugin;