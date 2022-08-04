<template>
    <div class="sidebar">
        <h2 class="sidebar-title">后台管理系统</h2>
        <el-menu
            :default-active="$route.path"
            class="sidebar-menu"
            :router="true"
            @open="handleOpen"
            @close="handleClose">
            <el-menu-item index="/home/managerArticle" class="sidebar-item">
                <template slot="title">
                    <i class="el-icon-tickets"></i>
                    <span slot="title">文章管理</span>
                </template>
            </el-menu-item>
            <el-menu-item index="/home/upload" class="sidebar-item">
                <template slot="title">
                    <i class="el-icon-tickets"></i>
                    <span slot="title">上传文章</span>
                </template>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>

    export default {
        name: 'Sidebar',
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }

</script>

<style lang="stylus" scoped>

    .sidebar-width
        width 24rem
    
    .sidebar
        position fixed
        top 0
        left 0
        bottom 0
        z-index 9
        user-select none
        display flex
        flex-direction column
        background-color #fff
        box-shadow 0 0 12px rgba(0, 0, 0, .2)

        .sidebar-title
            padding 2rem
            font-size 2.6rem
            line-height 1
            text-align center

        .sidebar-menu
            flex 1
            border none

            .sidebar-item
                font-size 1.4rem
                font-weight bold

            .is-active
                background-color #409EFF
                color #fff

</style>
