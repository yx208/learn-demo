<template>
    <div class="f-r-center player-progress-container">
        <span class="current-time">03:25</span>
        <div
            class="inner-container"
            @touchstart.stop="onTouchStart"
            @touchmove.stop="onTouchMove"
            @touchend.stop="onTouchEnd">
            <div
                class="progress-bg"
                ref="progressRef">
                <div class="progress">
                    <div class="dot"></div>
                </div>
            </div>
        </div>
        <span class="end-time">04:23</span>
    </div>
</template>

<script lang="ts">

    import { defineComponent, ref, onMounted } from "vue"

    export default defineComponent({
        name: 'PlayerProgress',
        emits: ['changeProgress'],
        setup(props, { emit }) {

            const progressRef = ref<HTMLElement>(null)

            let offsetLeft = 0
            let progressEle: HTMLElement
            let pMAX = 0
            let pMIN = 0
            let pos = 0

            onMounted(() => {
                progressEle = progressRef.value.firstElementChild as HTMLElement
                pMAX = progressRef.value.offsetWidth
                offsetLeft = progressEle.offsetLeft
            })

            function onTouchStart(event: TouchEvent) {
                pos = (event.targetTouches[0].pageX - offsetLeft)

                progressEle.style.width = pos + 'px'
            }

            function onTouchMove(event: TouchEvent) {
                pos = (event.targetTouches[0].pageX - offsetLeft)

                if (pos >= pMIN && pos <= pMAX) {
                    progressEle.style.width = pos + 'px'
                }
            }

            function onTouchEnd() {
                emit('changeProgress', pos)
            }

            return {
                onTouchStart,
                onTouchMove,
                onTouchEnd,
                progressRef
            }
        }
    })

</script>

<style scoped>

    .player-progress-container {
        padding: 48rem;
        font-size: 24rem;
    }

    .inner-container {
        flex: 1;
        margin: 0 24rem;
        padding: 16rem 0;
    }

    .progress-bg {
        height: 6rem;
        border-radius: var(--card-radius);
        background-color: var(--subtitle);
    }

    .progress {
        width: 80%;
        height: 100%;
        position: relative;
        border-radius: var(--card-radius);
        background-color: var(--three-level);
    }

    .dot {
        position: absolute;
        right: 0;
        top: 50%;
        width: 20rem;
        height: 20rem;
        transform: translate(50%, -50%);
        background-color: var(--five-level);
        border-radius: 50%;
    }

</style>
