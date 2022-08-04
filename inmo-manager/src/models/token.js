import Http from '../utils/http'

class TokenModel extends Http {
    verifyToken(token) {
        return this.request({
            url: '/verify/token',
            method: 'POST',
            data: { token }
        })
    }
}

export default TokenModel
