const { LinValidator, Rule } = require('../lib/validator-v2')

class PostiveIntegerValidator extends LinValidator {
    constructor() {
        super()
        
        this.pubdate = [
            new Rule('isInt', '不是一个正整数', { min: 1 })
        ]
    }
}

class PostArticleObjectValidator extends LinValidator {
    constructor() {
        super()

        this.title = [new Rule('isLength', '长度不符合规范', { min: 2, max: 64 })]
        this.author = [new Rule('isLength', '长度不符合规范', { min: 2, max: 20 })]
        this.content = [new Rule('isLength', '长度不符合规范', { min: 2 })]
        this.pubdate = [new Rule('isInt', '不是一个正整数时间戳', { min: 1 })]
        this.category = [new Rule('isLength', '不能为空', { min: 1 })]
    }
}

class LoginValidator extends LinValidator {
    constructor() {
        super()

        this.account = [new Rule('isLength', '长度不符合规范', { min: 2, max: 64 })]
        this.password = [new Rule('isLength', 'hash长度不符合规定', { min: 56, max: 60 })]
    }
}

class RegisterValidator extends LinValidator {
    constructor() {
        super()

        this.account = [new Rule('isLength', '长度不符合规范', { min: 2, max: 64 })]
        this.password = [new Rule('isLength', 'hash长度不符合规定', { min: 56, max: 60 })]
        this.permission = [new Rule('isInt', '不是一个整形数字', { min: 1, max: 99 })]
    }
}

module.exports = {
    PostiveIntegerValidator,
    PostArticleObjectValidator,
    LoginValidator,
    RegisterValidator
}
