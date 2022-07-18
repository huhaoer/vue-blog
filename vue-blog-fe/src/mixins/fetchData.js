/**
 * 远程获取数据mixin，需要提供fetchData方法获取数据
 * @param {*} defaultValue data默认值
 * @returns 
 */
export default function (defaultValue = null) {
    return {
        data() {
            return {
                isLoading: true, // 是否加载中
                data: defaultValue // 数据
            }
        },
        async created() {
            try {
                this.data = await this.fetchData()
                this.isLoading = false
            } catch (error) {
                this.isLoading = false
            }

        }
    }
}