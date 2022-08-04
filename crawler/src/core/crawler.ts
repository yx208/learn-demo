import { writeFileSync } from "fs"
import { resolve } from "path"
import puppeteer from "puppeteer/lib/cjs/puppeteer/node-puppeteer-core"
import {Book, getBookInfo, getCategoryLinks, getCategoryPageLinks} from "./book"
import { saveBook, savePublisher } from '../sql/saveToSql'

async function crawler() {

    const browser = await puppeteer.launch({
        defaultViewport: { width: 1524, height: 763 }
    })

    // 获取所有分类的链接
    // const cateLinks = await getCategoryLinks(browser, 'http://category.dangdang.com/?ref=www-0-C')
    // for (const page of cateLinks) {

        // 获取某分类的一页中的书本链接
        const pageLinks = await getCategoryPageLinks(browser, 'http://category.dangdang.com/pg1-cp01.54.06.00.00.00.html')

        let books: Book[] = []

        // 获取书本信息
        for (let i = 0; i < pageLinks.length; i++) {

            await delayOfMs()

            let isHurry = false
            do {

                await delayOfMs(10000)

                let time = Date.now()
                const book = await getBookInfo(browser, pageLinks[i])
                time = Date.now() - time

                if (book === null) {

                    isHurry = true

                    console.log('Page Hurry!')

                } else {

                    books.push(book)
                    console.log("Read: ", book.title, ' ==> 花费时间: ', time, ' 毫秒')

                    isHurry = false
                }

                await delayOfMs(30000)

            } while (isHurry)


            if (books.length >= 10) {

                for (const book of books) {
                    await saveBook(book)
                }

                books = []
            }

            // const fileName = resolve(__dirname, `../books/${ book.id }.json`)
            // writeFileSync(fileName, JSON.stringify(book), 'utf-8')
            // await saveBook(book)
            // await savePublisher(book.publisher)
        }

        // for (const book of books) {
        //     await saveBook(book)
        // }

    // }

    await browser.close()
}

function delayOfMs(delay = 10000) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

export default crawler
