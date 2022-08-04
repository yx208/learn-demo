<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>

    import Http from './utils/http'

    export default {
        name: 'App'
    }

</script>

<style lang="stylus">

    @import '~@/assets/styles/global.styl'

    *
        padding 0
        margin 0

    html,
    body
        width 100%
        height 100vh
        font-size 62.5%
        background-color #f2f2f2

    #app
        width 100%
        height 100%

</style>
