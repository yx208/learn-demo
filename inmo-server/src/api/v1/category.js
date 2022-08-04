const KoaRouter = require('koa-router')
const { RequestSuccess } = require('../../middlewares/httpExecption')
const router = new KoaRouter({ prefix: '/v1/category' })

const Article = require('../../models/article')

router.get('/list', async (ctx) => {

    const articles = await Article.findAll({ attributes: ['category'] })
    const tmp = []

    articles.forEach(value => {
        const cate = value['category']

        if (cate) tmp.push(value['category'])
    })

    // 去重
    const result = Array.from(new Set(tmp))
    throw new RequestSuccess(result)
})

module.exports = router
