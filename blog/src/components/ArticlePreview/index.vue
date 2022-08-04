<template>
    <div class="article-preview" @click="onViewArticle">
        <img class="cover" :src="data.cover" alt="文章封面">
        <h2 class="g_2-line title">{{ data.name }}</h2>
        <div class="meta">
            <span class="cell">
                <i class="iconfont icon-folder"></i>
                <span class="text">{{ data.category }}</span>
            </span>
            <span class="cell">
                <i class="iconfont icon-tag"></i>
                <span class="text">{{ data.tags.join(',') }}</span>
            </span>
            <span class="cell">
                <i class="iconfont icon-date"></i>
                <span class="text">{{ formatDate(data.createdAt) }}</span>
            </span>
        </div>
    </div>
</template>

<script lang="ts">

import {defineComponent, PropType} from "vue";
import {useRouter} from "vue-router";

export default defineComponent({
    name: 'ArticlePreview',
    props: {
        data: {
            type: Object as PropType<ArticleDetail>,
            required: true
        }
    },
    setup(props) {

        const router = useRouter();

        function onViewArticle() {
            router.push({
                path: '/article',
                query: { id: props.data._id }
            });
        }

        function formatDate(date: string) {
            const d = new Date(date);
            return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
        }

        return {
            onViewArticle,
            formatDate
        }
    }
});

</script>

<style scoped>

.article-preview {
    user-select: none;
    cursor: pointer;
}

.article-preview > .title {
    padding: 10px 0;
    font-size: 40rem;
}

.article-preview > .cover {
    width: 100%;
}

.article-preview > .meta {
    margin-bottom: 32rem;
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
