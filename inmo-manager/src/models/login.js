import { sha224 } from 'js-sha256'
import Http from '../utils/http'

class LoginModel extends Http {

    login({ account, password }) {
        return this.post('/login', {
            account,
            password: this._stringToSHA256(password)
        })
    }

    verifyToken() {
        const token = Http.getStorage('token')
        return this.post('/token/verify', {}, {
            auth: { username: token }
        })
    }

    _stringToSHA256(str) {
        return sha224(str)
    }
}

export default LoginModel
