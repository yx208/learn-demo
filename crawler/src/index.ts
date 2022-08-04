import { sequelize } from './sql/sequelize'
import crawler from "./core/crawler";
import puppeteer from "puppeteer/lib/cjs/puppeteer/node-puppeteer-core"
import { getBookInfo } from './core/book'
import {saveBook, savePublisher} from "./sql/saveToSql"
import fs from "fs"
import { resolve, dirname, extname } from "path"
import axios from "axios"
import {create} from "domain";

async function main() {

    const url: string = 'http://img53.ddimg.cn/99999990211491503.jpg'
    await downloadImage(__dirname + '/books/images/images', 'img' + extname(url), url)

    /*
        结构划分
        /books
            /computer
                /program
                    /26912981
                    /26978981
                /network
                    /26912981
                    /26978981
            /art
            /life
     */


    // const browser = await puppeteer.launch()
    // const res = await getBookInfo(browser, 'http://product.dangdang.com/26912981.html')
    //
    // writeFileSync(resolve(__dirname, './books/book.json'), JSON.stringify(res), 'utf-8')
    // // await saveBook(res)
    // await browser.close()

    // await crawler()
    // await sequelize.close()
}

/**
 * 保证目录存在
 * @param path
 */
function createDirectory(path: string) {

    if (fs.existsSync(path)) return true

    if (createDirectory(dirname(path))) {
        fs.mkdirSync(path)

        return true
    }
}

/**
 * 下载图片
 * @param path 保存的路径
 * @param name 文件名
 * @param url 图片地址
 */
async function downloadImage(path: string, name: string, url: string) {

    // 目录存在
    createDirectory(path)

    const filePath = resolve(path, name)
    const writerStream = fs.createWriteStream(filePath)

    const response = await axios({
        url,
        method: 'GET',
        responseType: "stream"
    })

    response.data.pipe(writerStream)

    return new Promise((resolve, reject) => {
        writerStream.on('finish', resolve)
        writerStream.on('error', reject)
    })
}


try {
    main().then(() => {
        console.log('✔ 执行完毕')
    })
} catch (err) {
    console.log(err)
}



