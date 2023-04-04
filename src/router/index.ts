import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

const routes: RouteRecordRaw[] = [
    {
        path: '/login',
        name: "Login",
        meta: {
            title: "登录"
        },
        component: () => import('@/views/login/index.vue')
    },
    {
        path: '/redirect',
        component: Layout,
        meta: { hidden: true },
        children: [
            {
                path: '/redirect/:path(.*)',
                component: () => import('@/views/redirect/index.vue')
            }
        ]
    },
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [
            {
                path: 'dashboard',
                component: () => import('@/views/dashboard/index.vue'),
                name: 'Dashboard',
                meta: { title: '控制台', icon: 'homepage', affix: true }
            },
        ]
    },
    {
        path: '/system',
        component: Layout,
        meta: { title: '常规管理'},
        redirect: '/file',
        children: [
            {
                path: '/file',
                component: () => import('@/views/file/index.vue'),
                name: 'File',
                meta: { title: '附件管理', icon: 'homepage', affix: true }
            },
        ]
    },
    {
        path: '/login',
        name: "Login",
        meta: {
            title: "登录"
        },
        component: () => import('@/views/login/index.vue')
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes as RouteRecordRaw[],
    // 刷新时，滚动条位置还原
    scrollBehavior: () => ({ left: 0, top: 0 })
})


export default router