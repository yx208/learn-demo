<template>
    <section
        class="full-loading"
        :class="{ hide: isHide }"
        v-show="loaderVisible"
        @touchmove.prevent
        @mousewheel.prevent>
        <div class="loader">
            <div>L</div>
            <div>O</div>
            <div>A</div>
            <div>D</div>
            <div>I</div>
            <div>N</div>
            <div>G</div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </section>
</template>

<script lang="ts">
    import { defineComponent, watch, ref } from "vue"
    import { isLoading } from "/@/utils/globalVar"

    export default defineComponent({
        name: "FullLoading",
        setup() {
            const loaderVisible = ref(false)
            const isHide = ref(false)

            watch(isLoading, () => {
                if (isLoading.value) {
                    loaderVisible.value = true
                } else {
                    isHide.value = true
                    setTimeout(() => {
                        isHide.value = false
                        loaderVisible.value = false
                    }, 400)
                }
            })

            return {
                loaderVisible,
                isHide
            }
        },
    })
</script>

<style scoped>

    .full-loading {
        position: fixed;
        z-index: 9999;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #1d3557;
        font-family: 'Open Sans';
        font-weight: 100;
        color: #fff;
        transition: .4s;
        animation: loader-show .4s;
    }

    @keyframes loader-show {
        0% {
            opacity: 0;
        }
    }

    .loader {
        position: absolute;
        width: 80%;
        height: 5rem;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        font-size: 4vw;
    }

    .loader > div {
        user-select: none;
        position: absolute;
        bottom: 0;
        right: 0;
        opacity: 0;
        text-align: center;
        transform: rotate(180deg) translate(0, 0);
        animation: move 2s linear infinite;
    }

    .loader > div:nth-child(2) { animation-delay: .2s; }
    .loader > div:nth-child(3) { animation-delay: .4s; }
    .loader > div:nth-child(4) { animation-delay: .6s; }
    .loader > div:nth-child(5) { animation-delay: .8s; }
    .loader > div:nth-child(6) { animation-delay: 1s; }
    .loader > div:nth-child(7) { animation-delay: 1.2s; }

    .loader > div:nth-child(8) {
        animation-delay: 1.4s;
        background: #DB2F00;
    }

    .loader > div:nth-child(9) {
        animation-delay: 1.6s;
        background: #f2f2f2;
    }

    .loader > div:nth-child(10) {
        animation-delay: 1.8s;
        background: #13A3A5;
    }

    .loader > div:nth-child(8),
    .loader > div:nth-child(9),
    .loader > div:nth-child(10) {
        bottom: .8vw;
        width: 3vw;
        height: 3vw;
        font-size: 0;
        border-radius: 50%;
    }

    .hide {
        opacity: 0;
    }

    @keyframes move {
        0% {
            right: 0;
            opacity: 0;
            transform: rotate(180deg) translate(0, 0);
        }

        30% {
            right: 36%;
            opacity: 1;
            transform: rotate(0) translate(0, 20px);
        }

        68% {
            right: 62%;
            opacity: 1;
            transform: rotate(0) translate(0, 20px);
        }

        100% {
            right: 100%;
            opacity: 0;
            transform: rotate(-180deg) translate(0, 0);
        }
    }

    /* @media screen and (max-width: 600px) {
        .loader {
            font-size: 1.8rem;
        }

        .loader > div:nth-child(8),
        .loader > div:nth-child(9),
        .loader > div:nth-child(10) {
            width: 1.6rem;
            height: 1.6rem;
        }
    } */





    /* .loader {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        -webkit-touch-callout: none;
        user-select: none;
        width: 80%;
        height: 5rem;
        overflow:visible;
    }

    .loader div {
        position:absolute;
        width: 5rem;
        height: 5rem;
        opacity: 0;
        animation: move 2s linear infinite;
        transform: rotate(180deg);
        color: #fff;
        font-size: 5rem;
    }

    .loader div:after {
        content: '';
        position: absolute;
        bottom: -1rem;
        left: 0;
        right: 0;
        height: 4px;
        background: rgba(255, 255, 255, .4);
        border-radius: 50%;
    }

    .loader div:nth-child(8)::before,
    .loader div:nth-child(9)::before,
    .loader div:nth-child(10)::before {
        content: '';
        position: absolute;
        left: 0;
        bottom: -1rem;
        width: 5rem;
        height: 5rem;
        border-radius: 100%;
    }

    .loader div:nth-child(8)::before{
        background:#DB2F00;
    }
    .loader div:nth-child(9)::before{
        background:#f2f2f2;
    }
    .loader div:nth-child(10)::before{
        background:#13A3A5;
    }

    .loader div:nth-child(2) {
        animation-delay:0.2s;
    }
    .loader div:nth-child(3) {
        animation-delay:0.4s;
    }
    .loader div:nth-child(4) {
        animation-delay:0.6s;
    }
    .loader div:nth-child(5) {
        animation-delay:0.8s;
    }
    .loader div:nth-child(6) {
        animation-delay:1s;
    }
    .loader div:nth-child(7) {
        animation-delay:1.2s;
    }
    .loader div:nth-child(8) {
        animation-delay:1.4s;
    }
    .loader div:nth-child(9) {
        animation-delay:1.6s;
    }
    .loader div:nth-child(10) {
        animation-delay:1.8s;
    }

    @keyframes move {
        0% {
            right:0;
            opacity:0;
        }
        35% {
            right: 41%;
            transform: rotate(0deg) translateZ(0);
            opacity:1;
        }
        65% {
            right:59%;
            transform: rotate(0deg) translateZ(0); 
            opacity:1;
        }
        100% {
            right:100%; 
            transform: rotate(-180deg) translateZ(0);
            opacity:0;
        }
    }

    @media screen and (max-width: 600px) {
        .full-loading {
            font-size: 1.4rem;
        }

        .loader {
            height: 1.4rem;
        }

        .loader div {
            font-size: 2.4rem;
            width: 14px;
            height: 14px;
        }

        .loader div:after {
            bottom: -20px;
        }

        .loader div:nth-child(8)::before,
        .loader div:nth-child(9)::before,
        .loader div:nth-child(10)::before {
            bottom: -8px;
            width: 14px;
            height: 14px;
        }
    } */

</style>
