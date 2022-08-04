
class HttpException extends Error {

    statusCode;
    errorCode;
    message;
    data;

    constructor(message = '发生错误', errorCode = 40000, statusCode = 400) {
        super(message);

        this.data = null;
        this.statusCode = statusCode;
        this.errorCode = errorCode;
        this.message = message;
    }
}

class NotFound extends HttpException {
    constructor(message = '资源未找到', errorCode = 40001) {
        super();

        this.statusCode = 404;
        this.message = message;
        this.errorCode = errorCode;
    }
}

class ParameterException extends HttpException {
    constructor(message = '参数错误', errorCode = 40000) {
        super();

        this.statusCode = 400;
        this.message = message;
        this.errorCode = errorCode;
    }
}

module.exports = {
    HttpException,
    NotFound,
    ParameterException
};
