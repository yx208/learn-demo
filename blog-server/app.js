const http2 = require('http2');
const fs = require('fs');
const Koa = require('koa');
const koaBody = require('koa-body');
const koaStatic = require('koa-static');
const cors = require('koa2-cors');
const requireDirAll = require('./lib/requireDirAll');
const { catchError } = require('./middlewares/exception');

const app = new Koa();

// 全局错误处理
app.use(catchError);

// 允许跨域
app.use(cors());

// 请求参数解析
app.use(koaBody({ multipart: true }));

// 创建静态文件服务
app.use(koaStatic(__dirname + '/static'));

// 自动引入路由
const routerArr = requireDirAll(__dirname + '/api/v1');
routerArr.forEach(router => app.use(router.routes()));

// 创建 http2 服务
const server = http2.createSecureServer({
    key: fs.readFileSync(__dirname + '/ssl/localhost+8-key.pem'),
    cert: fs.readFileSync(__dirname + '/ssl/localhost+8.pem')
}, app.callback());

// 监听端口
server.listen(8443, () => {
    console.log('Use HTTP/2 create server, url: https://localhost:8443');
});
