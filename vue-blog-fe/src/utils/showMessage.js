/**
 * 弹窗提示消息
 * @param {Object} options 配置选项
 */
import { getComponentRootDom } from "@/utils";
import Icon from '@/components/Icon'
import styles from './showMessage.module.less'

export default function (options = {}) {
    const content = options.content || ''
    const type = options.type || 'info'
    const duration = options.duration || 2000
    const container = options.container || document.body

    // 1.创建元素
    const divDom = document.createElement('div');
    divDom.dataset.role = 'dialog';
    const iconDom = getComponentRootDom(Icon, { type });
    divDom.innerHTML = `<span class='${styles['icon']}'>${iconDom.outerHTML}</span><div>${content}</div>`
    const typeClass = styles[`message-${type}`]
    divDom.className = `${styles['message']} ${typeClass}`

    // 2. 如果传递了容器元素则查看是否有定位，否则默认是body不需要添加定位，然后一直向上找父级，默认是根据窗口定位
    // 添加元素指定容器中，并检测是否有相对定位父级
    if (options.container) {
        if (getComputedStyle(container).position === 'static') {
            container.style.position = 'relative'
        }
    }

    const curDialogDom = document.querySelector('div[data-role=dialog]')
    if (curDialogDom) {
        // 避免重复弹窗多次
        return
    }
    container.appendChild(divDom)

    // 3.设置过渡动画，dom渲染异步的，需要在渲染完成前对当前的dom强制渲染，否则将按照最终的css代码渲染，即不出发过度
    divDom.clientHeight; // 出发强制渲染，获取元素的尺寸、位置等，触发reflow

    // 4.回归初始位置
    divDom.style.opacity = 1;
    divDom.style.transform = 'translate(-50%,-50%)';

    // 5.指定时间元素消失，执行回调
    setTimeout(() => {
        divDom.style.opacity = 0;
        divDom.style.transform = 'translate(-50%,-50%) translateY(-15px)';
        divDom.addEventListener('transitionend', () => {
            container.style.position = ''
            divDom.remove(); // 移除
            options.callback && options.callback();
        }, { once: true })
    }, duration);
}