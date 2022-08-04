
class Observer {
    constructor(data, vm) {
        this.$vm = vm
        this.iterationReactive(data)
    }
    iterationReactive(obj) {
        Object.keys(obj).forEach(key => {
            const value = obj[key]

            if (typeof value === 'object')
                this.iterationReactive(value)
            else {
                this.defineReactive(obj, key, value)
                this.proxyData(key)
            }
        })
    }
    defineReactive(obj, key, value) {

        const dep = new Dependence()

        Object.defineProperty(obj, key, {
            get() {

                if (Dependence.target) dep.addSubscriber(Dependence.target)

                return value
            },
            set(newValue) {
                if (newValue === value) return

                value = newValue
                dep.notify()
            }
        })
    }
    proxyData(key) {
        const _vm = this.$vm
        Object.defineProperty(this.$vm, key, {
            get() {
                return _vm.$data[key]
            },
            set(newValue) {
                _vm.$data[key] = newValue
            }
        })
    }
}
