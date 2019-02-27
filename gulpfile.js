const gulp = require('gulp');
const babel = require('gulp-babel');
const watch = require('gulp-watch'); // 检测文件变化
const rollup = require('gulp-rollup'); // 流清晰
const replace = require('rollup-plugin-replace')

let entry = './src/server/**/*.js';

// 开发环境
function buildDev() {
  return watch(entry, {
    ignoreInitial: false
  }, function () {
    gulp.src(entry)
      .pipe(babel({
        babelrc: false, // 使项目中的 babelrc 文件不生效
        plugins: ["transform-es2015-modules-commonjs"] // 把 Module 转化为 require
      }))
      .pipe(gulp.dest('dist'))
  })
}

// 上线环境
function buildProd() {
  return gulp.src(entry)
    .pipe(babel({
      babelrc: false, // 使项目中的 babelrc 文件不生效
      ignore: ['./src/server/config/*.js'], // 这个交给后端处理，此处
      plugins: ["transform-es2015-modules-commonjs"] // 把 Module 转化为 require
    }))
    .pipe(gulp.dest('dist'))
}

// 代码检查
function buildLint() {

}

// 清洗环境
function buildConfig() {
  return gulp.src(entry)
    .pipe(rollup({
      output: {
        format: 'cjs'
      },
      plugins: [
        replace({
          ENVIRONMENT: JSON.stringify('production')
        })
      ],
      input: './src/server/config/index.js',
    }))
    .pipe(gulp.dest('dist'))
}

// development
if (process.env.NODE_ENV === 'dev') {

}
let build = gulp.series(buildDev, buildConfig);

// production
if (process.env.NODE_ENV === 'prod') {
  // 上线的时候可能：buildLint, buildProd, buildConfig
  // 保证线上代码质量
  build = gulp.series(buildProd, buildConfig);
}
if (process.env.NODE_ENV === 'lint') {
  build = gulp.series(buildLint);
}

gulp.task('default', build)