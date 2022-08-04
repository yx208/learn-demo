const KoaRouter = require("koa-router");
const { RequestSuccess } = require("../../middlewares/httpExecption");
const router = new KoaRouter({ prefix: '/v1/tag' })

const Article = require('../../models/article')

router.get('/list', async () =>{

    const articles = await Article.findAll({ attributes: ['tags'] });
    const tmp = [];

    articles.forEach(v => tmp.push(...v['tags']));

    // 去重
    const result = Array.from(new Set(tmp))
    throw new RequestSuccess(result);
})

module.exports = router
