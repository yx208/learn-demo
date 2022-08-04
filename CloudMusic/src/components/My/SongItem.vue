<template>
    <div class="song-item-container">
        <div class="cover-wrap"><img class="cover" src="@/assets/images/avatar.jpg" alt=""></div>
        <div class="content">
            <p class="title">白衣莹墨的2020年度歌单</p>
            <p class="count">10首</p>
        </div>
        <div><i class="iconfont icon-more"></i></div>
    </div>
</template>

<script lang="ts">

    import { defineComponent } from "vue"

    export default defineComponent({
        name: 'SongItem'
    })

</script>

<style scoped>

    .song-item-container {
        display: flex;
        align-items: center;
    }

    .song-item-container .icon-more {
        color: var(--three-level);
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
        margin-left: 16rem;
        flex: 1;
        overflow: hidden;
    }

    .title {
        font-weight: bold;
        font-size: 28rem;
        margin-bottom: 8rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .count {
        font-size: 22rem;
        color: var(--subtitle);
    }

</style>
