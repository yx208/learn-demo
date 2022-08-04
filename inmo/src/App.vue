<template>
    <router-view v-slot="{ Component }">
        <keep-alive include="Home">
            <component :is="Component" />
        </keep-alive>
    </router-view>
    <full-loading></full-loading>
</template>

<script lang="ts">

    import { defineComponent } from 'vue'
    import FullLoading from './components/common/FullLoading/index.vue'

    export default defineComponent({
        name: 'App',
        components: {
            FullLoading
        }
    })

</script>

<style>

    @import './utils/line-number.css';
    @import './assets/styles/index.css';

    #app {
        width: 100%;
        height: 100%;
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: var(--primary-font-color);
    }

</style>
