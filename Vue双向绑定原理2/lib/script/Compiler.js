
class Compiler {
    constructor(el, vm) {
        this.$el = document.querySelector(el)
        this.$vm = vm

        // 是否有这个元素
        if (this.$el) {
            // 创建文档片段
            this.$frag = this.node2Fragment(this.$el)
            // 编译文档片段
            this.compile(this.$frag)
            // 把文档片段里面的内容添加进 DOM
            this.$el.appendChild(this.$frag)
        }
    }
    // 把节点下的元素添加进文档片段
    node2Fragment(el) {
        const frag = document.createDocumentFragment()

        let child
        while (child = el.firstChild) frag.appendChild(child)

        return frag
    }
    // 是否是元素节点
    isElement(node) {
        return node.nodeType === 1
    }
    // 是否是插值元素
    isInterpolation(node) {
        return (node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent))
    }
    // 编译
    compile(el) {

        // 获取这个节点下的所有子元素
        const nodes = el.childNodes

        // 子元素列表转换为数组
        Array.from(nodes).forEach(node => {

            // 如果是文本节点
            if (this.isElement(node)) {
                // 编译元素节点
                this.compileElement(node)
            }
            // 如果是文本节点
            else if (this.isInterpolation(node)) {
                this.compileText(node)
            }

            // 如果这个节点下面还有其他的节点
            if (node.childNodes && node.childNodes.length > 0) this.compile(node)
        })
    }
    // 编译元素节点
    compileElement(node) {

        // 获取这个节点的所有属性
        const attrs = node.attributes

        // 属性列表转数组并遍历
        Array.from(attrs).forEach(attr => {

            // 获取这个属性的名
            const attrName = attr.name
            // 获取这个属性的值，也就是绑定的变量
            const key = attr.value

            // 判断是否是指令
            if (attrName.startsWith('v-')) {
                // 取出指令名称 v-model -> model
                const dir = attrName.substring(2)
                // 执行处理这个指令的方法
                this[dir] && this[dir](node, key)
            } else if (attrName.startsWith('@')) {
                const eventName = attrName.substring(1)
                this.eventHandler(node, value, eventName)
            }
        })
    }
    // 编译文本节点
    compileText(node) {
        const key = RegExp.$1.trim()
        this.update(node, key, 'text')
    }
    // 处理时间绑定
    eventHandler(node, key, eventName) {
        const fn = this.$vm.$options.methods && this.$vm.$options.methods[key]

        if (eventName && fn) node.addEventListener(eventName, fn.bind(this.$vm))
    }
    /*
     * 根据 dir 分别处理对应的指令
     */
    update(node, key, dir) {
        // 更新这个指令所绑定的节点的内容
        this[`${dir}Updator`](node, this.$vm[key])

        new Watcher(this.$vm, key, () => {
            this[`${dir}Updator`](node, this.$vm[key])
        })
    }


    // 指令处理

    model(node, key) {

        // 更新，为元素选择适合的数据更新方式
        this.update(node, key, 'model')

        node.addEventListener('input', (e) => {
            this.$vm[key] = e.target.value
        })
    }
    text(node, key) {
        this.update(node, key, 'text')
    }
    html(node, key) {
        this.update(node, key, 'html')
    }


    // 更新

    modelUpdator(node, value) {
        node.value = value
    }
    htmlUpdator(node, value) {
        node.innerHTML = value
    }
    textUpdator(node, value) {
        node.nodeValue = value
    }
}

