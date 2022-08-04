<template>
    <div class="discover-topbar-container" :class="{ bg: store.state.showTopbarBg }">
        <div class="menu"><i class="iconfont icon-menu"></i></div>
        <template v-show="store.state.topbarRule.showCenter">
            <div class="search" v-if="store.state.topbarRule.type === TabType.DISCOVER">
                <i class="iconfont icon-search"></i>
                <span class="search-text">等什么君</span>
            </div>
            <div class="user" v-else-if="store.state.topbarRule.type === TabType.MY">
                <i class="iconfont icon-search"></i>
                <span class="search-text">等什么君</span>
            </div>
        </template>
        <div class="listen" v-show="store.state.topbarRule.showRight"><i class="iconfont icon-maikefeng"></i></div>
    </div>
</template>

<script lang="ts">

    import { defineComponent, computed, reactive, watch } from "vue"
    import { TabType } from '../Navbar/index.vue'
    import { useStore } from 'vuex'
    import mTypes from "../../store/mutation.types"

    export default defineComponent({
        name: 'DiscoverTopbar',
        props: {
            path: {
                type: String,
                default: ''
            }
        },
        setup(props) {

            const store = useStore()

            watch(() => props.path, (value) => {

                console.log(value)

                switch (value) {
                    case '/discover':
                        store.commit(mTypes.SET_TOPBAR_RULE, {
                            type: TabType.DISCOVER,
                            showCenter: true,
                            showRight: true
                        })
                        break
                    case '/my':
                        store.commit(mTypes.SET_TOPBAR_RULE, {
                            type: TabType.MY,
                            showCenter: false,
                            showRight: false
                        })
                        break
                    default:
                        store.commit(mTypes.SET_TOPBAR_RULE, {
                            type: TabType.OTHER,
                            showCenter: false,
                            showRight: false
                        })
                }
            })

            return {
                store,
                TabType
            }
        }
    })

</script>

<style scoped>

    .discover-topbar-container {
        height: 100rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }

    .search {
        flex: 1;
        padding: 12rem 32rem;
        background-color: var(--five-level);
        color: var(--three-level);
        border-radius: 64rem;
    }

    .user {
        flex: 1;
    }

    .search .icon-search {
        font-size: 34rem;
        margin-right: 6rem;
    }

    .search-text {
        font-size: 30rem;
    }

    .menu,
    .listen {
        padding: 0 32rem;
    }

    .icon-menu,
    .icon-maikefeng {
        font-size: 50rem;
    }

    .bg {
        background-color: var(--light-color);
    }

</style>
