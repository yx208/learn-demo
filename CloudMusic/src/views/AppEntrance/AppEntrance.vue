<template>
    <div class="container">
        <div class="sub-container">
            <div class="logo-wrap">
                <div class="logo"><i class="iconfont icon-netEaseCloud"></i></div>
            </div>
            <div class="content">
                <div class="phone-login" @click="onPhoneLogin">手机号码登录</div>
            </div>
            <div class="login-methods">
                <div class="login-item"><i class="iconfont icon-weixin"></i></div>
                <div class="login-item" @click="loginForQQ"><i class="iconfont icon-qq"></i></div>
                <div class="login-item"><i class="iconfont icon-weibo"></i></div>
                <div class="login-item"><i class="iconfont icon-wangyi"></i></div>
            </div>
        </div>
        <div class="footer">
            <label><input type="checkbox"></label>
            <span class="protocol">同意《用户隐私协议》</span>
        </div>
    </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
    name: 'AppEntrance',
    setup() {

        document.title = '云音乐'

        const router = useRouter()

        function loginForQQ() {
            // import('@/lib/qc_jssdk.js')
        }

        function onPhoneLogin() {
            router.replace('/login/phone')
        }

        return {
            loginForQQ,
            onPhoneLogin
        }
    }
})

</script>

<style scoped>

.container {
    background-color: var(--primary-color);
    height: 100vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
}

.sub-container {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.logo-wrap {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--primary-color);
}

.logo {
    width: 200rem;
    height: 200rem;
    line-height: 200rem;
    text-align: center;
    border-radius: 50%;
    background-color: var(--primary-light-color);
}

.logo-wrap .icon-netEaseCloud {
    color: #FFF;
    font-size: 150rem;
}

.login-methods {
    margin: 50rem 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    color: var(--pale-color);
}

.login-item {
    margin: 0 14rem;
    width: 50rem;
    height: 50rem;
    text-align: center;
    line-height: 50rem;
    border-radius: 50%;
    border: 1px solid var(--pale-color);
}

.login-item .iconfont {
    font-size: 34rem;
}

.footer {
    margin-bottom: 30rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    color: var(--pale-color);
    font-size: 24rem;
}

.protocol {
    margin-left: 10rem;
}

.phone-login {
    margin: 0 auto;
    width: 400rem;
    height: 80rem;
    line-height: 80rem;
    background-color: var(--light-color);
    color: var(--primary-color);
    border-radius: 64rem;
    text-align: center;
}

</style>
