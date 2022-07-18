<template>
  <div
    class="carousel-container"
    ref="containerRef"
    @mousemove="onMousemove"
    @mouseleave="onMouseleave"
  >
    <div class="img-wrap" ref="imgRef" :style="imgCurPosition">
      <ImageLoader
        :originImg="carousel.bigImg"
        :placeholderImg="carousel.midImg"
        @onLoad="onLoad"
      />
    </div>
    <div class="title" ref="titleRef">{{ carousel.title }}</div>
    <div class="desc" ref="descRef">{{ carousel.description }}</div>
  </div>
</template>

<script>
import ImageLoader from "@/components/ImageLoader";
export default {
  props: ["carousel"],
  components: {
    ImageLoader,
  },
  data() {
    return {
      titleWid: 0, // 标题文字宽度
      descWid: 0, // 描述文字宽度
      containerSize: null, // 外层容器尺寸
      imgSize: null, // 图片轮播尺寸
      mouseX: 0, // 鼠标在外层container容器的x坐标
      mouseY: 0, // 鼠标在外层container容器的y坐标
    };
  },
  computed: {
    // 当前图片定位坐标
    imgCurPosition() {
      /**
       * 当前图片定位位置计算：
       * 1.鼠标在容器最右边，x坐标为负的(图片宽度 - 容器宽度)
       * 2.鼠标在容器中间，存在比例关系 containerWidth / extraWidth = containerClientX / ?
       * 鼠标在最左边极限位置时，容器宽度 / 额外宽度 = 当前鼠标在容器的坐标 / 当前图片定位距离
       */
      if (!this.containerSize || !this.imgSize) {
        return;
      }
      const extraWid = this.imgSize.width - this.containerSize.width;
      const extraHei = this.imgSize.height - this.containerSize.height;
      const curX = (this.mouseX * -extraWid) / this.containerSize.width;
      const curY = (this.mouseY * -extraHei) / this.containerSize.height;
      return {
        transform: `translate(${curX}px, ${curY}px)`,
      };
    },
    // 鼠标居中的位置坐标
    mouseCenterPosition() {
      return {
        x: this.containerSize.width / 2,
        y: this.containerSize.height / 2,
      };
    },
  },
  mounted() {
    // 获取字体尺寸
    this.getFontSize();
    // 获取容器尺寸
    this.getContainerSize();
    // 设置鼠标在容器的坐标居中
    this.mouseX = this.mouseCenterPosition.x;
    this.mouseY = this.mouseCenterPosition.y;
    // 窗口改变
    window.addEventListener("resize", this.getContainerSize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.getContainerSize);
  },
  methods: {
    // 获取字体尺寸大小
    getFontSize() {
      const tWid = this.$refs["titleRef"].clientWidth;
      const dWid = this.$refs["descRef"].clientWidth;
      this.titleWid = tWid;
      this.descWid = dWid;
    },
    // 携带动画展示文字
    showWords() {
      this.$refs["titleRef"].style.opacity = 1;
      this.$refs["titleRef"].style.width = 0;
      this.$refs["titleRef"].clientWidth;
      this.$refs["titleRef"].style.transition = "1s";
      this.$refs["titleRef"].style.width = this.titleWid + "px";

      this.$refs["descRef"].style.opacity = 1;
      this.$refs["descRef"].style.width = 0;
      this.$refs["descRef"].clientWidth;
      this.$refs["descRef"].style.transition = "2s 1s";
      this.$refs["descRef"].style.width = this.descWid + "px";
    },
    // 图片加载完成，动画结束，删除占位图事件
    onLoad() {
      this.showWords();
    },
    // 获取容器尺寸
    getContainerSize() {
      const cW = this.$refs["containerRef"].clientWidth;
      const cH = this.$refs["containerRef"].clientHeight;
      this.containerSize = {
        width: cW,
        height: cH,
      };
      const iW = this.$refs["imgRef"].clientWidth;
      const iH = this.$refs["imgRef"].clientHeight;
      this.imgSize = {
        width: iW,
        height: iH,
      };
    },
    // 鼠标移动
    onMousemove(e) {
      const containerX =
        this.$refs["containerRef"].getBoundingClientRect().left;
      const containerY = this.$refs["containerRef"].getBoundingClientRect().top;
      this.mouseX = e.clientX - containerX; // 鼠标在容器中x坐标
      this.mouseY = e.clientY - containerY; // 鼠标在容器中y坐标
    },
    // 鼠标移出
    onMouseleave() {
      this.mouseX = this.mouseCenterPosition.x;
      this.mouseY = this.mouseCenterPosition.y;
    },
  },
};
</script>

<style lang='less' scoped>
.carousel-container {
  position: relative;
  width: 100%;
  height: 100%;
  color: #fff;
  overflow: hidden;
}
.img-wrap {
  position: absolute;
  width: 120%;
  height: 120%;
  left: 0;
  top: 0;
  transition: 300ms;
}
.title,
.desc {
  position: absolute;
  left: 30px;
  color: #fff;
  // 文字描边，浅色背景下也可看清楚文字
  text-shadow: 1px 0 0 rgba(0, 0, 0, 0.5), 0 1px 0 rgba(0, 0, 0, 0.5),
    -1px 0 0 rgba(0, 0, 0, 0.5), 0 -1px 0 rgba(0, 0, 0, 0.5);
  user-select: none;
  white-space: nowrap;
  opacity: 0; // 初始不可见，根据宽度展现过渡
  overflow: hidden;
}
.title {
  top: calc(50% - 40px);
  font-size: 2em;
}
.desc {
  top: calc(50% + 30px);
  font-size: 1.2em;
}
</style>