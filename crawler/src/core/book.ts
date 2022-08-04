import { Browser } from "puppeteer/lib/cjs/puppeteer/common/Browser"
// import handler from "./handler"
import handler from "./getBookInfo"

export interface DetailDescribe {
    SPEC?: string // 规格
    paper?: string // 纸质
    package?: string // 包装
    isSuit?: string // 套装
    ISBN?: string // 国际标准书号
    series?: string // 丛书
    category?: string[]
}

// 关联商品
export interface AssociatedGoods {
    id: number,
    img: string,
    title: string
}

export interface Book {
    id: number
    title: string
    subTitle: string

    stock: number

    previewImages: string[]

    author: string
    pubDate: string
    star: number

    publisher: Publisher

    price: string       // 纸质书价格
    // ebookPrice: string  // 电子书价格
    ebook: {
        id: number,
        price: string
    }

    relateGoods: string[]

    detailDescribe: DetailDescribe

    feature: string[]

    abstract?: string[] // 编辑推荐
    contentIntroduction?: string[] // 简介
    authorIntroduction?: string[] // 作者简介
    toc?: string[] // 目录
    preface?: string[] // 前言
    mediaFeedback?: string[] // 媒体评论
    extract?: string[] // 试读
}

export interface Publisher {
    id: number
    name: string
    logo: string
    service: string[]
}

/**
 * 某个分类打开后的页面
 * @param browser
 * @param url
 */
async function getCategoryPageLinks(browser: Browser, url: string): Promise<string[]> {
    const page = await browser.newPage()
    await page.setDefaultNavigationTimeout(2000 * 60)
    await page.goto(url)

    const res = await page.evaluate(() => {
        const books: Element[] = Array.from(document.getElementById('component_59').children)

        return books.map(book => {
            return book.querySelector('.name > a').getAttribute('href')
        })
    })

    await page.close()

    return res
}

/**
 * 获取所有分类页面的 link
 * @param browser
 * @param url
 */
async function getCategoryLinks(browser: Browser, url: string): Promise<string[][]> {

    const page = await browser.newPage()
    await page.setDefaultNavigationTimeout(2000 * 60)
    await page.goto(url)

    const res = await page.evaluate(() => {

        const cateContainer = Array.from(document.querySelectorAll('#floor_1 .classify_kind'))

        return cateContainer.map((element: Element) => {

            // 如果没有子分类
            if (element.lastElementChild.children.length === 1) {
                const sp = element.querySelector('div > a').getAttribute('href').split(/[a-z0-9]\//)
                return [ sp[0] + 'm/pg$1-' + sp[1] ]
            }

            // 获取一个分类下的所有 a 标签
            const linkElement = Array.from(element.querySelectorAll('ul > li > a'))
            // 最后一个必定是 more 所以得移除最后一个
            linkElement.pop()

            return linkElement.map(link => {
                const sp = link.getAttribute('href').split(/[a-z0-9]\//)
                return sp[0] + 'm/pg$1-' + sp[1]
            })
        })
    })

    await page.close()

    return res
}

/**
 * 爬取页面信息
 * @param browser
 * @param url
 */
async function getBookInfo(browser: Browser, url: string) : Promise<Book | null> {

    const page = await browser.newPage()
    await page.goto(url, {
        timeout: 0,
        waitUntil: "networkidle0"
    })

    const res = await page.evaluate(handler)

    await page.close()

    return res
}

export {
    getBookInfo,
    getCategoryLinks,
    getCategoryPageLinks
}
