<template>
    <div class="card-header-container">
        <span class="title">{{ title }}</span>
        <div class="sub-container">更多<i class="iconfont icon-arrow-right-1"></i></div>
    </div>
</template>

<script lang="ts">

    import { defineComponent } from "vue"

    export default defineComponent({
        name: 'CardHeader',
        props: {
            title: {
                type: String,
                required: true
            }
        }
    })

</script>

<style scoped>

    .card-header-container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 24rem 32rem;
    }

    .title {
        font-size: 34rem;
        font-weight: bold;
    }

    .sub-container {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        height: 40rem;
        padding: 3rem 16rem 0;
        border: .5px solid var(--four-level);
        border-radius: 32rem;
        font-size: 24rem;
    }

    .sub-container .iconfont {
        font-size: 24rem;
        margin-top: -3rem;
    }

</style>
