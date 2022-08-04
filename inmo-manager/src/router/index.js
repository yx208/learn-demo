import Vue from 'vue'
import VueRouter from 'vue-router'

import LoginModel from '../models/login'

const loginModel = new LoginModel()
const Login = () => import('@/views/Login')
const ManagerArticle = () => import('@/views/ManagerArticle')
const Upload = () => import('@/views/Upload')
const Home = () => import('@/views/Home')

Vue.use(VueRouter)

const routes = [{
   path: '/',
   name: 'root'
}, {
    path: '/login',
    name: 'Login',
    component: Login
}, {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [{
        path: 'managerArticle',
        name: 'ManagerArticle',
        component: ManagerArticle
    }, {
        path: 'upload',
        name: 'Upload',
        component: Upload
    }]
}]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach(async (to, from, next) => {

    // 适配线上路径
    if (to.path === '/manager') return next('/')

    // 首页
    if (from.path === to.path) {
        const res = await loginModel.verifyToken()

        res.errorCode === 0 ? 
            next({ path: '/home/managerArticle', replace: true }) : 
            next('/login')
    }
    // 从 URL 进入 login page
    else if (from.path === '/' && to.path === '/login') {
        const res = await loginModel.verifyToken()
        res.errorCode === 0 ?
            next({ path: '/home/managerArticle', replace: true }) :
            next()
    }
    // 从 URL 进入 其他 page
    else if (from.path === '/' && to.path !== '/login') {
        const res = await loginModel.verifyToken()
        res.errorCode === 0 ?
            next() :
            next({ path: '/login', replace: true })
    } else {
        next()
    }
})

export default router
