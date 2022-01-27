<template>
  <footer>
    <p>Copyright {{ bottomDate }} {{ title }}</p>
  </footer>
</template>
<script>
export default {
  data() {
    return {
      bottomDate: new Date().getFullYear(),
      title: "lel©",
    };
  },
};
</script>
<style scoped>
footer {
  background: #545c64;
  padding: 6px;
}
p {
  color: lightgreen;
  text-align: center;
}
</style>