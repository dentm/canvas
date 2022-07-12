import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    {
        path:'/',
        name:'canvas1',
        component: () => import('@/views/canvas1.vue')
    },
    {
        path:'/canvas2',
        name:'canvas2',
        component: () => import('@/views/canvas2.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})


export default router