<template>
    <section class="login">
        <div class="panel">
            <el-form class="form" ref="form" :rules="rules" :model="form">
                <h1 class="title">Admin Manager</h1>
                <el-form-item prop="account">
                    <el-input
                        class="input"
                        placeholder="登录账户"
                        v-model="form.account">
                        <i slot="prefix" class="el-input__icon el-icon-user"></i>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        class="input"
                        placeholder="账户密码"
                        v-model="form.password"
                        show-password>
                        <i slot="prefix" class="el-input__icon el-icon-lock"></i>
                    </el-input>
                </el-form-item>
                <el-button class="submit" @click="onSubmit" type="primary">登录</el-button>
            </el-form>
        </div>
    </section>
</template>

<script>
import ArticleModel from '../models/article'

    import LoginModel from '../models/login'

    const loginModel = new LoginModel()

    export default {
        name: 'Login',
        data() {
            return {
                account: '',
                password: '',
                form: {
                    account: '',
                    password: ''
                },
                rules: {
                    account: [
                        { required: true, message: '登录账户', trigger: ['change', 'blur'] },
                        { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: ['change', 'blur'] }
                    ],
                    password: [
                        { required: true, message: '账户密码', trigger: ['change', 'blur'] },
                        { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: ['change', 'blur'] }
                    ]
                }
            }
        },
        methods: {
            onSubmit() {
                this.$refs['form'].validate((valid) => {
                    if (!valid) return false

                    this.login()
                });
            },
            async login() {
                const res = await loginModel.login({
                    account: this.form.account,
                    password: this.form.password
                })

                if (res.errorCode !== 0) {
                    this.loginFail(res)
                } else {
                    this.loginSuccess(res)
                }
            },

            loginSuccess(res) {
                LoginModel.setStorage('token', res.message.token)
                this.$root.isLogin = true
                this.$router.replace('/home/managerArticle')
            },
            loginFail(res) {
                this.$notify.error({
                    title: '登陆失败',
                    message: res.message
                })
            }
        }
    }
</script>

<style lang="stylus" scoped>

    .login
        width 100%
        height 100%
        display flex
        background-color #f5f6fa

        .panel
            box-sizing border-box
            margin auto
            padding 60px
            background-color #fff
            display flex
            flex-direction column
            align-items center
            justify-content center
            position relative
            clip-path polygon(10% 0%, 100% 0%, 100% 90%, 90% 100%, 0 100%, 0% 10%)

            .form
                display flex
                flex-direction column
                justify-content center
                align-items center

            .title
                font-size 4.6rem
                font-weight 100
                letter-spacing -2px
                margin-bottom 3rem
                line-height 1
            
            .input
                width 300px
                margin-top 1rem

            .submit
                width 14rem
                margin-top 3rem

</style>
