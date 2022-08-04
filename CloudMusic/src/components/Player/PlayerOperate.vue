<template>
    <div class="f-r-center player-operate-container">
        <i class="iconfont icon-xihuan"></i>
        <i class="iconfont icon-download"></i>
        <i class="iconfont icon-huatong"></i>
        <i class="iconfont icon-pinglun"></i>
        <i class="iconfont icon-more"></i>
    </div>
</template>

<script lang="ts">

    import { defineComponent } from "vue"

    export default defineComponent({
        name: 'PlayerOperate'
    })

</script>

<style scoped>

    .player-operate-container .iconfont {
        margin: 0 12rem;
        padding: 0 24rem;
        font-size: 46rem;
    }

</style>
