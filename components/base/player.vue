<template>
  <div>
    <div class="palyer-pg" ref="player"></div>
  </div>
</template>

<script>
let CryptoJS = require("crypto-js");
export default {
  name: "Player",
  props: {
    playObj: {
      value: { videoId: null, playUrl: "", mode: "", title: "" },
      type: Object,
    },
  },
  head() {
    return {
      title: this.playObj.title || "lelのplayer",
    };
  },
  data() {
    return {
      options: {
        base64Key: null,
        videoUrl: null,
        dp: null, // Dplayer对象
        video: {
          url: null,
          type: "hls",
        },
        autoplay: true,
        screenshot: true,
      },
    };
  },
  watch: {
    playObj: {
      handler() {
        this.playVideo();
        this.$nextTick(() => {
          this.$metaInfo.title = this.playObj.title;
        });
      },
      // immediate: true, // 对象改变, 就会被监听到
      deep: true, // 深度监听
    },
  },
  computed: {},
  mounted() {
    this.base64Key = CryptoJS.enc.Base64.parse("bGVsOTk5aXNBZG9yYWJsZQ==");
    if (process.browser) {
      // 容器对象
      this.options.container = this.$refs.player;
      this.dp = require("dplayer");
      try {
        this.playVideo();
      } catch (error) {
        console.log("error... ", error);
      }
    }
  },
  created() {
    // console.log("title...", this.$metaInfo);
  },
  methods: {
    playVideo() {
      if (this.playObj.videoId) {
        this.$nextTick(() => {
          this.init().then((b) => {
            this.options.video.url = this.videoUrl;
            if (b) {
              new this.dp(this.options);
            }
          });
        });
      }
      let playUrl = this.playObj.playUrl;
      if (playUrl) {
        this.$nextTick(() => {
          this.options.video.url = playUrl;
          new this.dp(this.options);
        });
      }
    },
    decrypt(secretData) {
      let decryptedData = CryptoJS.AES.decrypt(secretData, this.base64Key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
      });

      this.videoUrl = decryptedData.toString(CryptoJS.enc.Utf8);
    },
    async init() {
      let videoId = this.playObj.videoId;
      if (videoId) {
        return await this.$api
          .get(`/v1/view/ftDtl/key/${videoId}`)
          .then((resp) => {
            return resp.data;
          })
          .then((resp) => {
            if ("200" === resp.returnCode) {
              this.decrypt(resp.data);
              return true;
            }
            return false;
          });
      }
    },
  },
};
</script>

<style scoped>
.palyer-pg {
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  text-align: center;
}
</style>