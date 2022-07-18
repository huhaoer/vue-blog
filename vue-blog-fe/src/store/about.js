// 关于我
import { getAbout } from '@/api/about'

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
        setAboutData(state, payload) {
            state.data = payload
        }
    },
    actions: {
        async fetchAboutAction({ commit, state }) {
            commit('setIsLoading', true)
            const resp = await getAbout()
            commit('setAboutData', resp)
            commit('setIsLoading', false)
        }
    }
}