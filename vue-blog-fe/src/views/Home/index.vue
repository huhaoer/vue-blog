<template>
  <div
    class="home-container"
    ref="containerRef"
    @wheel="onWheel"
    v-loading:{}="isLoading"
  >
    <!--  轮播 -->
    <ul
      class="carousel"
      :style="{ marginTop: carouselMarginTop }"
      @transitionend="onTransitionend"
    >
      <li class="carousel-item" v-for="item in data" :key="item.id">
        <CarouselItem :carousel="item" />
      </li>
    </ul>
    <!-- 滑动按钮 -->
    <div class="icon icon-up" v-show="index > 0" @click="switchTo(index - 1)">
      <Icon type="arrowUp" />
    </div>
    <div
      class="icon icon-down"
      v-show="index < data.length - 1"
      @click="switchTo(index + 1)"
    >
      <Icon type="arrowDown" />
    </div>
    <!-- 指示器 -->
    <div class="indicator">
      <div
        class="indicator-item"
        v-for="(item, i) in data"
        :key="i"
        :class="{ active: index === i }"
        @click="switchTo(i)"
      ></div>
    </div>
  </div>
</template>

<script>
import * as bannerApi from "@/api/banner";
import Icon from "@/components/Icon";
import CarouselItem from "./components/CarouselItem.vue";
import { mapState } from "vuex";

export default {
  data() {
    return {
      index: 0, // 索引
      containerHeight: 0, // 轮播屏幕高度
      isSwitching: false, // 是否在滚轮滑动中
    };
  },
  components: {
    Icon,
    CarouselItem,
  },
  computed: {
    ...mapState("banner", ["isLoading", 'data']),
    carouselMarginTop() {
      return -this.index * this.containerHeight + "px";
    },
  },
  created() {
    this.$store.dispatch("banner/fetchBannerAction");
  },
  mounted() {
    this.containerHeight = this.$refs["containerRef"].clientHeight;
    window.addEventListener("resize", this.onResize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },

  methods: {
    // 切换
    switchTo(i) {
      this.index = i;
    },
    // 滚轮滑动
    onWheel(e) {
      if (this.isSwitching) {
        return;
      }
      if (e.deltaY <= -5 && this.index > 0) {
        // 向上滑动
        this.isSwitching = true;
        this.index--;
      } else if (e.deltaY >= 5 && this.index < this.data.length - 1) {
        // 向下滑动
        this.isSwitching = true;
        this.index++;
      }
    },
    // 轮播动画过度结束
    onTransitionend() {
      this.isSwitching = false;
    },
    // 窗口变化事件
    onResize() {
      this.containerHeight = this.$refs["containerRef"].clientHeight;
    },
  },
};
</script>

<style lang='less' scoped>
.home-container {
  position: relative;
  overflow: hidden; // bfc
  width: 100%;
  height: 100%;
}
.carousel {
  width: 100%;
  height: 100%;
  transition: 1s;
  .carousel-item {
    width: 100%;
    height: 100%;
  }
}

.icon {
  @gap: 10px;
  .self-center();
  transform: translateX(-50%);
  color: @gray;
  font-size: 30px;
  cursor: pointer;
  &.icon-up {
    top: @gap;
    animation: jump-up 2s infinite;
  }
  &.icon-down {
    top: auto;
    bottom: @gap;
    animation: jump-down 2s infinite;
  }
}
// 图标动画
@jump: 5px;
@keyframes jump-up {
  0% {
    transform: translate(-50%, @jump);
  }
  50% {
    transform: translate(-50%, -@jump);
  }
  100% {
    transform: translate(-50%, @jump);
  }
}
@keyframes jump-down {
  0% {
    transform: translate(-50%, -@jump);
  }
  50% {
    transform: translate(-50%, @jump);
  }
  100% {
    transform: translate(-50%, -@jump);
  }
}

.indicator {
  .self-center();
  transform: translateY(-50%);
  left: auto;
  right: 10px;
  .indicator-item {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    border: 1px solid #fff;
    margin-bottom: 10px;
    box-sizing: border-box;
    background-color: @words;
    cursor: pointer;

    &.active {
      background-color: #fff;
    }
  }
}
</style>