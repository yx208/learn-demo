<template>
    <div class="upload">
        <el-form class="form" :rules="rules" ref="form" :model="form">
            <article-meta-editor
                :form="form"
                :tagOptions="tagOptions"
                :cateOptions="cateOptions" />
            <article-content-editor
                :form="form" />
            <el-button class="floating-btn"
                type="primary"
                icon="el-icon-upload"
                circle
                @click="onSubmit"></el-button>
        </el-form>
    </div>
</template>

<script>

    import ArticleMetaEditor from '@/components/Upload/ArticleMetaEditor'
    import ArticleContentEditor from '@/components/Upload/ArticleContentEditor'

    import ArticleModel from '@/models/article'
    import { verifyLoginMixin } from '../utils/mixin'

    const articleModel = new ArticleModel()

    export default {
        name: 'Upload',
        data() {
            return {
                form: {
                    title: '',
                    author: 'inmo',
                    pubdate: 0,
                    content: '',
                    category: '',
                    tags: []
                },
                tagOptions: [],
                cateOptions: [],
                rules: {
                    author: [
                        { required: true, message: '请输入作者名称', trigger: ['change'] },
                        { min: 3, max: 64, message: '长度在 3 到 64 个字符', trigger: ['change'] }
                    ],
                    title: [
                        { required: true, message: '请输入文章标题', trigger: 'change' },
                        { min: 3, max: 64, message: '长度在 3 到 64 个字符', trigger: ['change'] }
                    ]
                }
            }
        },
        components: {
            ArticleMetaEditor,
            ArticleContentEditor
        },
        created() {
            Promise.all([
                articleModel.getCategoryList(),
                articleModel.getTagList()
            ]).then(values => {
                values[0].data.forEach(v => this.cateOptions.push({ value: v, label: v }))
                values[1].data.forEach(v => this.tagOptions.push({ value: v, label: v }))
            })
        },
        methods: {
            onSubmit() {
                this.$refs['form'].validate((valid) => {
                    if (!valid) return false

                    this.$message('文章提交中...');
                    articleModel.postArticle(this.form).then(res => this.verify(res))
                })
            },

            verify(res) {
                if (res.errorCode === 0) {
                    this.$message({
                        message: '文章成功存储',
                        type: 'success'
                    });
                }
                else if (res.errorCode === 1007) {
                    this.$confirm('Token 已过期，是否重新登录获取最新 Token？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$root.isLogin = false
                    }, () => {
                        this.$message({
                            type: 'info',
                            message: '取消登录'
                        })
                    })
                }
                else {
                    const values = Object.values(res.message.fields)
                    this.$message.error(`ErrorMessage: ${res.message.desc} => ${values.toString()}`)
                }

                this.clearInput()
            },
            clearInput() {
                this.form = {
                    title: '',
                    author: 'inmo',
                    pubdate: 0,
                    content: '',
                    category: '',
                    tags: []
                }
            }
        }
    }

</script>

<style lang="stylus" scoped>

    .upload
        box-sizing border-box
        width 100%
        height 100%

    .form
        width 100%
        height 100%
        display flex
        flex-direction column

        .floating-btn
            position fixed
            right 6rem
            bottom 6rem
            width 6rem
            height 6rem
            font-size 3rem

</style>
