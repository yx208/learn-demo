<template>
    <div class="topbar">
        <div class="left">文章数目 <span>{{ count }}</span></div>
        <div class="right"></div>
    </div>
</template>

<script>
    export default {
        name: 'Topbar',
        props: {
            count: {
                type: Number,
                default: -1
            }
        }   
    }
</script>

<style lang="stylus" scoped>

    .topbar
        padding 2rem
        display flex
        align-items center
        justify-content space-between
        position sticky
        top -4rem
        font-size 1.8rem
        // box-shadow 0 0 10px rgba(0, 0, 0, .2)
        border-radius 30px
        background-color #fff

</style>
