![30](https://192.168.47.104:8443/images/webpack_best_practice/30.png)

# webpack 最佳实践

> 转载于：微医大前端技术公众号
> 
> 文章链接：[原文](https://mp.weixin.qq.com/s/xNGQSW4CUn-neIUpiEkdXA)


> 陆阳阳，微医前端技术部前端开发工程师，做一条安静的咸鱼。

## 前言

本文讲述的最佳实践是从日常业务中总结而出的，不一定适合所有项目。毕竟每个公司或个人的项目不同，最佳实践也会有所不同。但是可以从这篇文章借鉴吸收一点有用的东西，有问题的地方也欢迎大家积极`吐槽指正`。

为了避免出现 `我这明明可以，你那怎么不行` 的尴尬情况，这里列一下文章涉及到依赖的版本号。

```
├── webpack           5.39.1
├── webpack-cli       4.7.2
├── node              12.8.0
├── npm               6.10.2
```

## 正文

### 初始化项目

```shell
mkdir test-app && cd test-app
npm init
```

首先添加一个入口文件 `/src/index.js` 和 webpack 配置文件 `webpack.config.js`，现在我们的目录结构如下

```
test-app
    ├── src
    |    └── index.js
    ├── package.json
    ├── webpack.config.js
```

安装 webpack

```shell
npm install webpack webpack-cli -D
```

### 开始搞事情

在 `src/index.js` 中随便写点东西

```javascript
class Test {
    constructor() {
        document.writeTest('hello world')
    }
}

new Test()
```

先来打个包看看啥效果， 执行命令 `npx webpack`

![640](https://192.168.47.104:8443/images/webpack_best_practice/1.png)

等待一段时间后，看到目录有了变化, 新增了一个 `dist` 目录，该目录下有一个 `main.js` 文件

```
test-app
  + ├── dist
  + |    └── main.js
    ├── src
    |    └── index.js
    ├── package.json
    ├── webpack.config.js
```

让我们来看看 `main.js` 里有点啥

```javascript
new class{constructor(){document.writeTest("hello world")}};
```

这玩意都不用试，肯定不得行啊，得将 js 代码转成 es5 才行。首先安装下`babel-loader`及几个相关的依赖

#### 配置 babel

- babel-loader
- @babel/core
- @babel/preset-env
- @babel/plugin-transform-runtime
- @babel/plugin-proposal-decorators
- @babel/plugin-proposal-class-properties
- @babel/plugin-proposal-private-methods
- @babel/runtime
- @babel/runtime-corejs3

```shell
npm install babel-loader @babel/core @babel/preset-env @babel/plugin-transform-runtime  @babel/plugin-proposal-decorators  @babel/plugin-proposal-class-properties @babel/plugin-proposal-private-methods -D
npm install @babel/runtime @babel/runtime-corejs3 -s
```

修改 `webpack.config.js` 文件， 添加 `babel-loader` 配置

```javascript
const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.[contenthash:8].js',
    },
    module: {
        rules: [
            {
                test: /\.(jsx|js)$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
        ]
    }
}
```

根目录下添加相应的 `.babelrc` 配置文件

```json
{
    "presets": ["@babel/preset-env"],
    "plugins": [
        ["@babel/plugin-transform-runtime", {"corejs": 3}],
        ["@babel/plugin-proposal-decorators", { "legacy": true }],
        ["@babel/plugin-proposal-class-properties", { "loose": true }],
        ["@babel/plugin-proposal-private-methods", { "loose": true }]
    ]
}
```

再次执行命令 `npx webpack` 来打个包。完成后查看目录结构

```
test-app
    ├── dist
  + |    ├── bundle.b8ba1739.js
    |    ├── main.js
    ├── src
    |    └── index.js
  + ├── .babelrc
    ├── package.json
    ├── webpack.config.js
```

查看构建后的 `bundle.b8ba1739.js` 文件

```javascript
(()=>{"use strict";new function n(){!function(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}(this,n),document.writeTest("hello world")}})();
```

构建产物看着没什么问题了，接下来看下在浏览器中的实际效果。要看效果，肯定离不开 `html` 文件。

#### 浏览器中观看效果

作为一个伸手党直接从社区嫖来一个插件 `html-webpack-plugin`，这个插件的作用是将打包产物引入到我们提前准备好的模板 `.html` 文件中，我们访问这个文件就能直观的看到效果了

先来安装下插件

```shell
npm install html-webpack-plugin -D
```

接着创建一个 `public` 目录， 用来存放静态资源。新增一个 `index.html` 模板，放在 public 目录下

```
test-app
    ├── dist
    |    ├── bundle.b8ba1739.js
    |    ├── main.js
    ├── src
    |    └── index.js
  + ├── public
  + |    └── index.html
    ├── .babelrc
    ├── package.json
    ├── webpack.config.js
```

在 `webpack.config.js` 中配置 `html-webpack-plugin`

```javascript
// 省略 ...
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // 省略 ...
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './public/index.html'),
            inject: 'body',
            scriptLoading: 'blocking',
        }),
    ]
}
```

再次执行命令 `npx webpack` 来打个包。打完包发现 `dist` 目录下多了一个 `index.html` 文件。浏览器中打开 `index.html` 看看对不对

![2](https://192.168.47.104:8443/images/webpack_best_practice/2.png)

作为一个 api 工程师，连 api 都能记错。

![3](https://192.168.47.104:8443/images/webpack_best_practice/3.png)

修改下 `src/index.js` 代码

```javascript
class Test {
    constructor() {
        document.write('hello world')
    }
}

new Test()
```

再次执行命令 `npx webpack` 来打个包。老步骤，先检查下打包产物对不对

```
test-app
    ├── dist
    |    ├── bundle.b8ba1739.js
 +  |    ├── bundle.dc044571.js
    |    ├── index.html
    |    ├── main.js
    ├── src
    |    └── index.js
    ├── public
    |    └── index.html
    ├── .babelrc
    ├── package.json
    ├── webpack.config.js
```

看样子应该没错，代码修改了，打包后多了个 `.js` 文件。再看看效果对不对

![4](https://192.168.47.104:8443/images/webpack_best_practice/4.png)

界面上也出现了 `hello world`。到这里为止，算是利用 `webpack` 走通了一个最小流程。

为什么说是最小，因为到目前为止这个配置在实际工作中 基本没卵用 `实用性不大`。细心一点的人已经看出来了，上面存在三个问题

1. 每修改一次代码，都要走一遍打包流程，然后自己手动打开 html 文件，预览效果
2. 第一次调用错误 api 的时候，报错信息定位不精确
3. 打包目录下面 `上次构建产物` 也仍旧存在，时间长了会存在越来越多的无用代码

作为一个懒人，第三点可以忍，第一点和第二点忍不了。我们一个个来解决

#### 实时更新并预览效果

针对第一点，查阅 `webpack` 官网，发现官网就给指了一条明路

![5](https://192.168.47.104:8443/images/webpack_best_practice/5.png)

按照官网教程，首先安装下 `webpack-dev-server`

```shell
npm install webpack-dev-server -D
```

再在 `webpack.config.js` 中添加相应的配置

```javascript
// 省略 ...
module.exports = {
    // 省略 ...
    devServer: {
        port: '3001', // 默认是 8080
        hot: true,
        stats: 'errors-only', // 终端仅打印 error
        compress: true, // 是否启用 gzip 压缩
        proxy: {
            '/api': {
                target: 'http://0.0.0.0:80',
                pathRewrite: {
                    '/api': '',
                }
            }
        }
    }
}
```

在 `package.json` > `script` 中添加一个命令

```json
{
    "dev": "webpack serve  --open"
}
```

执行 `npm run dev`，这个时候在动在浏览器中打开了 `http://192.168.47.104:3001/` 页面。光自动打开还不够啊，我们的目标是每次修改后`不用构建`就能在浏览器中`实时查看`。为了测试这个功能是否生效，我们任意修改 `src/index.js` 文件并保存。发现浏览器中内容自动刷新生效了。

想了解更多关于 `devServer` 的可以阅读以下两篇文章

- [【Webpack】devServer 实验报告](https://juejin.cn/post/6971237797734645767)
- [120 行代码帮你了解 Webpack 下的 HMR 机制](https://juejin.cn/post/6973825927708934174)

#### sourcemap 配置

```javascript
// 省略 ...
module.exports = {
    // 省略 ...
    devtool: 'eval-cheap-module-source-map',
}
```

这个配置什么意思呢，它会告诉我们错误是在`原始代码`的哪一行发生的。废话不多说，先来看看效果

![6](https://192.168.47.104:8443/images/webpack_best_practice/6.png)

点进去看看是什么情况

![7](https://192.168.47.104:8443/images/webpack_best_practice/7.png)

![8](https://192.168.47.104:8443/images/webpack_best_practice/8.png)

这么精准的定位，一天可以改`100`个 bug 了。

但是！！！ 这玩意好归好，生产环境可不能乱用。这里建议

`开发环境` 最佳： eval-cheap-module-source-map `生产环境` 最佳： hidden-source-map

什么？你上下嘴皮子吧嗒一合，说最佳就最佳？没有拿得出手的理由我们是不会信的

![9](https://192.168.47.104:8443/images/webpack_best_practice/9.png)

造谣是不可能造谣的，这辈子都不会。我也是吸收了这篇文章 [万字长文：关于 sourcemap，这篇文章就够了](https://juejin.cn/post/6969748500938489892) 的精华才总结出来的。

一万字的文章总结成两句话，10 秒钟吸收

![10](https://192.168.47.104:8443/images/webpack_best_practice/10.png)

世事总是这么奇妙，按照上面的思路，在解决第二个问题的时候又带出了一个新的问题，某些配置可能需要区分环境来设置，不同的环境设置合适的配置。就像在解决一个`bug A`的过程中，发现了一个新`的 bug B`。看来在解决上面第三个问题之前，得先解决这个 `区分环境配置` 的问题了。

#### 拆分环境

按照一般惯例，我们会有 `开发`、`测试`、`预发`、`生产`几个环境。但是我个人很多情况下 `开发` 和 `测试` 环境是同一套配置，所以我这里直接省略 `测试` 这个环境。

修改下目录结构

```
修改下目录结构
test-app
  + ├── build
  + |    ├── webpack.base.js
  + |    ├── webpack.dev.js
  + |    ├── webpack.pre.js
  + |    ├── webpack.pro.js
    ├── dist
    ├──  ├── bundle.b8ba1739.js
    ├──  ├── bundle.dc044571.js
    |    ├── index.html
    |    ├── main.js
    ├── src
    |    └── index.js
    ├── public
    |    └── index.html
    ├── .babelrc
    ├── package.json
```

从目录中就可以看出一点东西，我们删除了原先根目录下的 `webpack.config.js` 文件。新增了一个 `build` 目录。在 `build` 目录下我们需要建一个 `webpack.base.js` 文件。用来存放各个环境公共的配置，毕竟不可能所有配置在各个环境中都不一样。然后按照我们各自项目实际的需求来建立不同环境的配置文件。

先修改公共配置文件 `webpack.base.js`。原先的 `devServe` 配置由于只有开发环境有；`devtool` 各个环境不一样，所以这两个配置从公共配置里移除了

```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const rootDir = process.cwd();

module.exports = {
    entry: path.resolve(rootDir, 'src/index.js'),
    output: {
        path: path.resolve(rootDir, 'dist'),
        filename: 'bundle.[contenthash:8].js',
    },
    module: {
        rules: [
            {
                test: /\.(jsx|js)$/,
                use: 'babel-loader',
                include: path.resolve(rootDir, 'src'),
                exclude: /node_modules/,
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(rootDir, 'public/index.html'),
            inject: 'body',
            scriptLoading: 'blocking'
        })
    ]
}
```

接下来配置各个环境的配置，这里主要用到一个 `webpack-merge` 插件，用来合并公共配置，执行 `npm install webpack-merge -D`

- `webpack.pre.js`
- `webpack.pro.js`

```javascript
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base');

module.exports = merge(baseConfig, {
    mode: 'production',
    devtool: 'hidden-source-map',
});
```

看到仔细的人已经发现，配置中多了一个 `mode` 属性，这个会在后面解释一波，这里先不讲

修改 package.json 中的命令

```json
{
    "scripts": {
        "dev": "webpack serve --config build/webpack.dev.js --open",
        "build:pro": "npx webpack --config build/webpack.pro.js"
    }
}
```

再次执行 `npm run dev` 看看效果

![11](https://192.168.47.104:8443/images/webpack_best_practice/11.png)

看来是没问题了，现在已经成功把 `webpack.config.js` 文件根据环境进行拆分成了多个文件。

现在来回顾下之前提出的第三个问题

![12](https://192.168.47.104:8443/images/webpack_best_practice/12.png)

这个项目小的时候其实问题不大，但是当项目大了之后，每次打包都增加几百上千的文件，还是有点恐怖的。所以还是把这个问题也顺带解决下好了。

#### 打包时清除上次构建产物

我们的目标是每次打包时删除上次打包的产物，保证打包目录下所有文件都是新的，社区查找一番后，找到一个插件`clean-webpack-plugin` ，来看下这个插件的介绍

![13](https://192.168.47.104:8443/images/webpack_best_practice/13.png)

比较懒，所以直接上截图了。老步骤，先安装 `npm install clean-webpack-plugin -D` 然后直接将文档中的示例代码`借鉴`到我们的项目中。 修改 `webpack.base.js`

```javascript
// 省略...
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    // 省略...
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(rootDir, 'public/index.html'),
            inject: 'body',
            scriptLoading: 'blocking',
        }),
        new CleanWebpackPlugin(),
    ],
}
```

试下效果，执行 `npm run build:pro` 打个包。查看目录

```
test-app
    ├── build
    |    ├── webpack.base.js
    |    ├── webpack.dev.js
    |    ├── webpack.pre.js
    |    ├── webpack.pro.js
    ├── dist
    |    ├── bundle.fd44c2eb.js
    |    ├── bundle.fd44c2eb.js.map
    |    ├── index.html
    ├── src
    |    └── index.js
    ├── public
    |    └── index.html
    ├── .babelrc
    ├── package.json
```

`dist` 目录下原先存在的 `main.js`、`bundle.b8ba1739.js` 等前几次打包产物已经自动清除了。到这里第三个问题也解决了

### 功能完善

#### 添加 css 和 less 支持

为什么不添加 `sass` 支持？ 因为我不用 `sass`

首先，在 `src` 目录下添加一个 `index.less` 文件

```css
.test {
    color: red;
}
```

修改 `src/index.js` 文件，在文件中引用刚才添加的 `less` 文件

```javascript
import './index.less'

class Test {
    constructor() {
        this.renderDiv()
    }

    renderDiv() {
        const div = document.createElement('div')
        div.className = 'test'
        div.innerHTML = 'hello world'
        document.body.appendChild(div)
    }
}

new Test()
```

执行 `npm run dev`

等待 10 分钟后，页面迟迟没有加载任何东西，打开控制台一看

![14](https://192.168.47.104:8443/images/webpack_best_practice/14.png)

英语 8 级的我立马读懂了报错："你 可能 需要 一个 什么什么 loader 来 处理 这个 文件 类型， 目前 没有 loaders 被配置 来 process 这个 文件"

再结合官网的说明

![15](https://192.168.47.104:8443/images/webpack_best_practice/15.png)

到了这里，我好像隐约明白了 `webpack` 的真谛：`虽然很多时候我不行，但是很多大佬会让我行`。呸，什么叫不行？这叫 `灵活可插拔`，正是这种特性，让 webpack 可灵活支持各种复杂场景的自定义配置。

忘了正事儿，既然问题找到了，就好解决了，找到几个处理 `css` 和 `less` 的 loader 就行

首先安装 loader

```shell
npm install less style-loader css-loader less-loader -D
```

再修改 `webpack.base.js` 文件

```javascript
// 省略...

module.exports = {
    // 省略...
    module: {
        rules: [
            // 省略...
            {
                test: /\.(le|c)ss$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
        ]
    },
    // 省略...
}
```

再次执行 `npm run dev`，查看效果

![16](https://192.168.47.104:8443/images/webpack_best_practice/16.png)

#### css module

这一块是基于上面的模块修改的，解决 `css` 命名混乱和冲突的。不需要的话可以直接跳过这一块。

修改 `webpack.base.js`

```javascript
// 省略...

module.exports = {
    // 省略...
    module: {
        rules: [
            //  省略...
            {
                test: /\.(le|c)ss$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                compileType: 'module',
                                localIdentName: "[local]__[hash:base64:5]",
                            }
                        }
                    },
                    'less-loader'
                ]
            }
        ]
    }
    // 省略...
}
```

执行 `npm run dev` 来看看效果

![17](https://192.168.47.104:8443/images/webpack_best_practice/17.png)

给 `class` 样式名称后加上一个哈希串，具体的配置可以看 [css-loader 官网](https://www.npmjs.com/package/css-loader)

#### css 自动添加前缀

首先安装插件

```shell
npm install autoprefixer postcss postcss-loader -D
```

修改 `webpack.base.js` 配置文件

```javascript
// 省略...
const autoprefixer = require('autoprefixer');

module.exports = {
    // 省略...
    module: {
        rules: [
            // 省略...
            {
                test: /\.(le|c)ss$/,
                exclude: /node_modules/,
                use: [
                    // 省略...
                    'less-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    ["autoprefixer"],
                                ],
                            },
                        },
                    }
                ]
            },
        ]
    },
    // 省略...
}
```

#### 打包后抽离 css 文件

首先安装 `mini-css-extract-plugin` 插件

```shell
npm install mini-css-extract-plugin -D
```

修改 `webpack.base.js` 配置文件

```javascript
// 省略...
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    // 省略...
    module: {
        rules: [
            // 省略...
            {
                test: /\.(le|c)ss$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    // 省略...
                ]
            },
        ]
    },
    plugins: [
        // 省略...
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
        })
    ]
}
```

执行 `npm run build:pro` 打个包看看效果。

![18](https://192.168.47.104:8443/images/webpack_best_practice/18.png)

可以看到 css 已经被抽离出来了

#### 压缩打包后的 css 文件

首先安装 `optimize-css-assets-webpack-plugin` 插件

```shell
npm install optimize-css-assets-webpack-plugin -D
```

修改 `webpack.base.js` 配置文件

```javascript
// 省略...
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    // 省略...
    plugins: [
        // 省略...
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
        }),
        new OptimizeCssPlugin(),
    ],
}
```

执行 `npm run build:pro` 打个包看看效果。

```css
.test__1PSRs{color:red;transition-duration:.4s}
```

可以看出 css 已经被压缩了

#### 复制静态资源到打包目录

有些时候有些第三方的 js 插件没有提供 npm 包，只提供了一个 cdn 地址或者一份文件需要自己下载下来。通常我们下载下来之后放在我们的 `public/js` 目录下面，然后 `public/index.html` 文件里直接用 `script` 标签引入。这个时候不管是 `npm run dev` 开发时，还是 `npm run build:pro` 构建后，这个 js 文件都是找不到的。我们可以尝试下

在 `public/js` 新加一个 `test.js` 的空文件，啥内容都不用。然后在 `public/index.html` 中引入这个文件

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        // 省略
    </head>
    <body>
        <div id="root"></div>
        <script src="./js/test.js"></script>
    </body>
</html>
```

执行 `npm run dev` 查看效果

![19](https://192.168.47.104:8443/images/webpack_best_practice/19.png)

这里我们可以用 `copy-webpack-plugin` 这个插件，在构建的时候，将 `public/js` 的静态资源复制到 `dist` 目录下，这样文件就能找到了

安装插件 `npm install copy-webpack-plugin -D`

修改 `webpack.base.js` 配置文件

```javascript
// 省略...
const CopyWebpackPlugin = require('copy-webpack-plugin');

const rootDir = process.cwd();

module.exports = {
    // 省略...
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(rootDir, 'public/index.html'),
            inject: 'body',
            scriptLoading: 'blocking',
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: '*.js',
                    context: path.resolve(rootDir, "public/js"),
                    to: path.resolve(rootDir, 'dist/js'),
                },
            ],
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
        }),
        new OptimizeCssPlugin(),
    ]
}
```

执行 `npm run dev` 查看效果

![20](https://192.168.47.104:8443/images/webpack_best_practice/20.png)

静态文件已经可以正常加载了。

#### 资源加载器

项目中难免要引入一些图标、图片等资源，在不做任何处理的情况下，我们尝试下在代码中引用图片，修改 `src/index.js` 文件如下

```javascript
import wuhanjiayou from '../public/asset/a.jpeg'

class Test {
    constructor() {
        this.renderImg()
    }

    renderImg() {
        const img = document.createElement('img')
        img.src = wuhanjiayou
        document.body.appendChild(img)
    }
}

new Test()
```

执行 `npm run dev` 看下效果，报了个熟悉的错

![21](https://192.168.47.104:8443/images/webpack_best_practice/21.png)

按照以往的套路，直接引用社区的三件套 `raw-loader`、`url-loader`、`file-loader`，安装依赖，配置依赖，一通操作下来就解决了问题。现在我们使用 `webpack5`就方便多了，不用安装任何依赖，直接修改 `webpack.base.js` 配置文件

```javascript
// 省略...
rules: [
    {
        test: /\.(png|jpg|gif|jpeg|webp|svg|eot|ttf|woff|woff2)$/,
        type: 'asset',
    },
]
```

没错，就是这么简单。`type` 属性还有其他几个值，具体可以看 [官方文档](https://webpack.docschina.org/guides/asset-modules/)

配置已经修改好了，执行 `npm run dev` 再来看下效果

![22](https://192.168.47.104:8443/images/webpack_best_practice/22.png)

搞定！

上面讲到的东西基本够小项目的日常开发需求了，常用的 loader 和 plugin 都已经有所涉及。但是，如果你的项目特别复杂，需求又比较小众，社区没有现成的 loader 和 plugin 可以借鉴，那么只能`自己动手实现`一个了。

可能在一部分人眼中，loader 和 plugin 是比较神秘的，也不可能想着自己去造一个轮子。但是当碰到问题又没有现成的解决方案的时候，那就不得不自己造了。

看了这篇文章 [Webpack - 手把手教你写一个 loader / plugin](https://juejin.cn/post/6976052326947618853) 应该能很快上手

### 项目优化

刚才也讲到了，上面的一通操作基本够小项目开发使用了。为什么是小项目？大项目不行吗？当一个项目大到路由都有`几百个`的时候，一次热更新就需要十几二十多秒，一次打包要半个小时。开发时，一次代码改动保存就要等 `20 秒`，这搁谁谁都忍不了啊。这个时候就需要想点办法来优化。

#### loader 配置优化

这个其实上面已经做了。明确告诉 loader，哪些文件不用做处理(exclude)，或者只处理哪些文件(include)。

```javascript
{
    test: /\.(jsx|js)$/,
    use: 'babel-loader',
    // include: [path.resolve(rootDir, 'src')]
    // exclude: /node_modules/,
}
```

一般倾向于使用 `include`，但是如果怕漏处理一些文件的话，粗暴点，使用 `exclude: /node_modules/` 也可以。

这部分测试了下，提升速度不是很明显，应该算锦上添花吧

#### 缓存

先说下 `webpack5` 之前是怎么做的。

利用 `cache-loader` 将结果缓存中磁盘中；利用 `hard-source-webpack-plugin` 将结果缓存在 `node_modules/.cache` 下提升二次打包速度；利用 `DllReferencePlugin` 将变化不频繁的第三方库`提前单独`打包成动态链接库，提升真正业务代码的打包速度

webpack5 自带了持久化缓存，配置如下

开发环境 `webpack.dev.js`

```javascript
cache: {
    type: 'memory'
}
```

生产环境 `webpack.pro.js`

```javascript
{
    cache: {
        type: 'filesystem',
        buildDependencies: {
            config: [__filename]
        }
    }
}
```

这个测试了下前后的打包时间

![23](https://192.168.47.104:8443/images/webpack_best_practice/23.png)

![24](https://192.168.47.104:8443/images/webpack_best_practice/24.png)

数据是这个数据：

- 第一次: `12592 ms`
- 第二次: `920 ms`

但是我心里默数了下，二次打包大概在 3 秒左右，咱也不知道控制台的计时逻辑是什么

![25](https://192.168.47.104:8443/images/webpack_best_practice/25.png)

如果在构建时，你主动确定要放弃旧的缓存的话，可以传一个新的 `version` 参数来放弃使用缓存

```javascript
{
    cache: {
        type: 'filesystem',
            buildDependencies: {
            config: [__filename]
        },
        version: 'new_version'
    }
}
```

#### 代码拆分

```javascript
optimization: {
    splitChunks: {
      chunks: 'all'
    }
}
```

这个在 `mode: production` 时是默认开启的，但是默认情况下只会对按需加载的代码进行分割。如果我们要对一开始就加载的代码也做分割处理，就要进行如上配置。

从官网截了一张图：

![26](https://192.168.47.104:8443/images/webpack_best_practice/26.png)

大家的项目可能都有所不同，相对应的最佳的配置可能也有所不同，所以这里就补贴具体的配置了，大家有需要的可以看官网的文档对自己的项目进行配置 [官网 optimization.splitChunks 更多配置](https://webpack.js.org/plugins/split-chunks-plugin/)、[「Webpack」从 0 到 1 学会 code splitting](https://juejin.cn/post/6979769284612325406)

#### mode

`mode: production` 在上面出现了这么多次，也没有具体说有哪些功能。其实当设置 `mode: production` 时，`webpack` 已经默认开启了一些优化措施。

![27](https://192.168.47.104:8443/images/webpack_best_practice/27.png)

这里面的一些东西由于篇幅较大也不做一一说明了，反正只要记得 `mode: production` 已经给我们做了一系列优化，真的想知道有哪些优化的，我找了篇文章，有兴趣的可以看看 [mode 详解](https://juejin.cn/post/6844903695033843726)

#### happypack

利用 `happypack` 插件进行多线程打包，按照官网文档进行配置

```javascript
// 省略...
const Happypack = require('happypack');
const os = require('os')
const happyThreadPool = Happypack.ThreadPool({ size: os.cpus().length })

// 省略...
rules: [
    {
        test: /\.(jsx|js)$/,
        // use: 'babel-loader',
        use: 'Happypack/loader?id=js',
        exclude: /node_modules/,
    },
]

plugins: [
    new Happypack({
        id: 'js', // 这个 id 值为上面 Happypack/loader?id=js 问号后跟的参数
        use: ['babel-loader'],
        threadPool: happyThreadPool
    }),
]
```

由于本篇文章写的是个 demo，没有业务代码，所以这个打包出来的时间基本没变化`甚至还多了 1 秒`，这里就不贴效果图了。 这是因为`happypack`执行也需要时间，如果项目比较小的话，就不需要配置了。 `js` 处理完之后那就是要处理`css`了， 按照处理`js`的方式，`ctrl+c/ctrl+v` 处理`css`。

执行 `npm run build:pro`

```
ERROR in ./src/index.less
Module build failed (from ./node_modules/Happypack/loader.js):
Error: You forgot to add 'mini-css-extract-plugin' plugin (i.e. `{ plugins: [new MiniCssExtractPlugin()] }`), please read https://github.com/webpack-contrib/mini-css-extract-plugin#getting-started
```

报错说忘记添加了`mini-css-extract-plugin`插件，但是明明已经添加了，经过试验，发现是 `mini-css-extract-plugin` 这个插件引起 `happypack` 报错的。终于，在经过 `百度`、`谷歌` 等一系列骚操作后，我放弃了，没找到解决方法

![28](https://192.168.47.104:8443/images/webpack_best_practice/28.png)

现在摆在面前的就三条路：

- 放弃使用 `happypack`
- 使用 `happypack` 优化`js`和`css`，放弃使用 `mini-css-extract-plugin`
- 使用 `happypack` 优化 `js`，放弃优化 `css`，保留 `mini-css-extract-plugin`

知道咋解决的或有更好的方式的可以在下方留言，让我~~白嫖~~ 借鉴下。

#### thread-loader

如果采用上面第一种，放弃使用 `happypack`，可以用 `thread-loader` 代替下。而且这个配置非常简单。

先安装: `npm install thread-loader -D`，再修改配置

```javascript
// 省略...
rules: [
    {
        test: /\.(jsx|js)$/,
        use: ['thread-loader', 'babel-loader'],
        exclude: /node_modules/,
    },
    {
        test: /\.(le|c)ss$/,
        exclude: /node_modules/,
        use: [
            MiniCssExtractPlugin.loader,
            'thread-loader',
            {
                loader: 'css-loader',
                options: {
                    modules: {
                        compileType: 'module',
                        localIdentName: "[local]__[hash:base64:5]",
                    },
                },
            },
            'less-loader',
            {
                loader: 'postcss-loader',
                options: {
                    postcssOptions: {
                        plugins: [
                            ["autoprefixer"],
                        ]
                    }
                }
            }
        ]
    }
]
```

到这里应该可以应付一般的项目了。由于这篇文章主要讲述 webpack 的应用，所以很多知识点没有细讲，也没有精力细讲，但是很多涉及到的知识点都推荐了相应的文章，有兴趣的朋友可以看一下。

参考文献:

- [webpack5](https://webpack.docschina.org/blog/2020-10-10-webpack-5-release/)
- [webpack4 升级到 5](https://webpack.docschina.org/migrate/5/)

![29](https://192.168.47.104:8443/images/webpack_best_practice/29.gif)

