/**
 * 主区域事件总线
 * @param {*} refValue ref dom名
 */
export default function (refValue) {
    return {
        mounted() {
            this.$bus.$on("setMainScroll", this.handleSetMainScroll);
            this.$refs[refValue].addEventListener("scroll", this.handleMainScroll);
        },
        beforeDestroy() {
            this.$bus.$emit("mainScroll");
            this.$bus.$off("setMainScroll", this.handleSetMainScroll);
            this.$refs[refValue].removeEventListener("scroll", this.handleMainScroll);
        },
        methods: {
            // 设置主区域回到顶部
            handleSetMainScroll(scrollTop) {
                this.$refs[refValue].scrollTop = scrollTop;
            },
            // 设置主区域滚动
            handleMainScroll() {
                this.$bus.$emit("mainScroll", this.$refs[refValue]);
            },
        },
    }
}