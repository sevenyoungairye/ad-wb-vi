<template>
  <div>
    <h3 v-for="(item, index) of dataList" :key="index">
      {{ item }}
    </h3>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataList: ["页面开发中...", "敬请期待..."],
    };
  },
};
</script>

<style>
</style>