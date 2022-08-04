<template>
    <div class="recent-info">
        <div class="recent-meta">
            <span>[</span>
            <strong class="recent-meta-cate">{{ articleMeta.category }}</strong>
            <span>]</span>
            <span class="recent-meta-date">八月 20, 2020</span>
        </div>
        <h3 class="recent-title" @click="onToArticle(articleMeta.index)">{{ articleMeta.title }}</h3>
        <slot></slot>
        <div class="recent-meta">
            <span class="recent-tag" v-for="tag in articleMeta.tags" :key="tag">{{ tag }}</span>
        </div>
    </div>
</template>

<script lang="ts">

    import { defineComponent } from 'vue'

    export default defineComponent({
        name: 'ArticleMeta',
        props: {
            articleMeta: {
                type: Object,
                required: true
            }
        }
    })

</script>
