<template>
    <div class="player-topbar-container">
        <div class="pack-up"><i class="iconfont icon-arrow-down-1"></i></div>
        <div class="content">
            <h4 class="title">一定要爱你(网络版)</h4>
            <p class="singer">田一龙</p>
        </div>
        <div class="share"><i class="iconfont icon-share"></i></div>
    </div>
</template>

<script lang="ts">

    import { defineComponent } from "vue"

    export default defineComponent({
        name: 'PlayerTopbar'
    })

</script>

<style scoped>

    .player-topbar-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 24rem 0;
    }

    .content {
        flex: 1;
        text-align: center;
    }

    .player-topbar-container .iconfont {
        padding: 24rem 32rem;
        font-size: 46rem;
    }

    .title {
        color: var(--five-level);
    }

    .singer {
        margin-top: 4rem;
        font-size: 24rem;
        color: var(--three-level);
    }

</style>
