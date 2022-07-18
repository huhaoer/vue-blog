<template>
  <div class="empty-container">
    <Icon type="empty" />
    <p>{{text}}</p>
  </div>
</template>

<script>
import Icon from "@/components/Icon";
export default {
  name: "Empty",
  components: {
    Icon,
  },
  props: {
    text: {
      type: String,
      default: "空",
    },
  },
};
</script>

<style lang='less' scoped>
.empty-container {
    color: lighten(@gray, 10%);
    .self-center(absolute);
    text-align: center;
}
.icon-container {
    font-size: 100px;
}
</style>