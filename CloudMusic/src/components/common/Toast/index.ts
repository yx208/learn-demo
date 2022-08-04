import { createVNode, render, VNode } from 'vue'
import ToastComp from "./index.vue"

let vm: VNode = null
function createToast() {
    vm = createVNode(ToastComp)
    const container = document.createElement('div')
    render(vm, container)
    document.body.append(container)
}

function useToast() {

    if (!vm) {
        createToast()
    }

    // @ts-ignore
    return vm.component.ctx
}

export {
    useToast
}
