import Http from "./Http"

interface PagingItem {
    name: string
}

interface PagingResult {
    empty: boolean
    moreData: boolean
    items: PagingItem[]
}

class Paging {

    private readonly url: string = ''
    private readonly limit: number = 10
    private readonly params: object = null
    private locker: boolean = false
    private start: number = 0
    private moreData: boolean = true
    private total: number = 0
    private count: number = 0

    constructor(url: string, params: object = null, limit: number = 10) {
        this.url = url
        this.params = params
        this.limit = limit
        this.start = 0
    }


    /**
     * 获取下一页数据
     */
    public async getNextPage() : Promise<PagingResult> {

        // 如果为锁定状态则为请求中
        if (this.getLocker()) return Paging.getOnRequestStruct()

        this.lock()
        const res = this.realRequest()
        this.unlock()

        return res
    }


    /**
     * 返回锁的状态
     */
    public getLocker() {
        return this.locker
    }

    /**
     * 返回一个在请求是再次发布请求的结构
     * @private
     */
    private static getOnRequestStruct() : PagingResult {
        return {
            empty: true,
            moreData: true,
            items: []
        }
    }

    /**
     * 返回一个空结构
     * @private
     */
    private static getEmptyStruct() : PagingResult {
        return {
            empty: true,
            moreData: false,
            items: []
        }
    }

    /**
     * 真正请求数据的函数
     * @private
     */
    private async realRequest(): Promise<PagingResult> {

        const res = await Http.request<SearchResponse>({
            url: this.url,
            method: 'GET',
            query: {
                ...this.params,
                limit: this.limit,
                start: this.start
            }
        })

        // 保存所有数量
        this.total = res.result.songCount
        // 保存下次开始的位置
        this.start = res.result.songs.length
        // 保存请求到的数据量
        this.count += res.result.songs.length
        // 计算是否还有数据请求
        this.calcHasMoreData()

        return {
            empty: false,
            moreData: this.moreData,
            items: res.result.songs
        }
    }

    /**
     * 计算是否还有更多数据
     * @private
     */
    private calcHasMoreData() {
        this.moreData = this.count < this.total
    }

    /**
     * 上锁
     * @private
     */
    private lock() {
        this.locker = true
    }

    /**
     * 解锁
     * @private
     */
    private unlock() {
        this.locker = false
    }

}

export default Paging
