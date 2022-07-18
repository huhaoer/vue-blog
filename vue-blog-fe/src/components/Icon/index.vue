<template>
  <i class="icon-container iconfont" :class="iconClass"></i>
</template>

<script>
const classMap = {
  home: "iconzhuye",
  success: "iconzhengque",
  error: "iconcuowu",
  close: "iconguanbi",
  warn: "iconjinggao",
  info: "iconxinxi",
  blog: "iconblog",
  code: "iconcode",
  about: "iconset_about_hov",
  weixin: "iconweixin",
  mail: "iconemail",
  github: "icongithub",
  qq: "iconsign_qq",
  arrowUp: "iconiconfonticonfonti2copy",
  arrowDown: "iconiconfonticonfonti2",
  empty: "iconempty",
  chat: "iconliuyan",
};
export default {
  name: "Icon",
  props: {
    type: {
      type: String,
      required: true,
    },
  },
  computed: {
    iconClass() {
      return classMap[this.type];
    },
  },
};
</script>

<style lang='less' scoped>
/*引入iconfont字体图标样式*/
@import url("//at.alicdn.com/t/font_2164449_nalfgtq7il.css");
.icon-container {
  color: inherit;
  font-size: inherit;
}
</style>