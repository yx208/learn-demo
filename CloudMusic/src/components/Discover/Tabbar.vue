<template>
    <div class="tabbar-container">
        <div
            class="tab-item"
            v-for="(item, index) in tabList"
            :key="index">
            <div class="sub-container">
                <i class="iconfont" :class="item.icon"></i>
            </div>
            <p>{{ item.text }}</p>
        </div>
    </div>
</template>

<script lang="ts">

    import { defineComponent } from "vue"

    export default defineComponent({
        name: 'Tabbar',
        setup() {
            const tabList = [
                {
                    icon: 'icon-calendar',
                    text: '每日推荐'
                },
                {
                    icon: 'icon-sirenFM',
                    text: '私人FM'
                },
                {
                    icon: 'icon-gedan1',
                    text: '歌单'
                },
                {
                    icon: 'icon-paihangbang',
                    text: '排行榜'
                },
                {
                    icon: 'icon-xiangguanzhuanji',
                    text: '数字专辑'
                }
            ]

            return {
                tabList
            }
        }
    })

</script>

<style scoped>

    .tabbar-container {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        background-color: var(--light-color);
    }

    .tab-item {
        text-align: center;
        font-size: 24rem;
    }

    .tab-item .iconfont {
        color: var(--primary-color);
        font-size: 50rem;
    }

    .sub-container {
        width: 100rem;
        height: 100rem;
        margin-bottom: 12rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: #FFF1F1;
        border-radius: 50%;
    }

</style>
