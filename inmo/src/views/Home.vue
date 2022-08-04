<template>
    <section class="home">
        <Suspense>
            <template #default>
                <header-full-page></header-full-page>
            </template>
            <template #fallback>
                <div class="header-fallback"></div>
            </template>
        </Suspense>
        <Suspense>
            <template #default>
                <recent></recent>
            </template>
        </Suspense>
        <footer class="footer">粤 ICP 备：44200002443903</footer>
    </section>
</template>

<script lang="ts">

    import { defineComponent, reactive, onBeforeMount, onActivated } from 'vue'

    import HeaderFullPage from '/@/components/Home/FullScreen/index.vue'
    import Recent from '/@/components/Home/Recent/index.vue'
    import { isLoading } from '../utils/globalVar'

    export default defineComponent({
        name: 'Home',
        setup() {
            document.title = 'Home | Inmo'
        },
        components: {
            HeaderFullPage,
            Recent
        }
    })

</script>

<style scoped>

    .header-fallback {
        width: 100%;
        height: 100vh;
    }

    .home {
        width: 100%;
        height: 100%;
    }

    .footer {
        text-align: center;
        margin-bottom: 20px;
        font-size: 1.6rem;
    }

</style>

