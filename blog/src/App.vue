<template>
    <div class="app">
        <sidebar :toggle="showMenu"></sidebar>
        <base-header @menu="onMenu" />
        <div class="content-wrapper">
            <router-view></router-view>
        </div>
        <!-- <router-view v-slot="{ Component }">
            <keep-alive>
                <component :is="Component" />
            </keep-alive>
        </router-view> -->
        <base-footer></base-footer>
    </div>
</template>

<script lang="ts">

import { defineComponent, ref } from 'vue';
import Sidebar from '@/components/Sidebar/index.vue';
import BaseHeader from '@/components/BaseHeader/index.vue';
import BaseFooter from '@/components/BaseFooter/index.vue';

export default defineComponent({
	name: "App",
    components: {
        BaseHeader,
        BaseFooter,
	    Sidebar
    },
    setup() {

	    const showMenu = ref<boolean>(false);

	    function onMenu() {
            showMenu.value = !showMenu.value;
        }

        return {
	        showMenu,
	        onMenu
        }
    }
});

</script>

<style scoped>

.app > .content-wrapper {
    width: 100%;
}

@media screen and (min-width: 500px) {
    .app > .content-wrapper {
        margin: 0 auto;
        width: 1000px;
    }
}

</style>
