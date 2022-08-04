<template>
    <div class="home">
        <sidebar class="home-sidebar"></sidebar>
        <div class="home-container">
            <div class="home-header">
                <el-dropdown trigger="click" class="user-drop">
                    <span class="user">SuperAdmin<i class="el-icon-caret-bottom el-icon--right"></i></span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item class="clearfix" @click.native="onLogout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <el-avatar :size="50" :src="url"></el-avatar>
            </div>
            <div class="home-sub-container">
                <router-view class="home-view"></router-view>
            </div>
        </div>
    </div>
</template>

<script>

    import Sidebar from '@/components/Sidebar'

    import { verifyLoginMixin } from '../utils/mixin'
    import Http from '../utils/http'

    export default {
        name: 'Home',
        data() {
            return {
                url: 'http://cdn.eqingchen.top/blog/icon.png'
            }
        },
        components: {
            Sidebar
        },
        methods: {
            onLogout() {
                Http.removeStorage('token')
                this.$router.replace('/login')
            }
        }
    }

</script>

<style lang="stylus" scoped>

    .home
        width 100%
        height 100vh
        min-width 1200px
        display flex

    .home-sidebar
        width 24rem

    .home-container
        width 100%
        margin-left 24rem
        display flex
        flex-direction column

        .home-header
            user-select none
            box-sizing border-box
            width 100%
            height 6.6rem
            padding 0 2rem
            display flex
            align-items center
            justify-content flex-end
            background-color #fff
            cursor pointer

            .user-drop
                margin-right 2rem

            .user
                font-size 2rem


        .home-sub-container
            flex 1
            padding 3.4rem
            overflow hidden auto

            .home-view
                width 100%
                height 100%

</style>
