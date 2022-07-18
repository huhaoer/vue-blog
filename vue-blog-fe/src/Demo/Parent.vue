<template>
  <div>
    <h1>parent:</h1>
    <p>{{ form.name }}</p>
    <p>{{ form.age }}</p>
    <p>{{ form.sex }}</p>
    <h1>child:</h1>
    <!-- <Child :form="form" /> -->
  </div>
</template>

<script>
import Child from "./Child.vue";
export default {
  components: {
    Child,
  },
  data() {
    return {
      form: {
        name: "章三",
        age: 18,
        sex: "男",
      },
    };
  },
};
</script>

<style>
</style>