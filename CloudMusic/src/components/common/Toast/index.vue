<template>
    <transition name="toast">
        <div class="toast" v-show="visible">
            <div class="toast-message">{{ message }}</div>
        </div>
    </transition>
</template>

<script lang="ts">

    import { defineComponent, ref } from 'vue'

    export default defineComponent({
        name: 'Toast',
        setup() {

            const visible = ref(false)

            const close = () => {
                visible.value = false
            }

            const message = ref('')
            const open = (showMessage: string, delay = 2000) => {

                if (visible.value) return

                message.value = showMessage
                visible.value = true
                setTimeout(close, delay)
            }

            return {
                open,
                visible,
                message
            }
        }
    })

</script>

<style scoped>

    .toast {
        display: flex;
        justify-content: center;
        width: 100vw;
        position: fixed;
        z-index: 99;
        left: 50%;
        bottom: 100rem;
        transform: translateX(-50%);
    }

    .toast-message {
        display: inline-flex;
        max-width: 560rem;
        padding: 10px 20px;
        border-radius: 100px;
        font-size: 32rem;
        color: var(--primary-font-color);
        background-color: #fff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .06);
    }

    .toast-enter-active,
    .toast-leave-active {
        transition: all .3s;
    }

    .toast-enter-from,
    .toast-leave-to {
        opacity: 0;
    }

</style>
