import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import { showMessage } from '@/utils'
import directives from '@/directives'
import './styles/global.less'
import '@/mock'
import './eventBus'
store.dispatch('setting/fetchSettingAction') // 初始化获取全局设置store


Vue.config.productionTip = false
Vue.prototype.$showMessage = showMessage;
Vue.use(directives) // 指令插件集

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
