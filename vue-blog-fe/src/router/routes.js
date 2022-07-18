import { start, done, configure } from 'nprogress'
import 'nprogress/nprogress.css'
import NotFound from '@/views/NotFound'

configure({
    trickleSpeed: 10,
    showSpinner: false
})

const delay = (duration) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, duration);
    })
}
/**
 * 处理异步路由组件加载
 * @param {*} compResolve 异步路由组件promise函数
 */
const fetchAsyncComp = (compResolve) => {
    return async () => {
        start()
        if (process.env.NODE_ENV === 'development') {
            await delay(3000)
        }
        const comp = await compResolve()
        done()
        return comp
    }
}
const routes = [
    {
        name: 'Home',
        path: '/',
        component: fetchAsyncComp(() => import('@/views/Home')),
        meta: {
            title: '首页'
        }
    },
    {
        name: 'About',
        path: '/about',
        component: fetchAsyncComp(() => import('@/views/About')),
        meta: {
            title: '关于我'
        }
    },
    {
        name: 'Blog',
        path: '/blog',
        component: fetchAsyncComp(() => import('@/views/Blog')),
        meta: {
            title: '文章'
        }
    },
    {
        name: 'BlogCategory',
        path: '/blog/cate/:cid',
        component: fetchAsyncComp(() => import('@/views/Blog')),
        meta: {
            title: '文章分类'
        }
    },
    {
        name: 'BlogDetail',
        path: '/blog/:id',
        component: fetchAsyncComp(() => import('@/views/Blog/Detail')),
        meta: {
            title: '文章详情'
        }
    },
    {
        name: 'Project',
        path: '/project',
        component: fetchAsyncComp(() => import('@/views/Project')),
        meta: {
            title: '项目&效果'
        }
    },
    {
        name: 'Message',
        path: '/message',
        component: fetchAsyncComp(() => import('@/views/Message')),
        meta: {
            title: '留言板'
        }
    },
    {
        name: 'Demo',
        path: '/demo',
        component: () => import('@/views/Demo/List.vue')
    },
    {
        name: 'AsyncComponent',
        path: '/async',
        component: () => import(/* webpackChunkName: 'AsyncComponent' */ '@/views/AsyncComponent')
    },
    {
        name: 'NotFound',
        path: '*',
        component: NotFound
    }
]

export default routes;