const KoaRouter = require('koa-router')
const router = new KoaRouter({ prefix: '/v1/article' })

const Article = require('../../models/article')
const Auth = require('../../middlewares/auth')
const { PostArticleObjectValidator } = require('../../middlewares/validator')
const {
    Success,
    CreateFieldError,
    DeleteSuccess,
    NotFount,
    RequestSuccess,
    ModifySuccess
} = require('../../middlewares/httpExecption')

router.get('/', async (ctx) => {
    const index = ctx.query.index
    const article = await Article.findOne({where: { index }})

    if (article)
        throw new RequestSuccess(article)
    else
        throw new NotFount()
})

router.post('/', Auth.verifyToken, async (ctx) => {

    const vali = await new PostArticleObjectValidator().validate(ctx)
    const tags = vali.get('body.tags')

    try {
        await Article.create({
            title: vali.get('body.title'),
            pubdate: vali.get('body.pubdate'),
            author: vali.get('body.author'),
            content: vali.get('body.content'),
            category: vali.get('body.category'),
            tags: vali.get('body.tags')
        })
    } catch (error) {
        throw new CreateFieldError(error, 1003, 400)
    }

    throw new Success()
})

router.get('/list', async (ctx) => {
    const articles = await Article.findAll({
        attributes: [
            'index',
            'index',
            'title',
            'author',
            'pubdate',
            'category',
            'tags',
            'content'
        ]
    })

    throw new RequestSuccess(articles)
})

router.delete('/', async (ctx) => {

    const articleName = ctx.query.articleName
    const result = await Article.destroy({ where: { title: articleName }})

    if (result)
        throw new DeleteSuccess()
    else 
        throw new NotFount()
})

router.put('/', async (ctx) => {

    const article = ctx.request.body
    await Article.update(article, { where: { index: article.index }})

    throw new ModifySuccess()
})

module.exports = router
