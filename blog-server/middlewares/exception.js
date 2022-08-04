const { HttpException } = require('../exception/HttpException');

const catchError = async (ctx, next) => {
    try {
        await next();
    } catch (error) {
        // 已知错误
        if (error instanceof HttpException) {
            ctx.status = error.statusCode;
            ctx.body = {
                data: error.data,
                message: error.message,
                code: error.errorCode,
                url: `${ctx.method} ${ctx.path}`,
                success: (error.errorCode >= 20000 && error.errorCode < 30000)
            }
        }
        // 未知错误
        else {
            ctx.status = 500;
            ctx.body = {
                message: '服务器发生未知错误，请等待修复',
                code: -1,
                url: `${ctx.method} ${ctx.path}`,
                success: false
            }
        }
    }
}

module.exports = {
    catchError
}
