<template>
  <div class="item">
    <div>名称:{{ item.name }}</div>
    <div>
      <button @click="$emit('audioPlay',item)">{{ isPlay ? "播放" : "暂停" }}</button>
    </div>
    <div class="ps">进度:<div class="p" :style="{width: progress + '%'}"></div></div>
  </div>
</template>

<script>
export default {
  props: {
    item: Object,
    isPlay: Boolean,
    progress: Number,
  },
};
</script>

<style>
.item {
    width: 100%;
    height: 80px;
    border: 1px solid lightblue;
    box-sizing: border-box;
    margin-bottom: 10px;
}
.ps {
    position: relative;
    width: 200px;
    border: 1px solid red;
    box-sizing: border-box;
}
.p {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background-color: greenyellow;
}
</style>