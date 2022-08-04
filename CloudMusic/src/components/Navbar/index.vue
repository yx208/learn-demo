<template>
    <div class="navbar">
        <div
            class="f-c-center nav-item"
            v-for="(item, index) in navList"
            @click="onChangeTab(index)"
            :class="{ active: index === currentTab }"
            :key="index">
            <div class="icon-wrap f-r-center"><i class="iconfont" :class="item.icon"></i></div>
            <span class="nav-text">{{ item.text }}</span>
        </div>
    </div>
</template>

<script lang="ts">

    import { defineComponent, ref } from "vue"
    import { useRouter } from 'vue-router'

    enum TabType {
        DISCOVER,
        BO_KE,
        MY,
        K_SONG,
        CLOUD_HAMLET,
        OTHER
    }

    const navs = ['/discover', '/my']

    export {
        TabType,
        navs
    }

    export default  defineComponent({
        name: 'Navbar',
        setup() {
            const navList = [
                {
                    icon: 'icon-logo-dark',
                    text: '发现',
                    url: '/discover'
                },
                {
                    icon: 'icon-xinhao',
                    text: '播客',
                    url: ''
                },

                {
                    icon: 'icon-music2',
                    text: '我的',
                    url: '/my'
                },
                {
                    icon: 'icon-huatong',
                    text: 'K歌',
                    url: ''
                },
                {
                    icon: 'icon-users',
                    text: '云村',
                    url: ''
                }
            ]

            const currentTab = ref(0)
            const router = useRouter()

            function onChangeTab(index: number) {
                currentTab.value = index

                if (navList[index].url) {
                    router.replace(navList[index].url)
                }
            }

            return {
                navList,
                currentTab,
                onChangeTab
            }
        }
    })

</script>

<style scoped>

    .navbar {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        height: 110rem;
        background-color: var(--light-color);
    }

    .nav-item {
        text-align: center;
        color: var(--three-level);
    }

    .icon-wrap {
        width: 60rem;
        height: 60rem;
        line-height: 60rem;
        margin-bottom: 6rem;
        border-radius: 50%;
    }

    .nav-item .iconfont {
        font-size: 42rem;
    }

    .nav-item .icon-xinhao {
        font-size: 50rem;
    }

    .nav-item .icon-users {
        font-size: 36rem;
    }

    .nav-text {
        font-size: 20rem;
    }

    .active .icon-wrap {
        background: var(--primary-gradient-rt);
        color: var(--light-color);
    }

    .active .nav-text {
        color: var(--primary-light-color);
        font-weight: bold;
    }

</style>
