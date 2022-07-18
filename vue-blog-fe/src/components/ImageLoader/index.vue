<template>
  <div class="image-loader-container">
    <img
      class="placeholder"
      :src="placeholderImg"
      alt="占位图"
      v-if="!isAllDone"
    />
    <img
      class="origin"
      :src="originImg"
      alt="原图"
      @load="onOriginLoaded"
      :style="{ opacity: originOPacity, transition: `opacity ${duration}ms` }"
    />
  </div>
</template>

<script>
export default {
  name: "ImageLoader",
  props: {
    placeholderImg: {
      type: String,
      required: true,
    },
    originImg: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      default: 500,
    },
  },
  data() {
    return {
      list: [
        {
          id: 1,
          midImg: "http://mdrs.yuanjin.tech/img/20201031141507.jpg",
          bigImg: "http://mdrs.yuanjin.tech/img/20201031141350.jpg",
          title: "凛冬将至",
          description: "人唯有恐惧的时候方能勇敢",
        },
        {
          id: 2,
          midImg: "http://mdrs.yuanjin.tech/img/20201031205550.jpg",
          bigImg: "http://mdrs.yuanjin.tech/img/20201031205551.jpg",
          title: "血火同源",
          description: "如果我回头，一切都晚了",
        },
        {
          id: 3,
          midImg: "http://mdrs.yuanjin.tech/img/20201031204401.jpg",
          bigImg: "http://mdrs.yuanjin.tech/img/20201031204403.jpg",
          title: "听我怒吼",
          description: "兰尼斯特有债必偿",
        },
      ],
      isOriginLoaded: false, // 原图是否加载完成
      isAllDone: false, // 是否原图过度完成，且删除占位图
    };
  },
  computed: {
    // 计算原图透明度
    originOPacity() {
      return this.isOriginLoaded ? 1 : 0;
    },
  },
  methods: {
    // 原图加载完成
    onOriginLoaded() {
      this.isOriginLoaded = true;
      // 过度完成再删除原图，避免白屏闪烁
      setTimeout(() => {
        this.isAllDone = true;
        this.$emit("onLoad");
      }, this.duration);
    },
  },
};
</script>

<style lang='less' scoped>
.image-loader-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  .placeholder,
  .origin {
    .self-fill();
    object-fit: cover;
  }
  .placeholder {
    filter: blur(2vw);
  }
  .origin {
    opacity: 0;
  }
}
</style>