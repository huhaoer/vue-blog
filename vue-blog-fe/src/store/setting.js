// 系统设置
import { getSetting } from '@/api/setting'
import { titleController } from '@/utils'

export default {
    namespaced: true,
    state: {
        isLoading: false, // 是否加载中
        data: null // 系统设置对象
    },
    mutations: {
        setIsLoading(state, payload) {
            state.isLoading = payload
        },
        setSettingData(state, payload) {
            state.data = payload
        }
    },
    actions: {
        async fetchSettingAction({ commit, state }) {
            commit('setIsLoading', true)
            const resp = await getSetting()
            commit('setSettingData', resp)
            commit('setIsLoading', false)
            // 设置icon
            if (resp.favicon) {
                let link = document.querySelector('link[rel="shortcut icon"]')
                if (!link) {
                    link = document.createElement('link')
                    link.rel = 'shortcut icon'
                    link.type = 'images/x-icon'
                    link.href = resp.favicon
                    const head = document.querySelector('head').appendChild(link)
                }
            }
            // 设置网站标题
            if (resp.siteTitle) {
                titleController.setSiteTitle(resp.siteTitle)
            }
        }
    }
}