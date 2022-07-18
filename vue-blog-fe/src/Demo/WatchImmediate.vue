<template>
  <div>
    <p>姓：{{ firstName }}</p>
    <p>名：{{ lastName }}</p>
    <p>全名：{{ fullName }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      firstName: "张",
      lastName: "三",
    };
  },
  computed: {
    fullName() {
      return this.firstName + " " + this.lastName;
    },
  },
};
</script>

<style>
</style>