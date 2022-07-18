<template>
  <div>
    <p>
      <label for="name">姓名</label>
      <input type="text" id="name" v-model="form.name" />
    </p>
    <p>
      <label for="age">年龄</label>
      <input type="text" id="age" v-model="form.age" />
    </p>
    <p>
      <label for="sex">性别</label>
      <input type="text" id="sex" v-model="form.sex" />
    </p>
    {{form}}
  </div>
</template>

<script>
export default {
  props: {
    form: {
      type: Object,
      required: true,
    },
  },
  created() {
    //   this.form = {}
  }
};
</script>

<style>
</style>