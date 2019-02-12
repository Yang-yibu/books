启动文件在 node 中叫 bin

## 目录结构

移植 Yii 项目架构

```bash
# 目录结构

\---assets
    \--- scripts
    \--- styles
+---bin
+---config
+---controllers
+---middlewares
+---models
+---tests
+---views
+---web
\---widgets
    \---news

```

````bash
# 组件
widgets -> components

# 页面
views

```

## 启动

```bash
npm init -y


```

## 其他

```bash
npm run env # 读取系统配置所有信息

# package.json scripts: {"qq": "echo $npm_package_name"}
$ npm run qq
> yd-books@1.0.0 qq D:\yaning\learnCode\yideng_project\yd-books
> echo $npm_package_name

$npm_package_name # 在 window 平台上输出不了名字

# 为了区别当前环境
# scripts: { "dev": "cross-env" } npm install cross-env --save 安装
cross-env NODE_ENV=development # 设置环境变量； 做 node 流式清洗判断环境； NODE_ENV 后 '=' 两边有空格时，报错：NODE_ENV 不是内部外部变量
  process.env.NODE_ENV # 取值
cross-var # 
```

[第二周实战 43:43]
csr + node
> csr: .html + 一些 js

前端路由是假路由

npm: koa2-connect-history-api-fallback
> 将接到的路由返回给前端

ssr: 后端的数据直接吐到页面中

nodejs 容错

