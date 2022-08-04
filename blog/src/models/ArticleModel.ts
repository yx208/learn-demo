import Http from "../utils/Http";

class ArticleModel {

    list(start = 0, limit = 10) {
        return Http.get<ArticleListResponse>('/article/list', { start, limit });
    }

    detail(id: string) {
        return Http.get<ArticleDetailResponse>('/article', { id });
    }

    search() {

    }

}

export default ArticleModel;
