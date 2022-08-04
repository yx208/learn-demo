import Http from "../utils/Http"

class Login {

    /**
     * 检查手机号是否注册
     * @param phoneNumber
     */
    static checkPhoneIsRegister(phoneNumber: string) {
        return Http.request({
            url: '/cellphone/existence/check',
            method: 'GET',
            query: {
                phone: phoneNumber
            }
        })
    }

    /**
     * 发送验证码
     * @param phone
     */
    static sendVerificationCode(phone: string) {
        return Http.request({
            url: '/captcha/sent',
            method: 'GET',
            query: { phone }
        })
    }

    /**
     * 验证验证码
     */
    static verifyVerificationCode(phone: string, code: string) {
        return Http.request<VerifyCodeResponse>({
            url: '/captcha/verify',
            method: 'GET',
            query: {
                phone,
                captcha: code
            }
        })
    }

    /**
     * 手机登录
     * @param phone
     * @param password
     */
    static phoneLogin(phone: string, password: string) {
        return Http.request<LoginResponse>({
            url: '/login/cellphone',
            method: 'POST',
            data: {
                phone,
                password
            }
        })
    }

}

export default Login
