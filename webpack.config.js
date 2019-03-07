const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const argv = require('yargs-parser')(process.argv.slice(2));
console.log('argv: ', argv);
console.log(process.argv);

const _mode = argv.mode || 'development';
console.log('用户得到的模式：', _mode);

const _mergeConfig = require(`./config/webpack.${_mode}.js`);
const merge = require('webpack-merge');

const glob = require('glob');
const files = glob.sync('./src/web/views/**/*.entry.js');
const HtmlAfterWebpackPlugin = require('./config/HtmlAfterWebpackPlugin');

// console.log('files: \n', files);
// [ './src/web/views/books/books-add.entry.js',
  // './src/web/views/books/books-list.entry.js'
// ] ==>
// {
    // "books-add": "./src/web/views/books/books-add.entry.js",
    // "books-list": './src/web/views/books/books-list.entry.js'
// }

let _entry = {};
let _plugins = [];
for (let item of files) {
  // console.log('item: ', item);
  // 使用 path 模块解析路径，再截掉 .entry.js
  // console.log(path.parse(item));

  if ( /.+\/([a-zA-Z]+-[a-zA-Z]+)(\.entry\.js)$/g.test(item) == true ) {
    const entryKey = RegExp.$1;
    _entry[entryKey] = item;

    const [ dist, template ] = entryKey.split('-');
    _plugins.push(new HtmlWebpackPlugin({
      filename: `../views/${dist}/pages/${template}.html`, // 指定输出文件的路径及名字
      template: `src/web/views/${dist}/pages/${template}.html`,
      inject: false
    }))
  }
}
// console.log(_entry);
// console.log(_plugins);
let webpackConfig = {
  entry: _entry,
  output: {
    path: path.join(__dirname, './dist/assets'),
    publicPath: '/',
    filename: 'scripts/[name].bundle.js' // 输出的文件名
  },
  plugins: [
    ..._plugins,
    new HtmlAfterWebpackPlugin(),
  ]
}

// 将内外的 webpack 配置合并在一起
module.exports = merge(webpackConfig, _mergeConfig);