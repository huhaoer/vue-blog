<template>
  <div class="pager-container" v-if="pageNumber > 1">
    <a :class="{ disabled: current === 1 }" @click="onPageChange(1)"
      >|&lt;&lt;</a
    >
    <a :class="{ disabled: current === 1 }" @click="onPageChange(current - 1)"
      >&lt;&lt;</a
    >
    <a
      v-for="p in pageRender"
      :key="p"
      :class="{ active: current === p }"
      @click="onPageChange(p)"
      >{{ p }}</a
    >
    <a
      :class="{ disabled: current === pageNumber }"
      @click="onPageChange(current + 1)"
      >&gt;&gt;</a
    >
    <a
      :class="{ disabled: current === pageNumber }"
      @click="onPageChange(pageNumber)"
      >&gt;&gt;|</a
    >
  </div>
</template>

<script>
export default {
  name: "Pager",
  props: {
    // 当前页码
    current: {
      type: Number,
      default: 1,
    },
    // 总数据量
    total: {
      type: Number,
      default: 0,
    },
    // 每页数量
    limit: {
      type: Number,
      default: 10,
    },
    // 显示的中间页码数
    panelNumber: {
      type: Number,
      default: 5,
    },
  },
  computed: {
    // 计算总页数
    pageNumber() {
      return Math.ceil(this.total / this.limit);
    },
    // 显示最小的页码
    pageMin() {
      let min = this.current - Math.floor(this.panelNumber / 2);
      if (min < 1) {
        min = 1;
      }
      return min;
    },
    // 显示最大的页码
    pageMax() {
      let max = this.pageMin + this.panelNumber - 1;
      if (max > this.pageNumber) {
        max = this.pageNumber;
      }
      return max;
    },
    // 当前渲染展示的页码
    pageRender() {
      let pages = [];
      for (let i = this.pageMin; i <= this.pageMax; i++) {
        pages.push(i);
      }
      return pages;
    },
  },
  methods: {
    onPageChange(p) {
      if (p < 1) {
        p = 1;
      }
      if (p > this.pageNumber) {
        p = this.pageNumber;
      }
      if (p === this.current) {
        return;
      }
      this.$emit("onPageChange", p);
    },
  },
};
</script>

<style scoped lang="less">
.pager-container {
  display: flex;
  justify-content: center;
  margin: 20px 0;
  a {
    color: @primary;
    margin: 0 6px;
    cursor: pointer;
    user-select: none;
    &.disabled {
      color: @lightWords;
      cursor: not-allowed;
    }
    &.active {
      color: @words;
      font-weight: bold;
      cursor: text;
    }
  }
}
</style>