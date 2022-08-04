<template>
    <header @load="imageLoaded" class="header-full" ref="wrap">
        <h1 class="author">白衣莹墨（INMO）</h1>
        <div class="verse-container">
            <span class="verse">{{ verse.hitokoto }}</span>
            <span class="verse-author">- {{ verse.from_who }}《{{ verse.from }}》</span>
        </div>
        <div class="community">
            <i class="iconfont icon-github"></i>
            <i class="iconfont icon-bilibili"></i>
            <i class="iconfont icon-juejin"></i>
            <i class="iconfont icon-segmentfault"></i>
        </div>
        <div class="header-next" @click="onNextPage"><i class="iconfont icon-next-page"></i></div>
    </header>
</template>

<script lang="ts">

    import { defineComponent, onMounted, onBeforeUpdate, ref, nextTick } from 'vue'
    import VerseModel from '/@models/verse'
    import { isLoading } from '/@/utils/globalVar'

    export default defineComponent({
        name: 'FullScreen',
        async setup() {
            const res = await new VerseModel().getVerse()
            const wrap = ref<HTMLElement | null>(null)
            const img = new Image()
            img.src = 'http://cdn.eqingchen.top/blog/homeCover.png'
            img.onload = () => {
                if (wrap.value) {
                    wrap.value.style.backgroundImage = `url(${img.src})`
                    nextTick(() => isLoading.value = false)
                }
            }
            
            return {
                verse: res,
                wrap
            }
        },
        methods: {
            onNextPage() {
                window.scrollTo({ top: document.body.clientHeight, behavior: 'smooth' })
            }
        }
    })

</script>

<style scoped>

    .header-full {
        user-select: none;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        width: 100%;
        height: 100%;
        background-position: center center;
        background-size: cover;
        background-repeat: no-repeat;
        color: var(--night-primary-font-color);
        position: relative;
    }

    .header-full .author {
        font-size: 56px;
        margin: 16px 0;
    }

    .header-full .verse-container {
        font-size: 22px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        text-align: center;
        color: var(--night-second-font-color);
    }

    .header-full .header-next {
        cursor: pointer;
        position: absolute;
        left: 50%;
        bottom: 0;
        width: 100%;
        height: 60px;
        text-align: center;
        transform: translateX(-50%);
    }

    .header-next .icon-next-page {
        display: inline-block;
        font-size: 22px;
        color: rgba(200, 200, 200, 1);
        animation: next-page-icon-animate 1.6s infinite;
    }

    .header-full .community  {
        margin-top: 20px;
        color: var(--night-second-font-color);
    }

    .community .iconfont {
        font-size: 22px;
        margin: 0 6px;
    }


    @keyframes next-page-icon-animate {
        50% {
            transform: translateY(80%);
            color: rgba(90, 99, 130, 4);
        }
    }

    @media screen and (max-width: 400px) {
        .header-full .author {
            font-size: 26px;
        }

        .header-full .verse-container {
            font-size: 18px;
        }

        .community .iconfont {
            font-size: 20px;
        }
    }

</style>
