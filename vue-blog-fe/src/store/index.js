import Vuex from 'vuex'
import Vue from 'vue'
import logger from 'vuex/dist/logger'
import banner from './banner'
import setting from './setting'
import about from './about'
import project from './project'

Vue.use(Vuex)
export default new Vuex.Store({
    modules: {
        banner,
        setting,
        about,
        project
    },
    strict: process.env.NODE_ENV !== 'development',
    plugins: process.env.NODE_ENV === 'development' ?  [logger()] : []
})