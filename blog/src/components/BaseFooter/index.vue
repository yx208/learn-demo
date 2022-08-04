<template>
    <div class="copyright">粤 ICP 备 2082003181 号</div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';

export default defineComponent({
    name: 'BaseFooter'
});

</script>

<style scoped>

.copyright {
    padding: 32rem 0;
    border-top: 1px solid #eee;
    text-align: center;
    font-size: 24rem;
}

</style>
