<template>
  <div class="message-container" ref="mainContainerRef">
    <MessageArea
      title="留言板"
      :subTitle="`(${data.total})`"
      :list="data.rows"
      :isListLoading="isLoading"
      @submit="onMessageSubmit"
    />
  </div>
</template>

<script>
import MessageArea from "@/components/MessageArea";
import * as messageApi from "@/api/message";
import mainScroll from "@/mixins/mainScroll";
import fetchData from "@/mixins/fetchData";
export default {
  mixins: [fetchData({ total: 0, rows: [] }), mainScroll("mainContainerRef")],
  components: {
    MessageArea,
  },
  computed: {
    hasMore() {
      return this.data.rows.length < this.data.total;
    },
  },
  data() {
    return {
      page: 1,
      limit: 10,
    };
  },
  created() {
    this.$bus.$on("mainScroll", this.handleScroll);
  },
  beforeDestroy() {
    this.$bus.$off("mainScroll", this.handleScroll);
  },
  methods: {
    async fetchData() {
      const r = await messageApi.getMessages(this.page, this.limit);
      return r;
    },
    async onMessageSubmit(data, cb) {
      const resp = await messageApi.postMessage(data);
      this.data.total++;
      this.data.rows.unshift(resp);
      cb("感谢您的评论～");
    },
    handleScroll(dom) {
      if (this.isLoading || !dom) {
        return;
      }
      const range = 100; // 顶一个可接受的范围，在这个范围内都算达到了底部
      const dec = Math.abs(dom.scrollTop + dom.clientHeight - dom.scrollHeight);
      if (dec <= range) {
        this.fetchMore();
      }
    },
    async fetchMore() {
      if (!this.hasMore) {
        // 没有更多啦
        return;
      }
      this.isLoading = true;
      this.page++;
      const resp = await this.fetchData();
      this.data.total = resp.total;
      this.data.rows = this.data.rows.concat(resp.rows);
      this.isLoading = false;
    },
  },
};
</script>

<style scoped>
.message-container {
  width: 100%;
  height: 100%;
  padding: 25px;
  box-sizing: border-box;
  overflow: auto;
  scroll-behavior: smooth;
}
.message-area-container {
  width: 700px;
  margin: 0 auto;
}
</style>