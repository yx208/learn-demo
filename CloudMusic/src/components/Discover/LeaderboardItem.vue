<template>
    <div class="leaderboard-item-container">
        <div class="title"><text>硬地原创音乐榜</text><i class="iconfont icon-arrow-right-1"></i></div>
        <div class="list">
            <leaderboard-music class="item" />
            <leaderboard-music class="item" />
            <leaderboard-music class="item" />
        </div>
    </div>
</template>

<script lang="ts">

    import { defineComponent } from "vue"
    import LeaderboardMusic from "./LeaderboardMusic.vue"

    export default defineComponent({
        name: 'LeaderboardItem',
        components: {
            LeaderboardMusic
        }
    })

</script>

<style scoped>

    .leaderboard-item-container {
        padding: 32rem;
        box-shadow: 2rem -2rem 12rem rgba(0, 0, 0, .1);
        border-radius: 12rem;
    }

    .title {
        text-align: center;
        font-size: 34rem;
        font-weight: bold;
    }

    .list {
        margin-top: 32rem;
    }

    .item:not(:last-child) {
        margin-bottom: 24rem;
    }

</style>
