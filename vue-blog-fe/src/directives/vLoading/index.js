/**
 * v-loading指令
 * @param {*} el el元素
 * @param {*} bindings 绑定参数
 */
import Vue from 'vue'
import Loading from '@/components/Loading'

export default function (el, bindings) {
    // 1.生成Loading模板
    const LoadingTemp = Vue.extend(Loading)
    const LoadingProfile = new LoadingTemp({
        // Loading.vue中的template模板内容将会替换挂载的元素。挂载元素的内容都将被忽略。 *LoadingProfile.$el最终是template里面的内容
        el: document.createElement('div')
    })
    LoadingProfile.$el.dataset.role = 'loading'
    // 2.根据指令参数渲染模板
    // 参数
    let center = bindings.arg.center
    let fixed = bindings.arg.fixed
    const mini = bindings.arg.mini
    const offset = bindings.arg.offset
    const text = bindings.arg.text
    // 绑定值
    const val = bindings.value
    // 获取当前渲染的loading元素
    const getLoadingEl = () => el.querySelector('div[data-role=loading]')
    const curEl = getLoadingEl();
    // 当前loading模板赋值
    if (center === undefined) {
        center = true
    }
    if (fixed === undefined) {
        fixed = true
    }
    LoadingProfile.center = center // 默认居中
    LoadingProfile.fixed = fixed // 默认绝对定位
    LoadingProfile.mini = !!mini // 默认不使用小图片
    LoadingProfile.offset = offset || 200
    LoadingProfile.text = text || '正在加载中'
    if (val) {
        if (!curEl) {
            el.appendChild(LoadingProfile.$el)
            el.style = 'overflow:hidden'
        }
    } else {
        if (curEl) {
            curEl.remove()
            el.style = ''
        }
    }
}