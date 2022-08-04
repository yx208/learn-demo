<template>
    <div class="f-r-center player-controller">
        <i @click="onClick(ControlType.LOOP)" class="iconfont icon-liebiaoxunhuan"></i>
        <i @click="onClick(ControlType.PREV)" class="iconfont icon-play-prev-1"></i>
        <i @click="onClick(ControlType.PLAY)" class="iconfont icon-bofang1"></i>
        <i @click="onClick(ControlType.NEXT)" class="iconfont icon-play-next-1"></i>
        <i @click="onClick(ControlType.LIST)" class="iconfont icon-bofangliebiao"></i>
    </div>
</template>

<script lang="ts">

    import { defineComponent } from "vue"

    enum ControlType {
        LOOP,
        PREV,
        PLAY,
        NEXT,
        LIST
    }

    export default defineComponent({
        name: 'PlayerController',
        emits: ['control'],
        setup(props, { emit }) {

            function onClick(type) {
                emit('control', type)
            }

            return {
                onClick,
                ControlType
            }
        }
    })

</script>

<style scoped>

    .player-controller {
        margin-bottom: 32rem;
    }

    .player-controller .iconfont {
        font-size: 60rem;
        margin: 0 24rem;
    }

    .player-controller .iconfont:nth-child(3) {
        font-size: 120rem;
        color: var(--light-color);
    }

</style>
