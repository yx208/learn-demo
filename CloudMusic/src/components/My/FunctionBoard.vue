<template>
    <div class="card function-board-container">
        <div class="f-c-center item" v-for="(item, index) in functionList">
            <i class="iconfont" :class="item.icon"></i>
            <span class="text">{{ item.text }}</span>
        </div>
        <div class="f-c-center item">
            <span class="add-wrap"><i class="iconfont icon-add"></i></span>
            <span class="text">音乐应用</span>
        </div>
    </div>
</template>

<script lang="ts">

    import { defineComponent } from "vue"

    export default defineComponent({
        name: 'FunctionBoard',
        setup() {
            const functionList = [
                {
                    text: '本地/下载',
                    icon: 'icon-wenjianxiazai'
                },
                {
                    text: '云盘',
                    icon: 'icon-shangchuan21'
                },
                {
                    text: '已购',
                    icon: 'icon-yigou-xuanzhong'
                },
                {
                    text: '最近播放',
                    icon: 'icon-bofang'
                },
                {
                    text: '我的好友',
                    icon: 'icon-haoyou'
                },
                {
                    text: '收藏和赞',
                    icon: 'icon-yishoucang'
                },
                {
                    text: '我的播客',
                    icon: 'icon-xinhao1'
                }
            ]

            return {
                functionList
            }
        }
    })

</script>

<style scoped>

    .function-board-container {
        margin: 0 32rem;
        padding: 12rem 0;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }

    .item {
        width: 25%;
        padding: 24rem 0;
        text-align: center;
    }

    .item .iconfont {
        font-size: 50rem;
        margin-bottom: 10rem;
        color: var(--primary-light-color);
    }

    .text {
        font-size: 24rem;
        font-weight: 600;
        color: var(--subtitle);
    }

    .add-wrap {
        margin: 0 auto 16rem;
        width: 50rem;
        height: 50rem;
        line-height: 50rem;
        border-radius: 50%;
        background-color: var(--five-level);
    }

    .add-wrap .icon-add {
        font-size: 28rem;
        color: var(--three-level);
    }

</style>