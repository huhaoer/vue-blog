<template>
  <ul class="right-list-container">
    <li v-for="(item, i) in list" :key="i">
      <span :class="{ active: item.isActive }" @click="onSelect(item)">{{
        item.name
      }}</span>
      <span
        class="aside"
        :class="{ active: item.isActive }"
        v-if="item.aside"
        @click="onSelect(item)"
        >{{ item.aside }}</span
      >
      <RightList
        v-if="item.children"
        :list="item.children"
        @onSelect="onSelect"
      />
    </li>
  </ul>
</template>

<script>
export default {
  name: "RightList",
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    // 选项点击
    onSelect(item) {
      this.$emit("onSelect", item);
    },
  },
};
</script>

<style lang='less' scoped>
.right-list-container {
  .right-list-container {
    margin-left: 1em;
  }
  li {
    min-height: 40px;
    line-height: 40px;
    font-size: 14px;
    cursor: pointer;
  }
  span {
    &.active {
      color: @warn;
    }
  }
  .aside {
    margin-left: 1em;
    font-size: 12px;
    color: @gray;
    &.active {
      color: @warn;
    }
  }
}
</style>