<template>
    <section class="manager-article">
        <topbar :count="count" />
        <article-list
            :articles="dataList"
            @delete="onDelete"
            @modify="onShowModify" />
        <modify
            :modifyData="modifyData"
            @close="onClose"
            @commit="onCommit" />
    </section>
</template>

<script>

    import Topbar from '@/components/managerArticle/Topbar'
    import ArticleList from '@/components/managerArticle/ArticleList'
    import Modify from '@/components/managerArticle/Modify'

    import ArticleModel from '../models/article'
    import { verifyLoginMixin } from '../utils/mixin'
    import { deepClone } from '../utils/utils.js'

    const articleModel = new ArticleModel()

    export default {
        name: 'ManagerArticle',
        data() {
            return {
                count: 0,
                dataList: [],
                isModify: false,
                modifyData: null
            }
        },
        components: {
            Topbar,
            ArticleList,
            Modify
        },
        created() {
            articleModel.getArticleList().then(({data} )=> {

                if (data.errorCode === 1007) return

                this.count = data.length
                this.dataList = data

            })
        },
        methods: {
            onDelete(articleName) {
                const index = this.dataList.findIndex(v => v.title === articleName)
                this.dataList.splice(index, 1)
            },
            onShowModify(articleName) {
                const article = this.dataList.find(v => v.title === articleName)
                const clone = deepClone(article)
                this.modifyData = clone
            },
            onClose() {
                this.modifyData = null
            },
            async onCommit(article) {

                this.modifyData.tags = this.modifyData.tags.toString()
                const res = await articleModel.putArticle(this.modifyData)

                if (res.errorCode === 0) {
                    this.$message({ message: '修改成功', type: 'success' })
                    this.updateArticle(article)
                    this.onClose()
                } else {
                    this.$message.error('修改失败')
                }
            },
            updateArticle(article) {
                const index = this.dataList.findIndex(v => v.index === article.index)
                this.dataList.splice(index, 1, article)
            }
        }
    }

</script>

<style lang="stylus" scoped>

    .manager-article
        display flex
        flex-direction column

</style>
