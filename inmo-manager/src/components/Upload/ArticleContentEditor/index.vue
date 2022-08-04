<template>
    <div class="upload-content">
        <div class="title">
            <h4 class="title-tip">文章标题</h4>
            <el-form-item prop="title" class="title-input-wrap">
                <el-input maxlength="64" class="title-input" v-model="form.title" placeholder="输入文章标题"></el-input>
            </el-form-item>
        </div>
        <el-form-item prop="content" class="file-content" v-if="form.content">
            <el-input class="file-area" type="textarea" placeholder="请输入内容" v-model="form.content" />
        </el-form-item>
        <el-upload v-else
            class="file-select"
            drag accept="json"
            :auto-upload="false"
            :show-file-list="false"
            :on-change="onFileSelected"
            action="http://127.0.0.1:3000/artilce"
            multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
    </div>
</template>

<script>
    export default {
        name: 'ArticleContentEditor',
        props: {
            form: {
                type: Object,
                required: true
            }
        },
        methods: {
            onFileSelected(file) {
                const fileReader = new FileReader()
                fileReader.readAsText(file.raw)
                fileReader.onload = (e) => {
                    this.form.content = e.target.result
                }
            }
        }
    }
</script>

<style lang="stylus" scoped>

    .upload-content
        margin-top 4rem
        flex 1
        display flex
        flex-direction column
        align-items center
        justify-content center
        overflow hidden
        border-radius 14px
        // box-shadow 0 2px 10px rgba(0, 0, 0, .2)

        & >>> .el-form-item
            margin 0

        .title
            width calc(100% - 2rem)
            padding 1rem
            background-color #fff
            display flex
            align-items center
            border-bottom 1px solid #dcdfe6
            overflow hidden

            .title-tip
                font-size 2.2rem
                width 200px
                text-align center

            .title-input-wrap
                width 512px

                & >>> .el-form-item__content
                    line-height 1

                    .el-form-item__error
                        transform translate(200px, -180%)

                .title-input
                    font-size 1.8rem

                    & >>> .el-input__inner
                        border none
                        line-height 1

        .file-select,
        .file-select >>> .el-upload,
        .file-select >>> .el-upload-dragger
            width 100%
            height 100%

        .file-select >>> .el-upload-dragger
            display flex
            flex-direction column
            justify-content center
            align-items center
            border none

        .file-content,
        .file-content >>> .el-textarea__inner,
        .file-content >>> .el-form-item__content,
        .file-area
            width 100%
            height 100%
            font-size 2rem
            border none
            resize none

            &::-webkit-scrollbar
                width: 8px;

            &::-webkit-scrollbar-thumb
                border-radius: 10px;
                background: #606266;

</style>
