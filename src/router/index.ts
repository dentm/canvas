import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        redirect: '/canvas1'
    },
    ...(Object.entries(import.meta.globEager('../views/*.vue')).map(item => {
        let [name, module] = item;
        name = (name.match(/^\.\.\/views\/(.+)\.vue$/)!)[1];
        return {
            path: `/${name}`,
            name,
            component: module.default
        }
    }))
]

const router = createRouter({
    history: createWebHistory(),
    routes
})


export default router