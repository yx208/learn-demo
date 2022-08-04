
class Watcher {
    constructor(node, name, vm) {
        this.node = node
        this.name = name
        this.$vm = vm
        Dependence.target = this
        this.update()
        Dependence.target = null
    }
    update() {
        this.get()
        this.node.nodeValue = this.value
    }

    get() {
        this.value = this.$vm[this.name]
    }
}

























// class Watcher {
//     constructor(vm, node, name) {
//         Dep.target = this
//         this.vm = vm
//         this.node = node
//         this.name = name
//         this.update()
//         Dep.target = null
//     }

//     update() {
//         this.get()
//         this.node.nodeValue = this.value
//     }


//     get() {
//         this.value = this.vm[this.name]
//     }
// }


