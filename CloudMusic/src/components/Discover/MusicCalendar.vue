<template>
    <div class="music-calendar-container">
        <card-header title="音乐日历" />
        <div class="sub-container">
            <div class="item" v-for="(item, index) in 2" :key="index">
                <div class="content">
                    <div class="header">
                        <span class="date">今天</span>
                        <span class="tag">云村热点</span>
                    </div>
                    <p class="text">现代人送花的方式: 分享一起听链接哈哈哈哈哈哈</p>
                </div>
                <div class="meta"></div>
                <div class="cover-wrap">
                    <img
                        class="cover"
                        src="https://p4.music.126.net/2zSNIqTcpHL2jIvU6hG0EA==/109951162868128395.jpg"
                        alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

    import { defineComponent } from "vue"
    import CardHeader from '../common/CardHeader/index.vue'

    export default defineComponent({
        name: 'MusicCalendar',
        components: {
            CardHeader
        }
    })


</script>

<style scoped>

    .music-calendar-container {
        background-color: var(--light-color);
        border-radius: var(--card-radius);
    }

    .sub-container {
        padding: 0 32rem;
    }


    /* 每个 item */

    .item {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 32rem 0;
        border-top: 1px solid var(--five-level);
    }

    /* 左边 */

    .content {
        height: 100rem;
        flex: 1;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .text {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 30rem;
    }

    .header {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .date {
        margin-right: 10rem;
        color: var(--three-level);
        font-size: 28rem;
    }

    .tag {
        color: #EDB120;
        font-size: 24rem;
    }

    /* 元数据 */

    .meta {
        width: 100rem;
    }

    /* 右边 */

    .cover-wrap {
        width: 100rem;
        height: 100rem;
        font-size: 0;
    }

    .cover {
        width: 100%;
        height: 100%;
        border-radius: 24rem;
        overflow: hidden;
    }

</style>
