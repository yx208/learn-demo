<template>
    <div class="leaderboard-music-container">
        <div class="cover-wrap">
            <img class="cover" src="https://p4.music.126.net/2zSNIqTcpHL2jIvU6hG0EA==/109951162868128395.jpg" alt="">
        </div>
        <div class="info">
            <span class="song-no m-lr-24">1</span>
            <span class="song-name">HAVE A NICE DAY</span>
            <span class="song-singer"> - 魏如萱</span>
        </div>
        <div><i class="iconfont icon-new"></i></div>
    </div>
</template>

<script lang="ts">

    import { defineComponent } from 'vue'

    export default defineComponent({
        name: 'LeaderboardMusic'
    })

</script>

<style scoped>

    .leaderboard-music-container {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .cover-wrap {
        width: 100rem;
        height: 100rem;
        font-size: 0;
        border-radius: 12rem;
        overflow: hidden;
    }

    .cover {
        width: 100%;
        height: 100%;
    }

    .info {
        flex: 1;
        font-size: 28rem;
    }

    .song-name {
        font-weight: bold;
    }

    .song-singer {
        font-size: 24rem;
        color: var(--three-level);
    }

    .leaderboard-music-container .icon-new {
        font-size: 40rem;
        color: #0da76a;
    }

</style>
