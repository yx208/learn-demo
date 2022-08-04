<template>
    <div class="nav-space my-container" @click="onPlayer">
        <user-bar />
        <function-board />
        <div class="space-h-2"></div>
        <like-music />
        <tab class="tab" :class="{ 'stickyBg': isSticky }" ref="tabRef" />
        <song-list title="创建歌单" />
        <div class="space-h"></div>
        <song-list title="收藏歌单" />
    </div>
</template>

<script lang="ts">

    import { defineComponent, ref, onMounted, computed, watch } from "vue"
    import { useStore } from 'vuex'
    import { useRouter } from 'vue-router'
    import UserBar from '@/components/My/UserBar.vue'
    import FunctionBoard from "@/components/My/FunctionBoard.vue"
    import LikeMusic from "@/components/My/LikeMusic.vue"
    import Tab from '@/components/My/Tab.vue'
    import SongList from "@/components/My/SongList.vue"
    import { useScrollPosition } from "../../hooks/useScrollPosition"

    export default defineComponent({
        name: 'My',
        components: {
            UserBar,
            FunctionBoard,
            LikeMusic,
            Tab,
            SongList
        },
        setup() {

            const store = useStore()
            const router = useRouter()
            const tabRef = ref<typeof Tab>()
            const { top } = useScrollPosition()

            let tabFromTop = 0
            let alreadySet = false

            const isSticky = computed(() => {

                // 判断是否实现 topbar 的背景色
                if (top.value <= 5) {
                    alreadySet = false
                    store.commit('setShowTopbarBg', false)
                    store.commit('setTopbarRuleItem', { key: 'showCenter', value: false })
                } else if (!alreadySet) {
                    alreadySet = true

                    store.commit('setShowTopbarBg', true)
                    store.commit('setTopbarRuleItem', { key: 'showCenter', value: true })
                }

                return top.value > tabFromTop
            })

            onMounted(() => {
                tabFromTop = tabRef.value.$el.offsetTop - tabRef.value.$el.offsetHeight
            })

            function onPlayer() {
                router.push('/player')
            }

            return {
                isSticky,
                tabRef,
                onPlayer
            }
        }
    })

</script>

<style scoped>

    .my-container {
        min-height: 100vh;
        padding-bottom: 152rem;
        background-color: var(--grap-color);
    }

    .tab {
        position: sticky;
        top: 99.5rem;
    }

    .stickyBg {
        background-color: var(--light-color);
    }

</style>
