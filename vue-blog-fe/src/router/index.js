import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import { titleController } from '@/utils'
Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes
})
router.afterEach((to, from) => {
    if (to.meta.title) {
        titleController.setRouteTitle(to.meta.title)
    }
})
export default router