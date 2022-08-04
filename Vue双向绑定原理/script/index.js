
// 将 vue 中 data 的内容绑定到输入文本框和文本节点
// 当文本框的内容发生改变时，vue 实例中的 data 也同时发生变化
// 当 data 中的数据发生变化时，输入的文本框节点的内容也发生变化


// 劫持数据 Observer -> 收集依赖 Dependence -> 创建观察者 Watcher -> 编译模板 Compile


class Vue {
    constructor(options) {
        this.$data = options.data
        this.$el = options.el

        // 劫持数据
        new Observer(this.$data, this)
        // 编译数据
        new Compiler(document.querySelector(this.$el), this)
    }
}




