<template>
    <div class="hide-scrollbar article-container">
        <article class="article" v-html="content"></article>
    </div>
</template>

<script lang="ts">

import { defineComponent, ref, nextTick, reactive } from 'vue';
import {useRoute} from "vue-router";
import ArticleMeta from './components/ArticleMeta.vue';
import ArticleModel from "@/models/ArticleModel";
import highlight from 'highlight.js/lib/common';

const articleModel = new ArticleModel();

export default defineComponent({
    name: 'Article',
    components: {
        ArticleMeta
    },
    setup() {

        const route = useRoute();

        const content = ref<string>('');
        const detail = ref<ArticleDetail>(null);
        const articleRef = ref<HTMLElement>(null);

        if (route.query.id) {
            articleModel.detail(route.query.id as string).then(res => {
                content.value = res.data.content;
                detail.value = res.data.detail;
                nextTick(highlight.highlightAll);
            });
        }

        return {
            content,
            detail,
            articleRef
        }
    }
});

</script>

<style>

@import url('../../common/styles/article.theme.css');

.article-container {
    box-sizing: border-box;
    width: 100%;
    padding: 0 32rem;
}

</style>
