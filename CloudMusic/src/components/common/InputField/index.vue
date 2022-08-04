<template>
    <div class="field">
        <i class="iconfont" :class="icon"></i>
        <label class="label">
            <input maxlength="11" class="input" type="tel" placeholder="请输入手机号码">
        </label>
        <slot></slot>
    </div>
</template>

<script lang="ts">

    import { defineComponent } from 'vue'

    export default defineComponent({
        name: 'InputField',
        props: {
            icon: {
                type: String,
                default: 'icon-user'
            }
        }
    })

</script>
