async function handler() {

    // 页面急
    const hurryElement = document.querySelector('.page_hurry')
    if (hurryElement) return null

    const book: any = {}

    // 随机仓库数量
    book['stock'] = Math.random() * 100 | 0
    // ID
    book['id'] = +(document.body.getAttribute('ddt-page').slice(2))

    // 预览图
    ;(() => {

        book['previewImages'] = []
        const linkElements = document.querySelectorAll('#main-img-slider > li > a')
        linkElements.forEach(ele => {
            const src = ele.getAttribute('data-imghref')

            if (book['previewImages'].includes(src)) return

            book['previewImages'].push(src)
        })

    })()

    // 基础信息
    ;(() => {

        const baseInfoElement = document.getElementById('product_info') as HTMLElement

        // title
        book['title'] = baseInfoElement.querySelector('h1').innerText.trim()

        // sub title
        book['subTitle'] = (baseInfoElement.querySelector('.head_title_name') as HTMLElement).innerText.trim()

        // author
        book['author'] = (baseInfoElement.querySelector('#author') as HTMLElement).innerText.slice(3).trim()

        // 出版时间
        const infoSpans = baseInfoElement.querySelectorAll('.messbox_info > span')
        book['pubDate'] = (infoSpans[infoSpans.length - 1] as HTMLElement).innerText.trim().slice(5)

        book['star'] = baseInfoElement.querySelector('.star').getAttribute('style').slice(6, -1)

        // 价格
        book['price'] = (baseInfoElement.querySelector('#original-price') as HTMLElement).innerText.slice(1)

    })()

    // 电子书信息
    ;(() => {

        const ebookElement = document.getElementById('e-book-price')

        if (!ebookElement) return

        book['ebook'] = {}

        // if (ebookElement.getAttribute) {
            book.ebook['id'] = ebookElement.getAttribute('href').match(/[0-9]+/)[0]
            book.ebook['price'] = ebookElement.innerText
        // }

    })()

    // 关联商品
    ;(() => {

        const relateGoodsElement = document.querySelector('.cuxiao_info.choose_xilie .list_e')

        if (!relateGoodsElement) return

        const goodsList = relateGoodsElement.querySelectorAll('a')

        book['relateGoods'] = []
        goodsList.forEach((goods: HTMLElement) => {
            const info: any = {}
            info['id'] = goods.getAttribute('position').match(/reco_pid=[0-9]+/)[0].slice(9)
            info['title'] = goods.innerText
            info['image'] = goods.firstElementChild.getAttribute('src')

            book.relateGoods.push(info)
        })

    })()

    // 出版社
    ;(() => {

        const publisherElement = document.getElementById('service-more')
        const linkElement = publisherElement.querySelector('.logo_shang > a')

        book['publisher'] = {}

        if (linkElement) {
            book.publisher['id'] = +book.publisher['logo'].match(/[0-9]+/)[0]
            book.publisher['name'] = linkElement.getAttribute('title')
            book.publisher['logo'] = linkElement.getAttribute('href')
        } else {
            book.publisher['name'] = (publisherElement.querySelector('.title_name') as HTMLElement).innerText
        }

        const serviceElement = publisherElement.querySelector('#shop-service') as HTMLElement
        book.publisher['service'] = serviceElement.innerText.split('\n')

    })()

    // 商品信息
    ;(() => {

        const detailElement = document.getElementById('detail_describe')
        const list = Array.from(detailElement.querySelectorAll('li'))

        const keys = list.map(item => item.innerText)

        const detail: any = {}
        keys.forEach(key => {

            const pair: string[] = key.split('：')

            switch (pair[0]) {
                case '开 本':
                    detail['SPEC'] = pair[1]
                    break
                case '纸 张':
                    detail['paper'] = pair[1]
                    break
                case '包 装':
                    detail['package'] = pair[1]
                    break
                case '是否套装':
                    detail['isSuit'] = pair[1]
                    break
                case '国际标准书号ISBN':
                    detail['ISBN'] = pair[1]
                    break
                case '丛书名':
                    detail['series'] = pair[1]
                    break
                case '所属分类':
                    detail['category'] = pair[1].split('>')
                    break
            }
        })

        book['detailDescribe'] = detail

    })()

    // 商品特色
    ;(() => {

        const featureElement = document.getElementById('feature')

        if (!featureElement) return

        book['feature'] = []

        const images = featureElement.querySelectorAll('.descrip img')
        images.forEach(img => {
            book.feature.push(img.getAttribute('src'))
        })

    })()

    // 转换函数
    function translateContent(id: string, key: string) {

        const element = document.getElementById(id)

        if (!element) return

        const button = element.querySelector(`#${id}-btn`)

        if (button && button.innerHTML === '显示全部信息') {
            (button as HTMLElement).click()
        }

        const content = element.querySelector('.descrip') as HTMLElement
        const contentList = Array.from(content.innerText.split('\n'))

        const list = contentList.filter(item => item.trim()).map(item => item.trim())
        if (list.length === 0) return

        const lastString = list.pop()
        if (button && lastString === '显示全部信息' || lastString === '显示部分信息') {
            book[key] = list
            return
        } else {
            list.push(lastString)
            book[key] = list
        }
    }

    // 编辑推荐
    translateContent('abstract', 'abstract')
    // 编辑推荐中存在图片
    ;(() => {
        const abstractElement = document.getElementById('abstract')
        const ps = abstractElement.querySelectorAll('p')

        ps.forEach(item => {
            const link = item.firstElementChild
            if (link && link.tagName === 'IMG') {
                book['feature'] = book['feature'] || []
                book['feature'].push(link.getAttribute('src'))
            } else if (link && link.tagName === 'A') {
                book['feature'] = book['feature'] || []
                book['feature'].push(link.firstElementChild.getAttribute('src'))
            }
        })
    })()

    // 内容简介
    translateContent('content', 'contentIntroduction')

    // 作者简介
    translateContent('authorIntroduction', 'authorIntroduction')

    // 目录
    translateContent('catalog', 'toc')

    // 媒体评论
    translateContent('mediaFeedback', 'mediaFeedback')

    // 前言
    translateContent('preface', 'preface')

    // 试读
    translateContent('extract', 'extract')

    return book
}

export default handler
