const KoaRouter = require('koa-router')
const User = require('../../models/user')
const { RegisterValidator } = require('../../middlewares/validator')
const { RegisterSuccess, RegisterForbidden } = require('../../middlewares/httpExecption')
const router = new KoaRouter({ prefix: '/v1/register' })

const { registerable } = require('../../config')

router.post('/', registerValidate, async (ctx) => {
    
    const vali = await new RegisterValidator().validate(ctx)

    await User.create({
        account: vali.get('body.account'),
        password: vali.get('body.password'),
        permission: vali.get('body.permission')
    })

    throw new RegisterSuccess()
})

async function registerValidate(ctx, next) {
    if (registerable) {
        await next()
    } else {
        throw new RegisterForbidden()
    }
}

module.exports = router
