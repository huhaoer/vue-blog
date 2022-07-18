<template>
  <div class="menu-container">
    <RouterLink  v-for="menu in menuList" :key="menu.name" :to="{name: menu.name}" :exact="menu.exact">
      <div class="icon">
        <Icon :type="menu.icon" />
      </div>
      <span>{{ menu.title }}</span>
    </RouterLink>
  </div>
</template>

<script>
import Icon from "@/components/Icon";
export default {
  name: "Menu",
  components: {
    Icon,
  },
  data() {
    return {
      menuList: [
        {
          name: 'Home',
          link: "/",
          title: "首页",
          icon: "home",
          exact: true // 其余路由要求严格匹配，只有当前路由和导航路由相等时包含router-link-active和router-link-exact-active
        },
        {
          name: 'Blog',
          link: "/blog",
          title: "文章",
          icon: "blog",
          exact: false , // 文章路由要求非严格匹配，可匹配/blog以及/blog/xx/xx的路由，类名样式为 router-link-active
        },
        {
          name: 'About',
          link: "/about",
          title: "关于我",
          icon: "about",
          exact: true
        },
        {
          name: 'Project',
          link: "/project",
          title: "项目&效果",
          icon: "code",
          exact: true
        },
        {
          name: 'Message',
          link: "message",
          title: "留言板",
          icon: "chat",
          exact: true
        },
      ],
    };
  },
};
</script>

<style lang='less' scoped>
.menu-container {
  color: @gray;
  margin: 24px 0;
  a {
    padding: 0 50px;
    display: block;
    display: flex;
    align-items: center;
    height: 45px;
    .icon {
      width: 24px;
    }

    &:hover {
      color: #fff;
    }
    // 当前匹配的路由样式
    &.router-link-active {
      // darken函数，加深当前颜色
      background-color: darken(@words, 3%);
    }
  }
}
</style>