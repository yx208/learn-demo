import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import Home from '../views/Home/Home.vue';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/article',
        name: 'Article',
        component: () => import('../views/Article/Article.vue')
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
