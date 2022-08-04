
class Compiler {
    constructor(root, vm) {
        this.$vm = vm
        this.$frag = this.nodeToFragment(root)

        this.compile(this.$frag)
        root.appendChild(this.$frag)
    }
    nodeToFragment(root) {
        const frag = document.createDocumentFragment()

        let child = null
        while (child = root.firstChild) frag.appendChild(child)

        return frag
    }
    compile(el) {

        const nodes = el.childNodes

        Array.from(nodes).forEach(node => {

            if (this._isElement(node)) {
                this.compileElement(node)
            } else if (this._isInterpolation(node)) {
                this.compileText(node)
            }

            if (node.childNodes && node.childNodes.length > 0) this.compile(node)

        })
    }
    compileElement(node) {
        const attrs = node.attributes
        Array.from(attrs).forEach(attr => {
            const attrName = attr.name,
                attrValue = attr.value

            if (attrName.startsWith('v-')) {
                const dir = attrName.substring(2)
                this[dir] && this[dir](node, attrValue)
            }
        })
    }
    compileText(node) {
        const name = RegExp.$1.trim()
        node.nodeValue = this.$vm[name]

        new Watcher(node, name, this.$vm)
    }
    _isDirective(attr) {
        return attr.startsWith('v-')
    }
    _isElement(node) {
        return node.nodeType === 1
    }
    // 是否是插值
    _isInterpolation(node) {
        return (node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.nodeValue))
    }
    handleDirective(node, key, value) {
        switch (key) {
            case 'v-model': this.model(node, value); break;
            case 'v-on': this.on(node, value); break;
        }
    }
    model(node, value) {
        node.value = this.$vm[value]
        node.removeAttribute('v-model')

        new Watcher(node, value, this.$vm)

        node.addEventListener('input', (e) => {
            this.$vm[value] = e.target.value
        })
    }
    on() {

    }
}
