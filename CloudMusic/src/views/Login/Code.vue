<template>
    <div class="code-container">
        <h2 class="title">验证码登录</h2>
        <div class="field">
            <i class="iconfont icon-user"></i>
            <label for="login-code-input" class="label">
                <input
                    maxlength="11"
                    class="input"
                    type="tel"
                    id="login-code-input"
                    placeholder="请输入手机号码">
            </label>
            <span class="get-code">获取验证码</span>
        </div>
        <div class="field">
            <i class="iconfont icon-tupianyanzhengma"></i>
            <label for="login-verify-input" class="label">
                <input
                    maxlength="11"
                    class="input"
                    type="tel"
                    id="login-verify-input"
                    placeholder="请输入验证码">
            </label>
        </div>
        <div class="space"></div>
        <div class="button">
            <span class="button-text">登录</span>
        </div>
    </div>
</template>

<style scoped>

    .code-container {
        margin: 0 auto;
        padding-top: 14vh;
        width: 80vw;
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

</style>
