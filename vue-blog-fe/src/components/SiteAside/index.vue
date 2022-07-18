<template>
  <div class="site-aside-container">
    <template v-if="data">
      <Avatar :url="data.avatar" />
      <h1 class="title">{{ data.siteTitle }}</h1>
    </template>
    <Menu />
    <Contact v-if="data" />
    <p class="footer" v-if="data">
      {{ data.icp }}
    </p>
  </div>
</template>

<script>
import Avatar from "@/components/Avatar";
import Contact from "./Contact";
import Menu from "./Menu";
import { mapState } from "vuex";

export default {
  name: "SiteAside",
  components: {
    Avatar,
    Menu,
    Contact,
  },
  computed: mapState("setting", ["data"]),
};
</script>

<style lang='less' scoped>
.site-aside-container {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: @dark;
  padding: 20px 0;
  box-sizing: border-box;
  .avatar-container {
    margin: 0 auto;
  }
  .title {
    font-size: 1.2em;
    text-align: center;
    margin-top: 10px;
    color: #fff;
  }
  .footer {
    text-align: center;
    font-size: 12px;
  }
}
</style>