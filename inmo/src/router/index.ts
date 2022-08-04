import {
    createRouter,
    Router,
    RouteRecordRaw,
    createWebHistory,
} from 'vue-router'

import { isLoading } from '../utils/globalVar'

import Home from '../views/Home.vue'

const routes: RouteRecordRaw[] = [{
    path: '/',
    name: 'Root',
    component: Home
}, {
    path: '/article',
    name: 'Article',
    component: () => import('/@/views/Article.vue')
}]

const router: Router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    
    // 返回 Home 不显示
    if (to.path === '/' && from.name) return next()

    isLoading.value = true
    next()
})

export default router

