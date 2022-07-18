// 首页轮播数据
import { getBanners } from '@/api/banner'

export default {
    namespaced:true,
    state: {
        isLoading: false, // 是否加载中
        data: [] // 轮播图
    },
    mutations: {
        setIsLoading(state, payload) {
            state.isLoading = payload
        },
        setBannerData(state, payload) {
            state.data = payload
        }
    },
    actions: {
        async fetchBannerAction({ commit, state }) {
            if (state.data.length) {
                return
            }
            commit('setIsLoading', true)
            const resp = await getBanners()
            console.log(resp,'resp');
            commit('setBannerData', resp)
            commit('setIsLoading', false)
        }
    }
}