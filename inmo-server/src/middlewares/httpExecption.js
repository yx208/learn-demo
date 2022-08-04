
/**
 * @description 错误处理对象
 * @param {String}errorMessage  错误信息
 * @param {Number}errorCode     自定义的错误代码
 */
class HttpExecption extends Error {
    constructor(errorMessage = '服务器出了点问题，请稍后再试', errorCode = 1000, statusCode = 500) {
        super()

        this.message = errorMessage
        this.errorCode = errorCode
        this.statusCode = statusCode
    }
}

/**
 * @description 参数错误
 */
class ParameterException extends HttpExecption {
    constructor(message, errorCode = 1006, statusCode = 500) {
        super()

        this.message = message
        this.errorCode = errorCode
        this.statusCode = statusCode
    }
}

/**
 * @description 文章添加成功
 */
class Success extends HttpExecption {
    constructor(message = '添加成功') {
        super()

        this.message = message
        this.errorCode = 0
        this.statusCode = 200
    }
}

/**
 * @description 创建字段错误
 */
class CreateFieldError extends HttpExecption {
    constructor(sqlErrorObject, errorCode = 1006, statusCode = 500) {
        super()

        this.message = this._getErrorMessage(sqlErrorObject)
        this.errorCode = errorCode
        this.statusCode = statusCode
    }

    _getErrorMessage(sqlErrorObject) {
        const key = sqlErrorObject.name
        let message = key
        switch(key) {
            case 'SequelizeUniqueConstraintError':
                message = { desc: '该 key 为唯一字段，与现有字段冲突', fields: sqlErrorObject.fields };
                break;
            default: break;
        }

        return message
    }
}

class NotFount extends HttpExecption {
    constructor(message = '此项没有定义', errorCode = 1002, statusCode = 404) {
        super()

        this.message = message
        this.statusCode = statusCode
        this.errorCode = errorCode
    }
}

class LoginSuccess extends HttpExecption {
    constructor(message) {
        super()

        this.message = message
        this.errorCode = 0
        this.statusCode = 200
    }
}

class TokenExpired extends HttpExecption {
    constructor(message = 'Token 已过期或者不存在') {
        super()

        this.message = message
        this.statusCode = 200
        this.errorCode = 1007
    }
}

class TokenEffective extends HttpExecption {
    constructor(message = 'Token 有效') {
        super()

        this.message = message
        this.errorCode = 0
        this.statusCode = 200
    }
}

class DeleteSuccess extends HttpExecption {
    constructor(message = '删除成功') {
        super()

        this.message = message
        this.errorCode = 0
        this.statusCode = 204
    }
}

class RegisterSuccess extends HttpExecption {
    constructor(message = '注册成功') {
        super()

        this.message = message
        this.errorCode = 0
        this.statusCode = 200
    }
}

class RegisterForbidden extends HttpExecption {
    constructor() {
        super()

        this.message = '不允许注册'
        this.errorCode = 3000
        this.statusCode = 403
    }
}

class RequestSuccess extends HttpExecption {
    constructor(data = {}) {
        super()

        this.message = 'success'
        this.data = data
        this.errorCode = 0
        this.statusCode = 200
    }
}

class ModifySuccess extends HttpExecption {
    constructor(message = '修改成功') {
        super()

        this.message = message
        this.errorCode = 0
        this.statusCode = 204
    }
}

module.exports = {
    HttpExecption,
    ParameterException,
    Success,
    CreateFieldError,
    NotFount,
    LoginSuccess,
    TokenExpired,
    TokenEffective,
    DeleteSuccess,
    RegisterSuccess,
    RegisterForbidden,
    RequestSuccess,
    ModifySuccess
}
