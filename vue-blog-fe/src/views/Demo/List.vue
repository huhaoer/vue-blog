<template>
  <div class="demo2">
    <ListItem
      v-for="(item, index) in list"
      :key="item.name"
      :item="item"
      @audioPlay="audioPlay($event, index)"
      :isPlay="isPlay[index]"
      :progress="progress[index]"
    />
    <audio
      :src="src"
      ref="audioRef"
      @canplay="canPlay"
      @timeupdate="timeUpdate"
      @ended="ended"
    ></audio>
  </div>
</template>

<script>
import ListItem from "./ListItem.vue";
export default {
  props: {
    list: Array,
  },
  components: {
    ListItem,
  },
  data() {
    return {
      audioRef: null,
      duration: 0,
      isPlay: [],
      progress: [],
      index: null,
      src: null,
    };
  },
  created() {
    this.list.forEach((it, i) => {
      this.$set(this.isPlay, i, false);
      this.$set(this.progress, i, 0);
    });
  },
  mounted() {
    this.audioRef = this.$refs.audioRef;
    console.log(this.audioRef);
  },
  methods: {
    canPlay() {
      this.duration = this.audioRef.duration;
      this.audioRef.play();
    },
    timeUpdate() {
      let p = (this.audioRef.currentTime / this.duration) * 100;
      console.log(p);
      if (p >= 100) {
        p = 100;
      }
      this.$set(this.progress, this.index, p);
    },
    ended() {
      this.$set(this.isPlay, this.index, false);
      this.$set(this.progress, this.index, 0);
    },
    audioPlay(item, index) {
      this.src = item.audio;
      this.index = index;
      if (this.isPlay[index]) {
        this.$set(this.isPlay, this.index, false);
        this.audioRef.pause();
      } else {
        this.clearOther();
        this.$set(this.isPlay, this.index, true);
        this.audioRef.play();
      }
    },
    clearOther() {
      this.isPlay.forEach((it, index) => {
        this.$set(this.isPlay, index, false);
        this.$set(this.progress, index, 0);
      });
    },
  },
};
</script>

<style>
.demo2 {
  height: 100%;
  overflow: auto;
}
</style>