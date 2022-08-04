<template>
    <div class="hide-scrollbar home">
        <article-preview
            class="item"
            v-for="item in articleList"
            :key="item._id"
            :data="item"
        />
    </div>
</template>

<script lang="ts">

import ArticlePreview from '@/components/ArticlePreview/index.vue';
import { defineComponent, ref } from 'vue';
import ArticleModel from "@/models/ArticleModel";

export default defineComponent({
    name: 'Home',
    components: {
        ArticlePreview
    },
    setup() {

        const article = new ArticleModel();

        const articleList = ref<ArticleDetail[]>([]);

        article.list().then(res => {
            articleList.value.push(...res.data);
        });

        return {
            articleList
        }
    }
});

</script>

<style scoped>

.home {
    padding: 32rem;
}

</style>

