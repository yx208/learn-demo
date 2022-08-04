<template>
    <main class="recent-container">
        <div class="recent" v-for="item in articles" :key="item.index">
            <div class="recent-img-wrap">
                <img class="recent-img" src="../../../assets/images/article-cover.png" alt="">
            </div>
            <div class="recent-info">
                <div class="recent-meta">
                    <span>[</span>
                    <strong class="recent-meta-cate">{{ item.category }}</strong>
                    <span>]</span>
                    <span class="recent-meta-date">八月 20, 2020</span>
                </div>
                <h3 class="recent-title" @click="onToArticle(item.index)">{{ item.title }}</h3>
                <div class="recent-content">{{ item.content.slice(0, 200) }}</div>
                <div class="recent-meta">
                    <span class="recent-tag" v-for="tag in item.tags" :key="tag">{{ tag }}</span>
                </div>
            </div>
        </div>
    </main>
</template>

<script lang="ts">

    import { defineComponent, ref } from 'vue'
    import { useRouter } from 'vue-router'

    import ArticleModel from '/@/models/articel'
    import { isLoading } from '/@/utils/globalVar'

    export default defineComponent({
        name: 'Recent',
        data() {
            return {
                imageUrl: '../assets/images/article-cover.png'
            }
        },
        setup() {

            const articles = ref<Article[]>([])
            const articleModel = new ArticleModel()
            const router = useRouter()
            const onToArticle = (index: number) => {
                isLoading.value = true

                // 延迟跳转，给加载动画时间
                setTimeout(() => router.push({ path: '/article', query: { index } }), 400)
            }

            articleModel.getArticleList().then(res => articles.value.push(...res.data))

            return {
                articles,
                onToArticle
            }
        }
    })
 
</script>


<style scoped>

    .recent-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 2rem 2rem 2rem;
    }

    .recent {
        height: 300px;
        margin-top: 2rem;
        background-color: var(--card-bg-color);
        box-shadow: 0 0 6px rgba(0, 0, 0, .1);
        border-radius: 16px;
        overflow: hidden;
    }

    .recent-img-wrap {
        width: 38.2%;
        height: 100%;
        font-size: 0;
        overflow: hidden;
        display: flex;
        justify-content: center;
        float: left;
    }

    .recent-img {
        height: 100%;
    }

    .recent-info {
        display: flex;
        width: 61.8%;
        height: 100%;
        flex-direction: column;
        justify-content: space-between;
        box-sizing: border-box;
        padding: 4rem;
        float: left;
    }

    .recent-meta {
        font-size: 1.6rem;
    }

    .recent-meta-cate {
        margin: 0 .4rem;
        color: var(--cate-color);
        font-weight: bold;
    }

    .recent-meta-date {
        margin-left: 1rem;
    }

    .recent-title {
        cursor: pointer;
        margin: 1rem 0;
        font-size: 3rem;
    }

    .recent-content {
        display: -webkit-box;
        margin-bottom: 1rem;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 3;
        line-clamp: 3;
        -webkit-box-orient: vertical;
        box-orient: vertical;
        font-size: 1.8rem;
        line-height: 1.5;
    }

    .recent-tag {
        margin-right: 1rem;
        color: var(--tag-color);
        font-weight: bold;
    }

    @media screen and (max-width: 600px) {
        .recent {
            display: block;
            height: auto;
        }

        .recent-img-wrap {
            width: 100%;
        }

        .recent-info  {
            width: 100%;
            padding: 2rem;
        }

        .recent-title {
            font-size: 2.2rem;
        }

        .recent-content {
            font-size: 1.6rem;
        }
    }

    @media screen and (max-width: 600px) {
        .recent-img {
            width: 100%;
            height: auto;
        }
    }

</style>
