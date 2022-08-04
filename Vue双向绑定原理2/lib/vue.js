class Vue {
    constructor(options) {
        this.$data = options.data
        this.$el = options.el

        // 劫持数据
        new Observer(this.$data, this)
        // 编译数据
        new Compiler(this.$el, this)
    }
}


