const KoaRouter = require('koa-router')
const Auth = require('../../middlewares/auth')
const { TokenEffective } = require('../../middlewares/httpExecption')
const router = new KoaRouter({ prefix: '/v1/token' })

router.post('/verify', Auth.verifyToken, async (ctx) => {
    throw new TokenEffective()
})

module.exports = router
