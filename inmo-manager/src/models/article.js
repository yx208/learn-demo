import { createLogger } from 'vuex'
import Http from '../utils/http'

class ArticleModel extends Http {

    getArticleList() {
        const token = ArticleModel.getStorage('token')
        return this.get('/article/list', {
            auth: { username: token }
        })
    }

    postArticle(data) {
        return this.post('/article', data, { auth: { username: Http.getStorage('token') }})
    }

    getCategoryList() {
        return this.get('/category/list')
    }

    getTagList() {
        return this.get('/tag/list')
    }

    deleteArticle(articleName) {
        return this.delete('/article?articleName=' + articleName)
    }

    putArticle(data) {
        return this.put('/article', data, { auth: { username: Http.getStorage('token') }})
    }

}

export default ArticleModel
