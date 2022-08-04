import { ref, onMounted, onActivated, onDeactivated, onUnmounted } from 'vue'

function throttling(fn: Function, threshold = 10) {

    let count = 0

    return () => {

        if (count <= threshold) {
            ++count
            return
        } else {
            count = 0
            fn()
        }
    }
}

function useScrollPosition() {

    const top = ref(0)

    function onScroll() {
        top.value = document.documentElement.scrollTop
    }

    const throttled = throttling(onScroll, 0)

    onActivated(() => {
        document.addEventListener('scroll', throttled)
    })
    onMounted(() => {
        document.addEventListener('scroll', throttled)
    })
    onDeactivated(() => {
        document.removeEventListener('scroll', throttled)
    })
    onUnmounted(() => {
        document.removeEventListener('scroll', throttled)
    })

    return {
        top
    }
}

export {
    useScrollPosition
}
