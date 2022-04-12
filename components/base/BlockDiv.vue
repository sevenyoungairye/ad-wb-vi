<template>
  <div>
    <div :style="{ height: blockHeight }"></div>
  </div>
</template>

<script>
export default {
  props: {
    blockHeight: {
      type: String,
      default: "70vh",
    },
    bgImgArr: {
      type: Array,
      default: function () {
        return [
          "https://w.wallhaven.cc/full/z8/wallhaven-z8j9ko.jpg",
          "https://w.wallhaven.cc/full/q2/wallhaven-q2vwx7.jpg",
        ];
      },
    },
    id: {
      type: String,
      default: "",
    },
  },
  watch: {
    bgImgArr: {
      handler: function (val) {
        if (val) {
          this.initBg();
        }
      },
      immediate: true,
    },
  },
  created() {},
  methods: {
    initBg() {
      if (this.id) {
        this.$nextTick(() => {
          let div = document.getElementById(this.id);
          if (div) {
            div.style.backgroundImage = `url(${this.bgImgArr[0]})`;
            div.style.backgroundRepeat = "no-repeat";
            div.style.backgroundPosition = "center";
            div.style.backgroundSize = "cover";
            div.style.opacity = 1;
          }
        });
      }
    },
  },
};
</script>

<style>
</style>