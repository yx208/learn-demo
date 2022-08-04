<template>
    <div class="g_fr-between the-header">
        <i class="iconfont icon-menu" @click="$emit('menu')"></i>
        <h1 class="title">INMO 的个人站点</h1>
        <i class="iconfont icon-search"></i>
    </div>
</template>

<script>

import { defineComponent } from 'vue';

export default defineComponent({
    name: 'BaseHeader'
});

</script>

<style scoped>

.the-header {
    width: 100%;
    height: 100rem;
    border-bottom: 1px solid #eee;
}

.the-header > .iconfont {
    width: 100rem;
    height: 100rem;

    line-height: 100rem;
    text-align: center;
    font-size: 48rem;
}

.the-header > .title {
    font-size: 36rem;
}

@media screen and (min-width: 800px) {
    .the-header > .title {
        flex: 1;
    }
}

</style>
