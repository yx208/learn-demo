<template>
    <div class="card song-list-container">
        <div class="header">
            <span class="title">{{ title }}(6个)</span>
            <span><i class="iconfont icon-more"></i></span>
        </div>
        <div class="list">
            <song-item class="item" v-for="(item, index) in 5" :key="index"></song-item>
        </div>
    </div>
</template>

<script lang="ts">

    import { defineComponent } from "vue"
    import SongItem from "./SongItem.vue"

    export default defineComponent({
        name: 'SongList',
        components: {
            SongItem
        },
        props: {
            title: {
                type: String,
                required: true
            },
            isAdd: {
                type: Boolean,
                default: false
            }
        }
    })

</script>

<style scoped>

    .song-list-container {
        margin: 0 32rem;
    }

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .header .icon-more {
        color: var(--three-level);
    }

    .title {
        font-size: 24rem;
        color: var(--three-level);
    }

    .item {
        margin-top: 16rem;
    }

</style>
