
export const verifyLoginMixin = {
    beforeCreate() {
        if (!this.$root.isLogin) this.$router.replace('/login')
    }
}
