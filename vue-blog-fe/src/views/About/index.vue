<template>
  <div
    class="about-container"
    v-loading:[{fixed:false}]="loading || !isFrameLoad"
  >
    <iframe
      v-if="src"
      :src="src"
      frameborder="0"
      class="about-content"
      @load="isFrameLoad = true"
    ></iframe>
  </div>
</template>

<script>
import { mapState, mapstate } from "vuex";
export default {
  computed: {
    ...mapState("about", {
      src: "data",
      loading: "isLoading",
    }),
  },
  data() {
    return {
      isFrameLoad: false,
    };
  },
  created() {
    this.$store.dispatch("about/fetchAboutAction");
  },
};
</script>

<style scoped lang='less'>
.about-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}
.about-content {
  width: 100%;
  height: 100%;
  display: block;
  box-sizing: border-box;
}
</style>