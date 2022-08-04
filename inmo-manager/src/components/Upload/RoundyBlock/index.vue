<template>
    <div class="roundy-block" :style="{ 'border-left-color': suffixColor }">
        <div class="rb-container">
            <p class="rb-title" :style="{ color: suffixColor }">{{ title }}</p>
            <slot></slot>
        </div>
        <i class="icon" :class="icon"></i>
    </div>    
</template>

<script>
    export default {
        name: 'RoundyBlock',
        props: {
            suffixColor: {
                type: String,
                default: '#409EFF'
            },
            title: {
                type: String,
                default: '请输入内容'
            },
            icon: {
                type: String,
                default: 'el-icon-view'
            }
        }
    }
</script>

<style lang="stylus" scoped>

    .roundy-block
        border-radius 4px
        border-left 6px solid #409EFF
        background-color #fff
        display flex
        align-items center
        padding 20px


        .icon
            margin-left 20px
            font-size 4rem
            color #dddfeb
        
        .rb-container
            flex 1

            .rb-title
                font-size 1.8rem
                line-height 1
                margin-bottom 10px

</style>
