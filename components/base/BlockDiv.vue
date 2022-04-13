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
          "https://w.wallhaven.cc/full/v9/wallhaven-v911ym.jpg",
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
      if (this.id && process.client) {
        this.$nextTick(() => {
          let div = document.getElementById(this.id);
          if (div) {
            div.style.backgroundImage = `url(${this.bgImgArr[0]})`;
            div.className = "le-block-div-bg";
          }
        });
      }
    },
  },
};
</script>

<style>
.le-block-div-bg {
  opacity: 1;
  width: 100%;
  height: 100%;
  min-width: 1000px;
  z-index: -10;
  zoom: 1;
  background-color: #fff;
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  background-position: center 0;
}
</style>