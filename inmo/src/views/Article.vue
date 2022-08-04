<template>
    <section class="article">
        <div class="article-header">
            <div class="blur-wrap">
                <div class="blur"></div>
                <div class="blur-bg"></div>
            </div>
            <div class="header-contet" v-show="isShowArticle">
                <div class="recent-meta">
                    <span>[</span>
                    <strong class="recent-meta-cate">{{ articleData.category }}</strong>
                    <span>]</span>
                    <span class="recent-meta-date">{{ formatDate }}</span>
                </div>
                <h3 class="recent-title">{{ articleData.title }}</h3>
                <div class="recent-meta">
                    <span class="recent-tag" v-for="tag in articleData.tags" :key="tag">{{ tag }}</span>
                </div>
            </div>
        </div>
        <div class="article-content" v-show="isShowArticle" ref="articleContainer"></div>
    </section>
</template>

<script lang="ts">

    import { defineComponent, PropType, ref, onUpdated, nextTick, Ref, onMounted } from 'vue'
    import { useRoute } from 'vue-router'
    import ArticleModel from '../models/articel'
    import { useMd2Html } from '../utils/highlight'
    import { isLoading } from '../utils/globalVar'

    export default defineComponent({
        name: 'Article',
        props: {
            article: Object as PropType<Article>
        },
        setup() {

            const index = parseInt(useRoute().query.index as string)
            const articleModel = new ArticleModel()
            const articleContainer = ref<Element | null>(null)
            const isShowArticle = ref(false)

            const articleData = ref<Article>({
                index: -1,
                title: '',
                author: '',
                pubdate: -1,
                category: '',
                tags: [],
                content: ''
            })

            const formatDate = ref('- 月 -1, 0000')

            articleModel.getArticle(index).then(({ data }) => {

                document.title = data.title + ' | Inmo'
                enum UpperMonth {'一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'}

                // 时间戳(Timestamp) 转 GMT
                const date = new Date(data.pubdate)
                formatDate.value = `${UpperMonth[date.getMonth()]} ${date.getDate()}, ${ date.getFullYear() }`

                // 生成文章节点
                const articleElement = useMd2Html(data.content)
                articleContainer.value?.appendChild(articleElement)

                data.content = ''
                articleData.value = data

                // 文章节点渲染完毕后显示
                nextTick(() => isShowArticle.value = true)
            })

            onMounted(() => isLoading.value = false)

            return {
                articleData,
                formatDate,
                articleContainer,
                isShowArticle
            }
        }
    })

</script>

<style scoped>

    .article {
        width: 100%;
    }

    .article-header {
        width: 100%;
        height: 500px;
        line-height: 1.5;
        position: relative;
        overflow: hidden;
    }

    /* 模糊 */

    .blur-wrap {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        filter: blur(20px);
        transform: scale(1.3);
    }

    .blur {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: linear-gradient(to right, rgb(75, 74, 74), rgb(51, 51, 51));
    }

    .blur-bg {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        opacity: .28;
        background-image: url('../assets/images/article-cover.png');
        background-position: center center;
        background-size: cover;
        background-repeat: no-repeat;
    }

    /* 标题 */

    .header-contet {
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        max-width: 1200px;
        height: 100%;
        margin: 0 auto;
        padding: 2rem;
        position: relative;
        font-size: 4rem;
        color: #fff;
        z-index: 9;
        /* animation: header-content 1s; */
    }

    @keyframes header-content {
        0% {
            transform: translateY(-100px);
            opacity: 0;
        }
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
        font-size: 4rem;
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

    /* 文章 */

    .article-content {
        box-sizing: border-box;
        max-width: 1200px;
        margin: 4rem auto 4rem;
        border-radius: 16px;
        padding: 2rem;
        box-shadow: 0 0 6px rgba(0, 0, 0, .1);
        background-color: #fff;
        word-break: break-all;
        /* animation: article-show 1s; */
    }

    @keyframes article-show {
        0% {
            transform: translateY(100px);
            opacity: 0;
        }
    }

    @media screen and (max-width: 600px) {
        .article-content {
            width: 100%;
            margin: 0;
            border-radius: 0;
        }

        .header-contet {
            width: 100%;
        }

        .article-header {
            height: 300px;
        }
    }

</style>
