<template>
    <div class="nav-space discover-container">
        <swiper></swiper>
        <tabbar class="tabbar" />
        <recommend-song-list />
        <div class="space-h"></div>
        <music-calendar />
        <div class="space-h"></div>
        <leaderboard />
    </div>
</template>

<script lang="ts">

    import { defineComponent } from 'vue'
    import Swiper from "@/components/common/Swiper/index.vue"
    import SwiperItem from "@/components/common/Swiper/SwiperItem.vue"
    import Tabbar from '@/components/Discover/Tabbar.vue'
    import RecommendSongList from "@/components/Discover/RecommendSongList.vue"
    import MusicCalendar from "@/components/Discover/MusicCalendar.vue"
    import Leaderboard from "@/components/Discover/Leaderboard.vue"

    export default defineComponent({
        name: 'Discover',
        components: {
            Swiper,
            SwiperItem,
            Tabbar,
            RecommendSongList,
            MusicCalendar,
            Leaderboard
        },
        setup() {
            document.title = '发现'
        }
    })

</script>

<style scoped>

    .discover-container {
        background-color: var(--grap-color);
    }

    .tabbar {
        padding: 24rem 0;
        border: 1px solid var(--five-level);
    }

</style>
