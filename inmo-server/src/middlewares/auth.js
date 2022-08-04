const jwt = require('jsonwebtoken')
const basicAuth = require('basic-auth')
const { security } = require('../config')
const { TokenExpired } = require('./httpExecption')

class Auth {
    static async verifyToken(ctx, next) {

        const userToken = basicAuth(ctx.req)

        // 校验 token
        try {
            jwt.verify(userToken.name, security.secretKey)
        } catch (error) {
            throw new TokenExpired()
        }
        
        await next()
    }
}

module.exports = Auth
