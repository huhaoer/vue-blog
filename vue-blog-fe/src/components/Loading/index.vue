<template>
  <div :class="['container', fixed ? 'container--fixed' : 'container--abs']">
    <div class="loadding-con" :style="boxPosition">
      <div class="loadding-con__img" :style="imgSize">
        <img :src="mini ? miniGif : loadingGif" alt />
      </div>
      <p v-if="!mini" class="loadding-con__text" v-text="text"></p>
    </div>
  </div>
</template>

<script>
import loadingGif from "@/assets/img/loading.gif";
import miniGif from "@/assets/img/mini.gif";

export default {
  data() {
    return {
      loadingGif, // big loading
      miniGif, // mini loading
      /**
       * arg
       */
      mini: false, // 是否使用mini loading
      center: false, // 是否居中
      fixed: true, // 是否固定定位
      offset: null, // 距离顶部的top距离
      text: "", // loading text
    };
  },
  computed: {
    // 根据是否是mini loading判断当前图片大小
    imgSize() {
      if (this.mini) {
        return {
          width: "16px",
          height: "16px",
        };
      }
      return "";
    },
    // 根据是否是mini loading 判断外层容器的位置
    boxPosition() {
      if (this.center) {
        // 居中
        return {
          top: "50%",
          transform: "translate(-50%, -50%)",
        };
      } else {
        // 根据offset设置
        return {
          top: this.offset + "px",
        };
      }
    },
  },
  beforeDestroy() {
    this.show = false;
    this.text = "正在加载中";
    this.el = false;
    this.imgOut = null;
    this.mini = null;
  },
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  top: 0;
  left: 0;
  z-index: 2000;
  &--fixed {
    position: fixed;
  }
  &--abs {
    position: absolute;
  }
}
.loadding-con {
  position: absolute;
  //   top: 100px;
  left: 50%;
  transform: translateX(-50%);
  &__img {
    width: 120px;
    height: 120px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  &__text {
    text-align: center;
    margin-top: 16px;
    font-size: 20px;
    font-weight: bold;
    background: linear-gradient(to right, #f6c574, #fc5652, #00aacf);
    -webkit-background-clip: text;
    color: transparent;
  }
}
</style>