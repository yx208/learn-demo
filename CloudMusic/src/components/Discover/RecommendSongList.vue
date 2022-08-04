<template>
    <div class="recommend-song-list">
        <card-header title="推荐歌单" />
        <div class="sub-container">
            <div class="inner-container">
                <div class="item" v-for="(item, index) in 6" :key="index">
                    <div class="cover-wrap"><img
                        class="cover"
                        src="https://p4.music.126.net/2zSNIqTcpHL2jIvU6hG0EA==/109951162868128395.jpg"
                        alt=""></div>
                    <div class="name">高低山谷[粤语]</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

    import { defineComponent } from "vue"
    import CardHeader from '../common/CardHeader/index.vue'

    export default defineComponent({
        name: 'RecommendSongList',
        components: {
            CardHeader
        }
    })

</script>

<style scoped>

    .recommend-song-list {
        padding-bottom: 32rem;
        background-color: var(--light-color);
        border-radius: 0 0 var(--card-radius) var(--card-radius);
    }

    .sub-container {
        width: 100%;
        overflow: hidden;
    }

    .inner-container {
        padding: 0 32rem;
        overflow: auto hidden;
        white-space: nowrap;
    }

    .item {
        width: 200rem;
        position: relative;
        display: inline-block;
        margin-right: 16rem;
        padding-top: 6rem;
    }

    .item:last-child {
        margin-right: 0;
    }

    .item::before {
        content: "";
        position: absolute;
        z-index: 0;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 94%;
        height: 200rem;
        background-color: var(--five-level);
        border-radius: var(--card-radius) var(--card-radius) 0 0;
    }

    .cover-wrap {
        position: relative;
        z-index: 99;
        width: 200rem;
        height: 200rem;
        font-size: 0;
        border-radius: var(--card-radius);
        overflow: hidden;
    }

    .cover {
        width: 100%;
        height: 100%;
    }

    .name {
        width: 100%;
        margin-top: 10rem;
        font-size: 26rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
        white-space: break-spaces;
    }

</style>

