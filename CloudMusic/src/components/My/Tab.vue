<template>
    <div class="f-r-center tab-container">
        <div class="tab-item active"><span class="text">创建歌单</span></div>
        <div class="tab-item"><span class="text">收藏歌单</span></div>
        <div class="tab-item"><span class="text">歌单助手</span></div>
    </div>
</template>

<script lang="ts">

    import { defineComponent } from "vue"

    export default defineComponent({
        name: 'MyTab'
    })

</script>

<style scoped>

    .tab-container {
        padding: 32rem;
        background-color: var(--grap-color);
    }

    .tab-item {
        flex: 1;
        text-align: center;
        font-size: 30rem;
        border-right: 1px solid var(--four-level);
    }

    .tab-item:last-child {
        border: none;
    }

    .active { position: relative; }

    .active::before {
        content: "";
        position: absolute;
        z-index: 9;
        left: 50%;
        bottom: -2rem;
        width: 120rem;
        height: 10rem;
        transform: translateX(-50%);
        background: var(--primary-gradient-r);
        border-radius: var(--sub-radius);
    }

    .text {
        font-size: 28rem;
        position: relative;
        z-index: 99;
    }

</style>
