<template>
  <div>
    <Parent v-if="show" ref="parent" />
  </div>
</template>

<script>
import Parent from "./Parent.vue";
export default {
  components: {
    Parent,
  },
  data() {
    return {
      show: false,
    };
  },
  async mounted() {
    this.show = true;
    await this.$nextTick();
    console.log(this.$refs.parent);

    //   this.$nextTick(() => {
    //   console.log(this.$refs.parent.form);
    //   })
    // await this.$nextTick();
    // console.log(this.$refs.parent.form);
  },
  updated() {
    // console.log(this.$refs.parent.form);
  },
};
</script>

<style>
</style>