<template>
    <div class="leaderboard-container">
        <card-header title="排行榜" />
        <div class="sub-container">
            <leaderboard-item></leaderboard-item>
        </div>
    </div>
</template>

<script lang="ts">

    import { defineComponent } from "vue"
    import CardHeader from '../common/CardHeader/index.vue'
    import LeaderboardItem from './LeaderboardItem.vue'

    export default defineComponent({
        name: 'Leaderboard',
        components: {
            CardHeader,
            LeaderboardItem
        }
    })

</script>

<style scoped>

    .leaderboard-container {
        background-color: var(--light-color);
        border-radius: var(--card-radius) var(--card-radius) 0 0;
    }

    .sub-container {
        padding: 0 24rem 24rem;
    }

</style>
