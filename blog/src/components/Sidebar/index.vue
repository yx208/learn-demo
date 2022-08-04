<template>
    <div
        class="sidebar"
        :class="{ 'show-menu': showMenu }"
        @mousemove.prevent
        @touchmove.prevent>
        <div class="g_fr-between title">
            <span class="g_underline">微应用</span>
            <i class="iconfont icon-back" @click="onMenu"></i>
        </div>
        <div class="g_fr program-list">
            <div class="g_fc-center program">
                <i class="iconfont icon-code"></i>
                <span>后台管理</span>
            </div>
            <div class="g_fc-center program">
                <i class="iconfont icon-code"></i>
                <span>代码编辑</span>
            </div>
            <div class="g_fc-center program">
                <i class="iconfont icon-code"></i>
                <span>代码编辑</span>
            </div>
            <div class="g_fc-center program">
                <i class="iconfont icon-code"></i>
                <span>代码编辑</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import { defineComponent, ref, watch } from "vue";

export default defineComponent({
    name: 'Sidebar',
    props: {
        toggle: {
            type: Boolean,
            default: false
        }
    },
    setup(props) {

        const showMenu = ref<boolean>(false);

        watch(() => props.toggle, onMenu);

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

.sidebar {
    position: fixed;
    z-index: 9999;
    left: 0;
    top: 0;
    bottom: 0;
    width: 400rem;
    padding: 32rem;
    transform: translateX(-100%);
    background-color: #fff;
    transition: .4s;
}

.sidebar > .title {
    font-size: 40rem;
}

.title > .icon-back {
    font-size: 40rem;
}

.sidebar > .program-list {
    margin-top: 32rem;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 32rem;
}

.program-list > .program {
    width: 184rem;
    height: 184rem;
    background-color: #f0f0f0;
    border-radius: 16rem;
    text-align: center;
    font-size: 28rem;
}

.program > .iconfont {
    margin-bottom: 14rem;
    font-size: 50rem;
}

.show-menu {
    transform: translateX(0);
}

</style>
