<template>
    <div class="phone-login">
        <div class="header">
            <p class="tip1">登录体验更多精彩</p>
            <p class="tip2">未注册的手机号登录将自动创建账号</p>
        </div>
        <div class="input-wrap">
            <span class="phone-code">+86</span>
            <label class="input-label" for="login-input">
                <input
                    v-model="input"
                    id="login-input"
                    class="input"
                    type="number"
                    placeholder="请输入手机号">
            </label>
        </div>
        <div class="submit" @click="onCheckPhone">下一步</div>
    </div>
</template>

<script lang="ts">

import { defineComponent, ref }  from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from '../../components/common/Toast'
import LoginModel from '../../models/Login'

export default defineComponent({
    name: 'InputPhone',
    setup() {

        document.title = '手机号码登录'

        const router = useRouter()
        const input = ref('')
        const toast = useToast()

        async function sendCode(phone: string) {
            try {
                const res = await LoginModel.sendVerificationCode(phone)
                console.log(res)
            } catch (err) {
                return false
            }
        }

        async function onCheckPhone() {

            if (input.value.length !== 11) {
                toast.open('号码长度为十一位')
                return
            }

            await sendCode(input.value)

            await router.push({
                path: '/phoneLogin/verification',
                query: { phone: input.value }
            })
        }

        return {
            input,
            toast,
            onCheckPhone
        }
    }
})

</script>

<style scoped>

.phone-login {
    padding: 0 32rem;
}

.header {
    padding: 80rem 0;
}

.tip1 {
    font-size: 32rem;
    margin-bottom: 24rem;
    font-weight: bold;
}

.tip2 {
    font-size: 26rem;
    color: var(--senond-font-color);
}

.input-wrap {
    display: flex;
    padding: 20rem 0;
    border-bottom: 1px solid var(--pale-color);
}

.phone-code {
    margin-right: 12rem;
}

.input-label {
    flex: 1;
}

.input {
    width: 100%;
    border: none;
    outline: none;
    caret-color: var(--primary-light-color);
}

.input::placeholder {
    color: var(--primary-pale-color);
}

.submit {
    width: 100%;
    height: 74rem;
    line-height: 74rem;
    margin-top: 80rem;
    text-align: center;
    background-color: var(--primary-light-color);
    color: var(--light-color);
    border-radius: 36rem;
}

</style>
