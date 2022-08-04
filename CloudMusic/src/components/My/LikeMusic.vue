<template>
    <div class="card like-music-container">
        <div class="cover-wrap"><img class="cover" src="@/assets/images/avatar.jpg" alt=""></div>
        <div class="content">
            <span class="name">我喜欢的音乐</span>
            <span class="count">1043首</span>
        </div>
        <div class="f-r-center mode">
            <i class="iconfont icon-ziyuan"></i>
            <span class="mode-name">心动模式</span>
        </div>
    </div>
</template>

<script lang="ts">

    import { defineComponent } from "vue"

    export default defineComponent({
        name: 'LikeMusic'
    })

</script>

<style scoped>

    .like-music-container {
        margin: 0 32rem;
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .cover-wrap {
        width: 100rem;
        height: 100rem;
        overflow: hidden;
        font-size: 0;
        border-radius: var(--sub-radius);
    }

    .cover {
        width: 100%;
        height: 100%;
    }

    .content {
        margin-left: 20rem;
        flex: 1;
        display: flex;
        flex-direction: column;
    }

    .name {
        font-weight: bold;
        margin-bottom: 8rem;
        font-size: 28rem;
    }

    .count {
        font-size: 20rem;
    }

    .mode {
        padding: 4rem 16rem;
        height: 40rem;
        line-height: 40rem;
        border: 1px solid var(--grap-color);
        border-radius: 32rem;
        font-size: 22rem;
    }

    .mode-name {
        margin-left: 4rem;
        height: 100%;
        line-height: 42rem;
    }

</style>
