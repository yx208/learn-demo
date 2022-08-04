
class Observer {
    constructor(data, vm) {

        // $data === $vm.$data
        this.$vm = vm

        // 定义代理
        this.observe(data)
    }
    observe(data) {
		
		// 是否是一个对象
        if (!data || typeof data !== 'object') return

        Object.keys(data).forEach(key => {
            this.defineReactive(data, key, data[key])
            // 代理实例对象
            this.proxyData(key)
        })
    }
    defineReactive(obj, key, value) {

        // 递归子对象
        this.observe(value)

		// 创建一个发布者
        const dep = new Dependence()

		// 劫持数据
        Object.defineProperty(obj, key, {
            get() {
                Dependence.target && dep.addSubscriber(Dependence.target);
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
        let _vm = this.$vm
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

