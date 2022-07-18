<template>
  <div class="async-component-container">
    <AsyncCom />
  </div>
</template>

<script>
import LoadingComponent from "./LoadingComponent.vue";
import ErrorComponent from "./ErrorComponent.vue";
const delay = (d) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, d);
  });
};
const AsyncCom = async () => {
  const comp = await import("./AsyncComp.vue");
  await delay(3000);
  return comp
};
export default {
  components: {
    AsyncCom,
  },
};
</script>

<style scoped>
.async-component-container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
}
</style>