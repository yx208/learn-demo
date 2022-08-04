<template>
    <div class="phone-container">
        <h2 class="title">登录</h2>
        <!-- 号码 -->
        <div class="field">
            <i class="iconfont icon-user"></i>
            <label class="label">
                <input class="input" v-model="phone" maxlength="11" placeholder="请输入手机号码" type="tel">
            </label>
        </div>
        <div class="field">
            <i class="iconfont icon-lock"></i>
            <label class="label">
                <input maxlength="30" v-model="password" class="input" type="text" placeholder="请输入密码">
            </label>
        </div>
        <!-- 空白空间 -->
        <div class="space"></div>
        <!-- 登录按钮 -->
        <div class="button" @click="onLogin"><span class="button-text">登录</span></div>
        <!-- 其他操作 -->
        <div class="sub-container">
            <span @click="onCodeLogin">验证码登录</span>
            <span @click="onForgotPassword">忘记密码</span>
        </div>
    </div>
</template>

<script lang="ts">

    import { defineComponent, ref } from 'vue'
    import { useRouter } from 'vue-router'
    import { useToast } from '../../components/common/Toast'
    import LoginModel from '../../models/Login'
    import LoginResponse from './User'

    export default defineComponent({
        name: 'Phone',
        setup() {

            // const isCodeMode = ref(false)
            const phone = ref('')
            const password = ref('')
            const router = useRouter()
            const toast = useToast()

            function onCodeLogin() {
                // isCodeMode.value = !isCodeMode.value
                router.push('/login/code')
            }

            function onForgotPassword() {
                router.push('/login/forgot')
                // LoginModel.checkPhoneIsRegister('17722242091').then(res => {
                //     console.log(res)
                // })
            }

            function validate() {
                if (phone.value.length !== 11) {
                    toast.open('电话号码长度不符合规范')
                    return false
                }

                if (password.value.length < 5 || password.value.length > 30) {
                    toast.open('密码长度不符合规范')
                    return false
                }

                return true
            }

            async function onLogin() {

                if (!validate()) return

                // const res = await LoginModel.phoneLogin(phone.value, password.value)

                const res: LoginResponse = LoginResponse

                if (res.code === 502) {
                    toast.open('密码错误')
                } else if (res.code === 200) {
                    localStorage.setItem('profile', res.profile)
                    await router.replace('/discover')
                }

            }

            return {
                onCodeLogin,
                onForgotPassword,
                phone,
                password,
                onLogin
                // isCodeMode
            }
        }
    })

</script>

<style scoped>

    .phone-container {
        margin: 0 auto;
        padding-top: 14vh;
        width: 80vw;
        overflow: hidden;
        transition: all .2s;
    }

    .title {
        padding: 40rem 0;
    }

    .field {
        width: 100%;
        box-sizing: border-box;
        margin-bottom: 32rem;
        padding: 32rem;
        display: flex;
        align-items: center;
        background-color: var(--five-level);
        border-radius: 12rem;
    }

    .field .iconfont {
        color: var(--primary-color);
        font-size: 40rem;
        vertical-align: -8%;
    }

    .field .label {
        flex: 1;
    }

    .input {
        width: 100%;
        box-sizing: border-box;
        outline: none;
        border: none;
        padding: 0 12rem;
        font-size: 30rem;
        background-color: transparent;
        caret-color: var(--primary-color);
    }

    .input::placeholder {
        color: var(--three-level);
    }

    .get-code {
        display: inline-block;
        color: var(--primary-color);
        font-size: 26rem;
    }


    .space {
        height: 32rem;
    }

    .button {
        padding: 32rem;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: var(--primary-color);
        border-radius: 12rem;
    }

    .button-text {
        color: #fff;
        letter-spacing: 20rem;
        margin-left: 20rem;
        font-size: 34rem;
    }

    .sub-container {
        display: flex;
        padding: 24rem;
        justify-content: space-between;
        color: var(--three-level);
        font-size: 26rem;
    }

</style>
