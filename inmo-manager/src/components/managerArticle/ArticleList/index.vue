<template>
    <div class="container">
        <transition-group name="animate" tag="div" class="content">
            <div class="item"
                v-for="article in articles"
                :key="article.index">
                <div class="id">ID: <span class="value">{{ article.index }}</span></div>
                <div class="title">文章名称: <span class="value">{{ article.title }}</span></div>
                <div class="author">作者: <span class="value">{{ article.author }}</span></div>
                <div class="category">分类: <span class="value">{{ article.category }}</span></div>
                <div class="tags">标签: <span class="value">{{ article.tags }}</span></div>
                <div class="pubdate">发布时间: <span class="value">{{ pubdateFormat(article.pubdate) }}</span></div>
                <div class="control">
                    <el-button type="primary" @click="$emit('modify', article.title)">编辑</el-button>
                    <el-button type="danger" @click="onDelete(article.title)">删除</el-button>
                </div>
            </div>
        </transition-group>
    </div>
</template>

<script>

    import ArticleModel from '@/models/article.js'
    import config from '../../../utils/config'

    const articleModel = new ArticleModel()

    export default {
        name: "ArticleList",
        props: {
            articles: {
                type: Array,
                default() { return [] }
            }
        },
        methods: {
            pubdateFormat(time) {
                const date = new Date(time)
                return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
            },
            onDelete(articleName) {

                this.$confirm(`确定删除 ${articleName} ?`, '警告', {
                    closeOnPressEscape: true,
                    closeOnClickModal: true,
                    distinguishCancelAndClose: true,
                    confirmButtonText: '确认',
                    cancelButtonText: '放弃删除',
                    type: 'warning'
                })
                .then(() => this.deleteArticle(articleName))
                .catch(() => this.$message({ message: '取消删除', type: 'info' }))
                
            },
            async deleteArticle(articleName) {
                const res = await articleModel.deleteArticle(articleName)

                if (res.errorCode === 0) {
                    this.$message({message: '删除成功', type: 'success'})
                    this.$emit('delete', articleName)
                } else {
                    this.$message.error(res.message)
                }
            }
        }
    }
</script>

<style lang="stylus" scoped>

    .container
        box-sizing border-box
        padding 2rem 2rem 0

        .content
            width 100%

    .item
        box-sizing border-box
        display flex
        align-items center
        justify-content space-between
        height 7rem
        margin-bottom 2rem
        padding 0 2rem
        // border-bottom 1px solid  #e6e6e6
        font-size 1.8rem
        background-color #fff
        transition all .4s
        border-radius 12px

        .id
            flex 2

        .title
            flex 6

        .author
            flex 2

        .category
            flex 3
        
        .tags
            flex 4

        .pubdate
            flex 4
        
        .value
            color #409EFF

    .item:last-child
        border none

    .animate-enter {
        transition 0
    }

    .animate-leave-to {
        opacity: 0;
        transform: translateX(100%)
    }

    .animate-leave-active {
        position: absolute;
    }

</style>
