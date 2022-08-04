import {
    Router,
    RouteRecordRaw,
    createWebHistory,
    createRouter
} from 'vue-router'
import AppEntrance from "../views/AppEntrance/AppEntrance.vue"

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/appEntrance'
    },
    {
        path: '/appEntrance',
        component: AppEntrance,
        meta: {
            level: 2
        }
    },
    {
        path: '/login',
        component: () => import('../views/Login/Login.vue'),
        redirect: '/login/phone',
        meta: {
            level: 1
        },
        children: [
            {
                path: 'phone',
                component: () => import('../views/Login/Phone.vue'),
                meta: {
                    level: 2
                }
            },
            {
                path: 'code',
                component: () => import('../views/Login/Code.vue'),
                meta: {
                    level: 2
                }
            },
            {
                path: 'forgot',
                component: () => import('../views/Login/ForgotPassword.vue'),
                meta: {
                    level: 2
                }
            }
        ]
    },
    {
        path: '/discover',
        component: () => import('../views/Discover/Discover.vue'),
        meta: {
            level: 1
        }
    },
    {
        path: '/my',
        component: () => import('../views/My/My.vue'),
        meta: {
            level: 1
        }
    },
    {
        path: '/player',
        component: () => import('../views/Player/Player.vue'),
        meta: {
            level: 2
        }
    }
]

const router: Router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from) => {

})

export default router
