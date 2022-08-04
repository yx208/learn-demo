import marked from 'marked'
import highlight from 'highlight.js'

// match next line the regexp
const NEW_LINE_REG = /\n(?!$)/g;

const rendererMd = new marked.Renderer()
rendererMd.code = (code: string, lang: string) : string => {

    if (lang) {
        const highlightCode = highlight.highlight(lang, code)
        code = `<figure><pre><code class="language-${lang}">${highlightCode.value}</code></pre></figure>`
    }

    return code
}

// set marked options
marked.setOptions({
    smartLists: true,
    smartypants: true,
    renderer: rendererMd
})

/**
 * package element
 * @param {Element}preContainer <pre> tag container element
 * @returns {Element} packaged element
 */
function packCode(preContainer: Element) : Element | null {

    /**
     * --------------------------
     * |       JavaScript       |
     * |------------------------|
     * | 1 |                    |
     * | 2 |       code         |
     * | 3 |                    |
     * --------------------------
     */

    if (!preContainer) return null

    const codeEle = preContainer.querySelector('code')
    if (!codeEle) return null

    // 匹配有多少行
    const matchWrap = codeEle.innerHTML.match(NEW_LINE_REG)
    if (!matchWrap) return null

    const wrapCount = matchWrap.length + 1

    // 行数计数
    const lineSpan = document.createElement('div')
    lineSpan.className = 'syntax-line-container'
    lineSpan.innerHTML = '<span class="syntax-line"></span>'.repeat(wrapCount)

    // 插入头标签
    const codeHeader = document.createElement('header')
    const lang = codeEle.className.split('-')[1]
    codeHeader.className = 'syntax-header'
    codeHeader.innerHTML = `<i class="iconfont icon-code"></i><span>${lang.toUpperCase()}</span>`
    
    // 插入 DOM
    preContainer.insertBefore(lineSpan, preContainer.firstElementChild)
    preContainer.insertBefore(codeHeader, preContainer.firstElementChild)
    preContainer.className = 'syntax-container'

    return preContainer
}

/**
 * markdown to html
 * @param {string}markdownText Raw markdown string
 * @returns {Element} Article container
 */
function useMd2Html(markdownText: string) : Element {

    const articleEle = document.createElement('article')
    articleEle.id = 'article'
    articleEle.innerHTML = marked(markdownText)

    // 获取所有需要包装的 <pre>
    const packs = articleEle.querySelectorAll('figure')
    for (const pack of packs) {
        packCode(pack)
    }

    // 包装 <pre>
    // packCode()

    return articleEle
}

export {
    useMd2Html
}
