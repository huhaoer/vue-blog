<template>
  <div class="app-container">
    <Layout>
      <template #left>
        <div class="aside">
          <SiteAside />
        </div>
      </template>
      <template #default>
        <!-- <div class="router-view" ref="routerRef">
        </div> -->
        <RouterView />
        <!-- <Loading  /> -->
        <!-- <div v-loading:[params]="loading">text</div> -->
        <!-- <List :list="list" /> -->
      </template>
    </Layout>
    <ToTop />
    <!-- <Parent /> -->
    <!-- <RefDom /> -->
    <!-- <WatchImmediate /> -->
  </div>
</template>

<script>
import List from "@/views/Demo/List.vue";
import Avatar from "@/components/Avatar";
import Icon from "@/components/Icon";
import Pager from "@/components/Pager";
import Empty from "@/components/Empty";
import ImageLoader from "@/components/ImageLoader";
import SiteAside from "@/components/SiteAside";
import Layout from "@/components/Layout";
import Parent from "@/Demo/Parent.vue";
import RefDom from "@/Demo/RefDom.vue";
import WatchImmediate from "@/Demo/WatchImmediate.vue";
import Loading from "@/components/Loading";
import ToTop from '@/components/ToTop';

export default {
  name: "App",
  components: {
    Avatar,
    Icon,
    Pager,
    Empty,
    ImageLoader,
    SiteAside,
    Layout,
    Parent,
    RefDom,
    WatchImmediate,
    Loading,
    List,
    ToTop
  },
  data() {
    return {
      total: 201,
      current: 3,
      list: [
        {
          name: "视频1",
          audio: "https://www.runoob.com/try/demo_source/horse.mp3",
        },
        {
          name: "视频2",
          audio:
            "http://em.sycdn.kuwo.cn/0a2d5790ae5f4be32965706f452096f0/62694d89/resource/n3/30/66/2205407643.mp3",
        },
        {
          name: "视频3",
          audio:
            "http://www.170mv.com/kw/antiserver.kuwo.cn/anti.s?rid=MUSIC_140162434&response=res&format=mp3|aac&type=convert_url&br=128kmp3&agent=iPhone&callback=getlink&jpcallback=getlink.mp3",
        },
        {
          name: "视频4",
          audio: "https://www.runoob.com/try/demo_source/horse.mp3",
        },
        {
          name: "视频5",
          audio: "https://www.runoob.com/try/demo_source/horse.mp3",
        },
        {
          name: "视频6",
          audio: "https://www.runoob.com/try/demo_source/horse.mp3",
        },
        {
          name: "视频7",
          audio: "https://www.runoob.com/try/demo_source/horse.mp3",
        },
        {
          name: "视频8",
          audio: "https://www.runoob.com/try/demo_source/horse.mp3",
        },
        {
          name: "视频9",
          audio: "https://www.runoob.com/try/demo_source/horse.mp3",
        },
        {
          name: "视频10",
          audio: "https://www.runoob.com/try/demo_source/horse.mp3",
        },
      ],
    };
  },
  methods: {
    pageChange(p) {
      this.current = p;
    },
  },
};
</script>

<style lang="less" scoped>
.app-container {
  .self-fill(fixed);

  .aside {
    width: 250px;
    height: 100%;
  }

  // .router-view {
  //   height: 100%;
  // }
}
</style>