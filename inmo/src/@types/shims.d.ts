declare module '*.vue'
declare module 'prismjs/components/*.js'

declare interface HitokotoResponse {
    commit_from: string
    created_at: string
    creator: string
    creator_uid: number
    from: string
    from_who: string
    hitokoto: string
    id: number
    length: number
    reviewer: number
    type: string
    uuid: string
}

declare interface Article {
    index: number
    title: string
    author: string
    pubdate: number | Date
    category: string
    tags: string[] | string
    content: string
}

declare interface ArticleListResponse {
    data: Article[]
    errorCode: number
    message: string
    url: string
}

declare interface ArticleResponse {
    data: Article
    errorCode: number
    message: string
    url: string
}
