<template>
    <div class="verification-code">
        <div class="header">
            <p class="tip1">请输入验证码</p>
            <div class="sent-time">
                <p>已发送至 +86 {{ phoneNumber }}</p>
                <span>{{ countDown }}s</span>
            </div>
        </div>
        <div class="code-input-wrap">
            <label for="login-verification-input" class="input-label">
                <input
                    ref="inputRef"
                    @focus="onFocus"
                    @input="onInput"
                    v-model="input"
                    class="input"
                    type="number"
                    id="login-verification-input">
            </label>
            <div class="code-list">
                <div
                    class="code-item"
                    v-for="index in verificationCodeLength"
                    :class="{ 'active-code': inputArray[index - 1] }"
                    :key="index"
                >{{ inputArray[index - 1] }}</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

    import { defineComponent, ref, reactive } from 'vue'
    import { useRoute } from 'vue-router'
    import { useToast } from '../../components/common/Toast'
    import LoginModel from '../../models/Login'

    export default defineComponent({
        name: 'VerificationCode',
        setup() {

            const inputRef = ref(null)
            const input = ref('')
            const inputArray = reactive([])
            const countDown = ref(60)
            const route = useRoute()
            const phoneNumber = route.query.phone as string
            const verificationCodeLength = 4

            // 发送短信间隔倒计时
            const timerId = setInterval(() => {
                countDown.value --
                if (countDown.value === 0) clearInterval(timerId)
            }, 1000)

            /**
             * 校验验证码
             */
            async function verifyCode(code: string) : Promise<boolean> {
                try {
                    const res = await LoginModel.verifyVerificationCode(phoneNumber, code)
                    console.log(res)
                    if (res.code === 503) {
                        useToast().open(res.message)
                    } else {
                        return true
                    }
                } catch (err) {
                    return false
                }
            }

            /**
             * 输入验证码
             * @param event
             */
            async function onInput(event: InputEvent) {
                if (event.data) {
                    inputArray.push(event.data)

                    if (inputArray.length < verificationCodeLength) return

                    inputRef.value.blur()
                    setTimeout(async () => {
                        if (await verifyCode(inputArray.join(''))) {
                            useToast().open('登录成功')
                        }
                    }, 80)

                } else {
                    inputArray.pop()
                }
            }

            function onFocus() {
                input.value = inputArray.join('')
            }

            return {
                inputRef,
                input,
                onInput,
                onFocus,
                inputArray,
                countDown,
                phoneNumber,
                verificationCodeLength
            }
        }
    })

</script>

<style scoped>

    .verification-code {
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

    .sent-time {
        display: flex;
        justify-content: space-between;
        font-size: 26rem;
        color: var(--senond-font-color);
    }

    .code-input-wrap {
        margin: 0 auto;
        width: 600rem;
        position: relative;
    }

    .input-label {
        display: block;
        width: 100%;
        height: 60rem;
        position: relative;
        overflow: hidden;
    }

    .input {
        position: absolute;
        width: 100rem;
        height: 32rem;
        left: 0;
        bottom: 100rem;
    }

    .code-list {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: -1;
        display: flex;
        justify-content: space-between;
    }

    .code-item {
        width: 84rem;
        height: 84rem;
        line-height: 84rem;
        text-align: center;
        border-radius: 20rem;
        background-color: var(--pale-color);
        transition: background-color .1s;
    }

    .active-code {
        color: var(--light-color);
        background-color: var(--primary-light-color);
        box-shadow: 0 6rem 12rem rgba(226, 47, 38, .2);
    }

</style>
