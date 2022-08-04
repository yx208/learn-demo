const { HttpExecption } = require('./httpExecption')
const { environment } = require('../config/index')

const catchError = async (ctx, next) => {
    try {
        await next()
    } catch(error) {
        
        const isHttpExecption = error instanceof HttpExecption

        const url = ctx.method.toUpperCase() + ' ' + ctx.path

        // if (environment === 'dev') {
        //     console.log('************* 服务器发生错误 ************')
        //     console.error(error)
        //     console.log('***************************************')
        // }

        if (isHttpExecption) {
            ctx.statusCode = error.statusCode || 404
            ctx.body = {
                data: error.data,
                message: error.message,
                errorCode: error.errorCode,
                url,
            }
        } else {
            ctx.statusCode = 404
            ctx.body = {
                message: error.message,
                errorCode: 1000,
                url
            }
        }
    }
}

module.exports = catchError
