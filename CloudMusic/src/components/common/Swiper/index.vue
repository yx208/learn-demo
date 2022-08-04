<template>
    <div class="swiper-container" ref="swiperRef">
        <div class="inner-container">
            <div class="swiper-item" v-for="(item, index) in list" :key="index">
                {{ index }}
            </div>
        </div>
    </div>
</template>

<script lang="ts">

    import {
        defineComponent,
        onBeforeMount,
        onMounted,
        ref
    } from "vue"

    export default defineComponent({
        name: 'Swiper',
        props: {
            // list: {
            //     type: Array,
            //     default() {
            //         return []
            //     }
            // }
        },
        setup() {
            const list = [1, 2, 3, 4, 5, 6]
            const swiperRef = ref(null)

            onMounted(() => {
                const swiperWidth = swiperRef.value.offsetWidth
                swiperRef.value.firstElementChild.style.width = swiperWidth * list.length + 'px'
            })

            return {
                list,
                swiperRef
            }
        }
    })

</script>

<style scoped>

    .swiper-container {
        width: 100%;
        height: 400rem;
        background-color: pink;
        overflow: hidden;
    }

    .inner-container {
        display: flex;
        flex-direction: row;
        height: 100%;
    }

    .swiper-item {
        flex: 1;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: teal;

        font-size: 80rem;
    }

    .swiper-item:nth-child(odd) {
        background-color: deepskyblue;
    }

</style>
