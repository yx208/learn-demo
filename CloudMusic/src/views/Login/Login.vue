<template>
    <div class="login-container">
        <router-view></router-view>
    </div>
</template>

<script lang="ts">

    import { defineComponent }  from 'vue'

    export default defineComponent({
        name: 'Login',
        setup() {
            document.title = '登录'
        }
    })

</script>