import { Book, DetailDescribe } from './book'

const handler = async (): Promise<Book> => {

    function delay() {
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                resolve()
            }, 1000)
        })
    }

    // 页面出错
    if (document.body.lastElementChild.className === 'page_hurry') {
        return null
    }

    const book: any = {}

    // 随机库存
    book['stock'] = Math.random() * 100 | 0

        // id
    book['id'] = +document.body.getAttribute('ddt-page').slice(2)

    // preview 图片

    const previewImages: string[] = []
    const previewWrap = Array.from(document.querySelectorAll('#main-img-slider > li'))
    previewWrap.forEach(el => {

        if (el.childElementCount === 0) return

        const src = el.firstElementChild.getAttribute('data-imghref')

        if (previewImages.includes(src)) return

        previewImages.push(src)
    })

    book['previews'] = previewImages

    // 获取信息

    const productInfoEle = document.getElementById('product_info')

    book['title'] = productInfoEle.querySelector('h1').getAttribute('title')

    book['subTitle'] = productInfoEle.querySelector('.head_title_name').innerHTML.trim()

    const authorEle = (productInfoEle.querySelector('#author') as HTMLElement)
    book['author'] = authorEle.innerText.slice(3)

    const publisherEle = authorEle.nextElementSibling as HTMLElement
    book['publisherName'] = publisherEle.innerText.slice(4)

    const pubDateEle = publisherEle.nextElementSibling as HTMLElement
    book['pubDate'] = pubDateEle.innerText.slice(5).trim()

    const starEle = (pubDateEle.nextElementSibling as HTMLElement).lastElementChild
    book['star'] = starEle.querySelector('.star').getAttribute('style').slice(6, -1)

    book['commentCount'] = +(starEle.firstElementChild.nextElementSibling as HTMLElement).innerText
    book['price'] = (productInfoEle.querySelector('#original-price') as HTMLElement).innerText.slice(1)
    const ebookElement = productInfoEle.querySelector('#e-book-price')
    if (ebookElement) {
        book['ebook'] = {}
        book.ebook['id'] = ebookElement.getAttribute('href').match(/[0-9]+/)[0]
        book.ebook['ebookPrice'] = ebookElement.innerHTML
    }

    // ------- 关联商品 --------

    const associatedGoods = Array.from(productInfoEle.children[15]
        .lastElementChild.querySelectorAll('.list_e > li > a'))
    book['associatedGoods'] = []

    associatedGoods.forEach((item: Element) => {
        const itemId = item.getAttribute('position').match(/reco_pid=[0-9]+/)[0].split('=')[1]
        const imgSrc = item.firstElementChild.getAttribute('src')
        book['associatedGoods'].push({
            id: +itemId,
            title: (item as HTMLElement).innerText,
            img: imgSrc,
        })
    })

    // ------- detail info

    const detail: DetailDescribe = {
        spec: '',
        paper: '',
        pack: '', // 包装
        isSuit: '', // 套装
        ISBN: '', // 国际标准书号
        classify: []
    }

    const detailDescribe: HTMLElement[] = Array.from(document.querySelectorAll('#detail_describe > ul > li'))
    const detailDescribeLength = detailDescribe.length
    for (let i = 0; i < detailDescribeLength; i++) {

        const [key, value] = detailDescribe[i].innerText.split('：')

        switch (key) {
            case '开 本':
                detail.spec = value;
                break
            case '纸 张':
                detail.paper = value
                break
            case '包 装':
                detail.pack = value
                break
            case '是否套装':
                detail.isSuit = value
                break
            case '国际标准书号ISBN':
                detail.ISBN = value
                break
            case '丛书名':
                detail.series = value
                break
            case '所属分类':
                value.trim().split('>').forEach(category => {
                    detail.classify.push(category.split('\n').join(''))
                })
                break
        }
    }

    book['detailDescribe'] = detail


    // ------------ feature

    const detailElement = document.getElementById('detail')

    const featureElement = detailElement.querySelector('#feature')
    if (featureElement) {
        book['feature'] = featureElement.querySelector('.descrip img').getAttribute('src')
    }

    // ------ abstract 编辑推荐

    const abstractEle = detailElement.querySelector('#abstract')
    if (abstractEle) {

        const strings = (abstractEle.lastElementChild as HTMLElement).innerText.split('\n')

        // 防止空行
        book['abstract'] = strings.filter(str => str.trim()).map(str => str.trim())
    }


    async function transDetailContent(keyName: string, btnId: string, rootElement: HTMLElement) {
        const btn: HTMLElement = rootElement.querySelector(btnId)

        if (btn) btn.click()

        await delay()

        const strings = (rootElement.lastElementChild as HTMLElement).innerText.split('\n')

        if (strings[strings.length - 1] === '显示部分信息') {
            strings.length -= 1
        }

        book[keyName] = strings.filter(str => str.trim()).map(str => str.trim())
    }

    // ------------ author introduction

    const authorIntroduction: HTMLElement = detailElement.querySelector('#authorIntroduction')
    if (authorIntroduction) {
        await transDetailContent('authorIntroduction', '#authorIntroduction-btn', authorIntroduction)
    }

    // ------- toc
    const tocElement: HTMLElement = detailElement.querySelector('#catalog')

    if (tocElement) {

        const btn = tocElement.querySelector('#catalog-btn') as HTMLElement
        if (btn.innerText == '显示全部信息') {
            btn.click()
        }

        await delay()

        const toc: string[] = []
        tocElement.innerText.split('\n').forEach(str => {
            if (str.trim()) {
                toc.push(str.trim())
            }
        })

        book['toc'] = toc

        // await transDetailContent('toc', '#catalog-btn', tocElement)
    }


    // -------- preface

    const prefaceElement: HTMLElement = detailElement.querySelector('#preface')

    if (prefaceElement) {
        await transDetailContent('preface', '#preface-btn', prefaceElement)
    }


    // ------- mediaFeedback

    const mediaFeedbackElement: HTMLElement = detailElement.querySelector('#mediaFeedback')

    if (mediaFeedbackElement) {
        await transDetailContent('mediaFeedback', '#mediaFeedback-btn', mediaFeedbackElement)
    }


    // ------- extract
    const extractElement: HTMLElement = detailElement.querySelector('#extract')

    if (extractElement) {
        await transDetailContent('extract', '#extract-btn', extractElement)
    }


    // ------ attachImage

    const attachImageElement: HTMLElement = document.querySelector('#attachImage')

    if (attachImageElement) {
        const btn: HTMLElement = attachImageElement.querySelector('#attachImage-btn')
        if (btn) btn.click()

        book['attachImage'] = Array.from(
            attachImageElement
                .querySelectorAll('.descrip > #attachImage-show-all > .pic > img'))
            .map((img: Element) => img.getAttribute('data-original'))
    }


    // 出版社
    const publisherElement = document.querySelector('#service-more > .service_more_info')
    if (publisherElement) {

        const publisher: any = {}

        publisher.logo = publisherElement.querySelector('.service_more_info img')
            .getAttribute('src')
        const storeLink = publisherElement.querySelector('.title > a') as HTMLElement
        publisher.name = storeLink.innerText.trim()
        publisher.id = +(storeLink.getAttribute('href').match(/[0-9]+$/)[0])
        publisher.service = (publisherElement.querySelector('#shop-service') as HTMLElement)
            .innerText.split('\n')

        book['publisher'] = publisher
    }

    return book
}

export default handler
