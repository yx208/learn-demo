const KoaRouter = require('koa-router')

const router = new KoaRouter({ prefix: '/v1/login' })

const User = require('../../models/user')
const { LoginValidator } = require('../../middlewares/validator')
const { generateToken } = require('../../utils/utils')
const { LoginSuccess } = require('../../middlewares/httpExecption')

router.post('/', async (ctx) => {

    const vali = await new LoginValidator().validate(ctx)
    
    const user = await User.verifyPassword(vali.get('body.account'), vali.get('body.password'))
    const token = generateToken(vali.get('body.password'), user.permission)

    throw new LoginSuccess({ token: token })
})


module.exports = router
