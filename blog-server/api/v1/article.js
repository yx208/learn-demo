const fs = require('fs');
const fsp = require('fs/promises');
const Router = require('koa-router');
const marked = require('marked');
const validator = require('validator');

const router = new Router({ prefix: '/api/v1/article'});
const ArticleModel = require('../../models/Article');

const {
    RequestArticleSuccess,
    CreatedArticle,
} = require('../../exception/Success');
const {
    ParameterException
} = require('../../exception/HttpException');

router.get('GetArticle', '/', async ctx => {
    const query = ArticleModel.findOne({ _id: ctx.query.id });
    const detail = await query.exec();

    const content = await fsp.readFile(process.cwd() + detail.path, { encoding: 'utf8' });

    throw new RequestArticleSuccess({
        detail,
        content: marked(content)
    });
});

router.get('GetArticleList', '/list', async ctx => {

    let { start, limit } = ctx.request.query;

    // 从 url query 中解析到的是字符串 number
    // 所以这里做的默认值处理也默认为 string number
    start = start || '0';
    limit = limit || '10';

    // isNumeric(str) 避免函数传入不正确类型参数
    if (typeof start !== "string") start = start.toString();
    if (typeof limit !== "string") limit = limit.toString();

    if (!validator.isNumeric(start) || !validator.isNumeric(limit))
        throw new ParameterException('参数类型错误，期望参数类型为 Number');

    const qStart = parseInt(start);
    const qLimit = parseInt(limit);

    if (qStart < 0 || qLimit < 0) throw new ParameterException();

    const query = ArticleModel.find().skip(qStart).limit(qLimit);
    const res = await query.exec();

    throw new RequestArticleSuccess(res);
});

/**
 * 保存文章，写入数据库记录
 */
router.post('CreateArticle', '/', async ctx => {

    const file = ctx.request.files.article;
    const savePath = '/static/articles/' + file.name;
    const {
        name,
        category,
        tags,
        type,
        cover
    } = ctx.request.body;

    const rs = fs.createReadStream(file.path);
    const ws = fs.createWriteStream(process.cwd() + savePath);
    rs.pipe(ws);
    ws.on('finish', () => {
        ArticleModel.create({
            name,
            category,
            type,
            cover,
            path: savePath,
            tags: tags.split(',')
        });
    });

    throw new CreatedArticle();
});

module.exports = router;
