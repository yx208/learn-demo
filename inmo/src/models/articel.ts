import Http from '../api/http'
import { blogBaseURL } from '../config'

class ArticleModel extends Http {

    constructor() {
        super(blogBaseURL)
    }

    public getArticleList() : Promise<ArticleListResponse> {
        return this.get<ArticleListResponse>('/article/list')
    }

    public getArticle(index: number) : Promise<ArticleResponse> {
        return this.get<ArticleResponse>('/article', { params: {index} })
    }
}

export default ArticleModel
