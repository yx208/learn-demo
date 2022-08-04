const { HttpException } = require('./HttpException');

class RequestArticleSuccess extends HttpException {
    constructor(data, message = '请求成功', errorCode = 20000) {
        super();

        this.data = data;
        this.message = message;
        this.errorCode = errorCode;
        this.statusCode = 200;
    }
}

class CreatedArticle extends HttpException {
    constructor(message = '创建成功', errorCode = 20001) {
        super();

        this.message = message;
        this.errorCode = errorCode;
        this.statusCode = 201;
    }
}

module.exports = {
    RequestArticleSuccess,
    CreatedArticle
}
