<template>
    <div class="article-preview">
        <img class="cover" :src="data.cover" alt="">
        <div class="meta">
            <span class="cell">
                <i class="iconfont icon-folder"></i>
                <span class="text">{{ data.category }}</span>
            </span>
                <span class="cell">
                <i class="iconfont icon-tag"></i>
                <span class="text" v-for="(tag, i) in data.tags" :key="i">{{ tag }}</span>
            </span>
        </div>
        <div class="meta">
            <span class="cell">
                <i class="iconfont icon-date"></i>
                <span class="text">{{ formatDate(data.createdAt) }}</span>
            </span>
            <span class="cell">
                <i class="iconfont icon-date"></i>
                <span class="text">{{ formatDate(data.updatedAt) }}</span>
            </span>
        </div>
    </div>
</template>

<script lang="ts">

import {defineComponent, PropType} from "vue";
import {useRouter} from "vue-router";

export default defineComponent({
    name: 'ArticleMeta',
    props: {
        data: {
            type: Object as PropType<ArticleDetail>,
            required: true
        }
    },
    setup() {

        function formatDate(date: string) {
            const d = new Date(date);
            return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
        }

        return {
            formatDate
        }
    }
});

</script>

<style scoped>

.article-preview {
    user-select: none;
    cursor: pointer;
    position: relative;
}

.article-preview > .cover {
    width: 100%;
}

.article-preview > .meta {
    margin-top: 16rem;
}

.article-preview > .meta > .cell:not(:last-child) {
    margin-right: 20rem;
}

.article-preview > .meta > .cell > .iconfont {
    margin-right: 4rem;
}

.article-preview > .meta > .cell > .text {
    font-size: 28rem;
}

</style>
