<template>
  <div
    class="blog-category-container"
    v-loading:[{fixed:false,mini:true}]="isLoading"
  >
    <h2>目录</h2>
    <RightList :list="typeList" @onSelect="handleSelect" />
  </div>
</template>

<script>
import fetchData from "@/mixins/fetchData";
import { getBlogTypes } from "@/api/blog";
import RightList from "../components/RightList";
export default {
  name: "BlogCategory",
  mixins: [fetchData([])],
  components: {
    RightList,
  },
  computed: {
    currentRoute() {
      // 获取当前路由计算属性
      const cid = +this.$route.params.cid || -1; // 当前分类id
      const limit = +this.$route.query.limit || 10; // 页容量
      return {
        cid,
        limit,
      };
    },
    typeList() {
      // 根据获取的远程数据，计算当前应当渲染的分类列表
      const total = this.data.reduce((a, b) => a + b.count, 0); // 当前所有分类的总数
      const result = [{ name: "全部", id: -1, count: total }, ...this.data]; // 手动添加全部分类的信息
      const list = result.map((it) => ({
        ...it,
        isActive: it.id === this.currentRoute.cid, // 根据当前路由分类id判断当前项是否被选中匹配
        aside: `${it.count}篇` // 显示侧边数量
      }));
      return list;
    },
  },
  methods: {
    // 获取数据
    async fetchData() {
      return await getBlogTypes();
    },
    // 分类点击事件
    handleSelect(t) {
      // 根据当前点击的分类id判断跳转到哪种情况的显示界面 Blog | BlogCategory
      const cId = t.id; // 当前点击的分类id
      const query = {
        page: 1, // 切换分类后到第1页
        limit: this.currentRoute.limit,
      };
      if (cId === -1) {
        // 跳转的是没有分类的Blog
        this.$router.push({
          name: "Blog",
          query,
        });
      } else {
        // 跳转到有分类的BlogCategory
        this.$router.push({
          name: "BlogCategory",
          query,
          params: {
            cid: cId,
          },
        });
      }
    },
  },
};
</script>

<style lang='less' scoped>
.blog-category-container {
  position: relative;
  overflow: auto;
  width: 220px;
  height: 100%;
  padding: 20px 20px 20px 40px;
  box-sizing: border-box;
  h2 {
    font-size: 1em;
    font-weight: bold;
    letter-spacing: 2px;
  }
}
</style>