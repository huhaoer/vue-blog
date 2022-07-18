<template>
  <div class="demo-container">
    <div class="header">
      <h1>header</h1>
      <div class="wrap no" ref="btnRef" :style="{ opacity: isBot ? 1 : 0 }">
        <button class="btn">提交</button>
      </div>
    </div>
    <div class="item-container" ref="containerRef">
      <div class="item" v-for="item in 20">demo{{ item }}</div>
      <div class="wrap" ref="btnRef" :style="{ opacity: isBot ? 1 : 0 }">
        <button class="btn">提交</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isBot: false,
      btnRef: null,
      containerRef: null,
      isFirst: false,
      scrollH: null,
    };
  },
  mounted() {
    this.btnRef = this.$refs.btnRef || null;
    this.containerRef = this.$refs.containerRef || null;
    this.scrollH = this.containerRef.scrollHeight;
    console.log(this.scrollH, "scrollH");
    console.log(this.btnRef, "ref", this.containerRef);
    console.log(this.containerRef.offsetTop, "ot", this.btnRef.offsetTop);
    console.log(this.btnRef.getBoundingClientRect());
    this.containerRef.addEventListener("scroll", this.scroll);
  },
  beforeDestroy() {
    this.containerRef.addEventListener("scroll", this.scroll);
    this.containerRef.removeEventListener("scroll", this.scroll);
  },
  methods: {
    scroll() {
      const sh = this.containerRef.scrollHeight;
      const ch = this.containerRef.clientHeight;
      const st = this.containerRef.scrollTop;
    //   console.log(this.containerRef.offsetTop, "ot", this.btnRef.offsetTop);
      // console.log(ch,st,'??');
      console.log(this.btnRef.getBoundingClientRect().top, "...");
      if (this.btnRef.getBoundingClientRect().top - 120 <= ch) {
        console.log("底部");
        this.isBot = true;
      } else {
        console.log("非底部");
        this.isBot = false;
      }
    },
  },
};
</script>

<style lang='less' scoped>
.demo-container {
  width: 100%;
  height: 100%;
}
.header {
  height: 120px;
  background-color: yellow;
}
.item-container {
  height: calc(100% - 120px);
  overflow: auto;
}
.wrap {
  text-align: center;
//   margin-top: 40px;
  &.no {
    margin-top: 0;
  }
  .btn {
    width: 200px;
    height: 60px;
    color: red;
    background-color: #ccc;
    cursor: pointer;
  }
}
.item {
  width: 100%;
  height: 80px;
  background-color: lightblue;
  color: #fff;
  border: 1px solid #fff;
  box-sizing: border-box;
}
</style>