
declare enum ArticleType {
    ORIGINAL = 1,   // 原创
    REPRINT     // 转载
}

interface ArticleDetail {
    _id: string
    tags: string[]
    name: string
    category: string
    type: ArticleType
    cover: string
    path: string
    createdAt: string
    updatedAt: string
}

declare interface ArticleDetailResponse {
    data: {
        detail: ArticleDetail
        content: string
    }
    code: number
    message: string
}

declare interface ArticleListResponse {
    data: ArticleDetail[]
    code: number
    message: number
}