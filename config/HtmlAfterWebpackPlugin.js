
const pluginName = 'HtmlAfterWebpackPlugin';

const assetsHelp = (data) => {
  let js = [];
  const dir = {
    js: item => `<script src='${item}'></script>`
  }

  for (let jsItem of data.js) {
    js.push(dir.js(jsItem))
  }
  return { js };
}

/**
 * 1. 何时才能拦截最后生成的 swig
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
        _html = _html.replace('<!--injectjs-->', result.js.join(''));
        console.log('html--------------------',_html);
        htmlPluginData.html = _html;
      })
    })
  }
}

module.exports = HtmlAfterWebpackPlugin;