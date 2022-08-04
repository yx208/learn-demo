<template>
    <el-form class="modify-container" :model="form" ref="ruleForm">
        <div class="form-meta">
            <el-form-item class="meta-item" label="分类" prop="category">
                <el-select
                    class="cate-input"
                    v-model="form.category"
                    filterable
                    allow-create
                    default-first-option
                    placeholder="选择获取输入分类">
                    <el-option
                        v-for="item in cateOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item class="meta-item" label="标签" prop="tags">
                <el-select
                    class="tag-input"
                    v-model="form.tags"
                    multiple
                    filterable
                    allow-create
                    default-first-option
                    placeholder="选择获取输入标签">
                    <el-option
                        v-for="item in tagOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item class="meta-item meta-item-date" label="发布日期" prop="pubdate">
                <el-date-picker
                    v-model="form.pubdate"
                    type="datetime"
                    placeholder="选择日期时间" />
            </el-form-item>
        </div>
        <el-form-item label="标题" class="meta-item" prop="content">
            <el-input v-model="form.title" placeholder="输入文章标题"></el-input>
        </el-form-item>
        <el-form-item class="modify-content" prop="content">
            <el-input class="modify-content-area" type="textarea" placeholder="请输入内容" v-model="form.content" />
        </el-form-item>
    </el-form>
</template>

<script>

    import ArticleModel from '@/models/article'

    const articleModel = new ArticleModel()

    export default {
        name: 'ModifyForm',
        props: {
            form: {
                type: Object,
                default() { return {} }
            }
        },
        data() {
            return {
                cateOptions: [],
                tagOptions: []
            }
        },
        created() {
            Promise.all([
                articleModel.getCategoryList(),
                articleModel.getTagList()
            ]).then(values => {

                // if (values[0].errorCode !== 0 && values[1].errorCode !== 0) {
                //     // Do something
                // }

                values[0].data.forEach(v => this.cateOptions.push({ value: v, label: v }))
                values[1].data.forEach(v => this.tagOptions.push({ value: v, label: v }))
            })
        }
    }
</script>

<style lang="stylus" scoped>

    .modify-container
        display flex
        flex-direction column

    .form-meta
        display flex

        .meta-item
            flex 1
            display flex

            & >>> .el-form-item__content
                flex 1

                & > div
                    width 90%
        
        .meta-item-date >>> .el-form-item__content > div
            width 100%

    .meta-item
        display flex

        >>> .el-form-item__content
            flex 1

    .modify-content
        flex 1
        width 100%
        height 100% !important
        margin 0

        & >>> .el-form-item__content
            height 100%

        .modify-content-area
            width 100%
            height 100%
            font-size 1.8rem

            & >>> .el-textarea__inner
                resize none
                height 100%

</style>
