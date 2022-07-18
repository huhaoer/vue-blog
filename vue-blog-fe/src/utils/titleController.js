/**
 * 统一处理网站标题和路由标题
 */
let routeTitle = '', siteTitle = '';

const setTitle = _ => {
    if (!routeTitle && !siteTitle) {
        document.title = ''
    } else if (routeTitle && !siteTitle) {
        document.title = routeTitle
    } else if (!routeTitle && siteTitle) {
        document.title = siteTitle
    } else if (routeTitle && siteTitle) {
        document.title = `${routeTitle}-${siteTitle}`
    }
}
export default {
    /**
     * 设置路由标题
     * @param {String} title 标题
     */
    setRouteTitle(title) {
        routeTitle = title
        setTitle()
    },
    /**
     * 设置网站标题
     * @param {String} title 标题
     */
    setSiteTitle(title) {
        siteTitle = title
        setTitle()
    }
}