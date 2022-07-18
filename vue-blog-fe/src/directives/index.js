import vLoading from './vLoading'
import vLazy from './vLazy'

export default {
    install(Vue) {
        Vue.directive('loading', vLoading);
        Vue.directive('lazy', vLazy);
    }
}