<template>
    <el-row class="ame-container" type="flex" justify="space-between" :gutter="60">
        <el-col :span="6">
            <roundy-block suffixColor="#409EFF" title="文章作者" icon="el-icon-user">
                <el-form-item prop="author">
                    <el-input v-model="form.author" placeholder="inmo"></el-input>
                </el-form-item>
            </roundy-block>
        </el-col>
        <el-col :span="6">
            <roundy-block suffixColor="#67C23A" title="分类" icon="el-icon-files">
                <el-form-item prop="category">
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
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </roundy-block>
        </el-col>
        <el-col :span="6">
            <roundy-block suffixColor="#E6A23C" title="标签" icon="el-icon-price-tag">
                <el-form-item prop="tags">
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
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </roundy-block>
        </el-col>
        <el-col :span="6">
            <roundy-block suffixColor="#F56C6C" title="发布时间" icon="el-icon-date">
                <el-form-item prop="date">
                    <el-date-picker
                        class="time-picker"
                        v-model="form.pubdate"
                        type="datetime"
                        value-format="timestamp"
                        placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
            </roundy-block>
        </el-col>
    </el-row>
</template>

<script>

    import RoundyBlock from '../RoundyBlock'

    export default {
        name: 'ArticleMetaEditor',
        props: {
            form: {
                type: Object,
                required: true
            },
            tagOptions: {
                type: Array,
                required: true
            },
            cateOptions: {
                type: Array,
                required: true
            },
        },
        data() {
            return {
                
            }
        },
        components: {
            RoundyBlock
        }
    }
    
</script>

<style lang="stylus" scoped>

    .ame-container >>> .el-form-item
        margin 0

    .cate-input,
    .tag-input,
    .time-picker
        width 100% !important

</style>
