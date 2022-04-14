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
      default: "0vh",
    },
    // 是否多个背景图
    isMultiImg: {
      type: Boolean,
      default: false,
    },
    bgImgOne: {
      type: String,
      default: "https://w.wallhaven.cc/full/v9/wallhaven-v911ym.jpg",
    },
    bgImgArr: {
      type: Array,
      default: function () {
        return [
          "https://w.wallhaven.cc/full/v9/wallhaven-v911ym.jpg",
          "https://w.wallhaven.cc/full/q2/wallhaven-q2vwx7.jpg",
          "https://w.wallhaven.cc/full/6o/wallhaven-6o7vq6.jpg",
        ];
      },
    },
    id: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      timer: null,
    };
  },
  watch: {
    bgImgOne: {
      handler: function (val) {
        if (val && !this.isMultiImg) {
          this.initBg(this.bgImgOne);
        }
      },
      immediate: true,
    },
    bgImgArr: {
      handler: function (val) {
        if (val && this.isMultiImg) {
          this.gradientBg();
        }
      },
      immediate: true,
    },
  },
  destroyed() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
  created() {},
  methods: {
    gradientBg() {
      let bgImgArr = this.bgImgArr;
      if (bgImgArr && bgImgArr.length > 0) {
        this.initBg(bgImgArr[0]);
      }

      let flgIndex = 0;
      this.timer = setInterval(() => {
        for (let i = 0; i < bgImgArr.length; i++) {
          if (flgIndex === bgImgArr.length) {
            flgIndex = 0;
          }
          if (i === flgIndex) {
            this.initBg(bgImgArr[flgIndex]);
            break;
          }
        }

        flgIndex++;
      }, 10000);
    },
    initBg(imgUrl) {
      if (this.id && process.client) {
        this.$nextTick(() => {
          let div = document.getElementById(this.id);
          if (div) {
            div.className = "le-block-div-bg";
            div.style.backgroundImage = `url(${imgUrl})`;
          }
        });
      }
    },
  },
};
</script>

<style>
.le-block-div-bg {
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

/** 移动端布局
   小于1000 px
*/
@media screen and (max-width: 1000px) {
  .le-block-div-bg {
    background-attachment: scroll;
  }
}
</style>