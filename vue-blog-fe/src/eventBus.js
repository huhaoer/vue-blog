import Vue from 'vue'

/**
 * 主区域滚动事件 
 * - 事件名：mainScroll
 * - 参数：当前滚动元素
 * - 返回值：无
 * 
 * 
 * 主区域回到顶部事件
 * - 事件名：setMainScroll
 * - 参数：当前要设置的滚动高度
 * - 返回值： 无
 */

// 事件总线
const bus = new Vue({})
Vue.prototype.$bus = bus
export default bus