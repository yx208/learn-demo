class Watcher {
    constructor(vm, name, cb) {
        this.$vm = vm
        this.$name = name
        this.$cb = cb

        Dependence.target = this
        // this.update()

        // 会触发 getter 将当前实例添加进 subscribe
        this.$vm[this.$name]

        Dependence.target = null
    }
    update() {
        // this.get()
        // this.$vm[this.$name] = this.$value
        this.$cb(this.$vm[this.$name])
    }

    get() {
        this.$value = this.$vm[this.$name]
    }
}

