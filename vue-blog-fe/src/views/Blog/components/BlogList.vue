<template>
  <div
    class="blog-list-container"
    v-loading:[{fixed:false,mini:true,}]="isLoading"
    ref="container"
  >
    <ul>
      <li v-for="item in data.rows" :key="item.id">
        <div class="thumb" v-if="item.thumb">
          <RouterLink :to="{ name: 'BlogDetail', params: { id: item.id } }">
            <img v-lazy="item.thumb" :alt="item.title" :title="item.title" />
            <!-- <img :src="item.thumb" :alt="item.title" :title="item.title" /> -->
          </RouterLink>
        </div>
        <div class="main">
          <RouterLink :to="{ name: 'BlogDetail', params: { id: item.id } }">
            <h2>{{ item.title }}</h2>
          </RouterLink>
          <div class="aside">
            <span>日期：{{ formatDate(item.createDate) }}</span>
            <span>浏览：{{ item.scanNumber }}</span>
            <span>评论：{{ item.commentNumber }}</span>
            <RouterLink
              :to="{
                name: 'BlogCategory',
                params: { cid: item.category.id },
              }"
              >{{ item.category.name }}</RouterLink
            >
          </div>
          <div class="desc">{{ item.desc }}</div>
        </div>
      </li>
    </ul>

    <!-- 分页 -->
    <Pager
      v-if="data.total"
      :current="currentRoute.page"
      :total="data.total"
      :limit="currentRoute.limit"
      :panelNumber="10"
      @onPageChange="handlePageChange"
    />
  </div>
</template>

<script>
import fetchData from "@/mixins/fetchData"; // 混入，需要提供fetchData函数请求数据，返回的数据在mixinData中  提供isLoading指令变狼判断加载
import mainScroll from '@/mixins/mainScroll';
import { getBlogs } from "@/api/blog";
import { formatDate } from "@/utils";
import Pager from "@/components/Pager";

export default {
  name: "BlogList",
  mixins: [fetchData({ total: 0, rows: [] }),mainScroll('container')],
  components: {
    Pager,
  },
  computed: {
    // 获取当前路由对象的值
    currentRoute() {
      const cid = +this.$route.params.cid || -1; // 根据路由获取当前传递的分类id，没有的话就是-1
      const page = +this.$route.query.page || 1; // 根据路由获取当前请求页数，没有的话默认就是1
      const limit = +this.$route.query.limit || 10; // 根据路由获取当前每页数量，没有的话默认10条
      return {
        cid,
        page,
        limit,
      };
    },
  },
  methods: {
    // mixin请求数据方法,传递当前路由获取的参数进行请求对应数据
    async fetchData() {
      const resp = await getBlogs(
        this.currentRoute.page,
        this.currentRoute.limit,
        this.currentRoute.cid
      );
      return resp;
    },
    // 格式化日期方法
    formatDate,
    // 翻页变化事件
    handlePageChange(newPage) {
      const isCategory = this.currentRoute.cid === -1;
      const query = {
        page: newPage,
        limit: this.currentRoute.limit,
      };
      if (isCategory) {
        this.$router.push({
          name: "Blog",
          query,
        });
      } else {
        this.$router.push({
          name: "BlogCategory",
          query,
          params: {
            cid: this.currentRoute.cid,
          },
        });
      }
    },
  },
  watch: {
    async $route() {
      // 监听路由发生变化，重新请求数据
      // 滚动条归位，当前container是固定屏幕高度，内容可滚动，所以加载loading在顶部，使滚动条归位切设置scroll-behavior: smooth平滑过渡
      this.$refs["container"].scrollTop = 0;
      this.isLoading = true;
      this.data = await this.fetchData();
      this.isLoading = false;
    },
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/variable.less";
.blog-list-container {
  line-height: 1.7;
  position: relative;
  padding: 20px;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  scroll-behavior: smooth;
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
}
li {
  display: flex;
  padding: 15px 0;
  border-bottom: 1px solid @gray;
  min-width: 800px;
  .thumb {
    flex: 0 0 auto;
    margin-right: 15px;
    img {
      display: block;
      max-width: 200px;
      border-radius: 5px;
    }
  }
  .main {
    flex: 1 1 auto;
    h2 {
      margin: 0;
    }
  }
  .aside {
    font-size: 12px;
    color: @gray;
    span {
      margin-right: 15px;
    }
  }
  .desc {
    margin: 15px 0;
    font-size: 14px;
  }
}
</style>