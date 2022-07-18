/**
 * 获取组件元素根结点dom元素
 * @param {Component} comp 组件
 * @param {Object} props 组件属性
 */
import Vue from 'vue'
export default function (comp, props) {
    const vm = new Vue({
        render: h => h(comp, {props})
    })
    vm.$mount();
    return vm.$el;
}