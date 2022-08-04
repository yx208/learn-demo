import puppeteer from "puppeteer/lib/cjs/puppeteer/node-puppeteer-core"
import { Browser } from "puppeteer/lib/cjs/puppeteer/common/Browser"
import { EventType } from 'puppeteer/lib/cjs/vendor/mitt/src'
import { Page } from "puppeteer/lib/cjs/puppeteer/common/Page"
import Stack from "../lib/Stack"
import {Target} from "puppeteer/lib/cjs/puppeteer/common/Target";

class BrowserManager {

    private browser: Browser = null
    private pages: Stack<Page> = null

    constructor() {
        this.pages = new Stack<Page>()
    }

    public async launch() {
        this.browser = await puppeteer.launch({
            defaultViewport: {
                width: 1524,
                height: 763
            }
        })
        console.log('⚡ 启动浏览器')
    }

    public async createPage(maxPageWaitTime = 60000): Promise<Page> {
        const page = await this.browser.newPage()
        console.log('⚡ 创建页面')

        page.setDefaultNavigationTimeout(maxPageWaitTime)

        this.pages.push(page)

        return page
    }

    public async freePage() {
        await this.pages.lastElement().close()
        console.log('⚡ 关闭页面')
        this.pages.pop()
    }

    public getPageCount(): number {
        return this.pages.size()
    }

    public async close() {
        console.log('⚡ 关闭浏览器')
        await this.browser.close()
    }

    public async getPages() {
        return await this.browser.pages()
    }

    public async on<T>(eventName: EventType, callBack: (target: Target) => Promise<T>) {
        return this.browser.on(eventName, callBack)
    }

    public getBrowser(): Browser {
        return this.browser
    }
}

export default BrowserManager
