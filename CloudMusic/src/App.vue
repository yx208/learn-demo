<template>
    <div id="app" class="app">
        <topbar v-show="isShowNav" class="topbar" :path="path"></topbar>
        <router-view v-slot="{ Component }">
<!--            <transition mode="in-out" name="toggle">-->
                <keep-alive>
                    <component :is="Component" />
                </keep-alive>
<!--            </transition>-->
        </router-view>
        <navbar v-show="isShowNav" class="navbar"></navbar>
    </div>
</template>

<script lang="ts">

    import { defineComponent, ref, computed } from 'vue'
    import { useRoute } from 'vue-router'
    import Navbar from '@/components/Navbar/index.vue'
    import Topbar from "@/components/Topbar/index.vue"
    import { navs } from "./components/Navbar/index.vue"

    export default defineComponent({
        name: 'App',
        components: {
            Navbar,
            Topbar
        },
        setup() {

            const route = useRoute()
            const path = ref('')
            const isShowNav = computed(() => {
                path.value = route.path
                return navs.includes(route.path)
            })

            return {
                path,
                isShowNav
            }
        }
    })

</script>

<style>

    @import url('./assets/styles/base.css');
    @import url('./assets/styles/global.css');
    @import url('./assets/styles/normalize.css');

    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    .topbar {
        position: fixed;
        z-index: 9999;
        top: 0;
        left: 0;
        right: 0;
    }

    .navbar {
        position: fixed;
        z-index: 9999;
        bottom: 0;
        left: 0;
        right: 0;
    }

    .toggle-enter-active {
        transition: all 0.3s;
    }

    .toggle-leave-active {
        transition: all 0.8s;
    }

    .toggle-enter-from,
    .toggle-leave-to {
        transform: translateY(100vh);
    }

</style>