<template>
  <div class="palyer-pg">
    <div ref="player"></div>
  </div>
</template>

<script>
export default {
  name: "Player",
  props: {
    videoId: {
      vlaue: null,
      type: Number,
    },
  },
  head() {
    return {
      title: "lelのplayer",
      // link: [
      //   {
      //     rel: "stylesheet",
      //     href:
      //       "https://cdn.bootcdn.net/ajax/libs/dplayer/1.5.0/DPlayer.min.css",
      //   },
      // ],
      // script: [
      //   {
      //     src: "https://cdn.bootcdn.net/ajax/libs/dplayer/1.5.0/DPlayer.min.js",
      //   },
      // ],
      script: [
        {
          // aes decrpt
          src:
            "https://cdn.bootcdn.net/ajax/libs/crypto-js/3.1.9/crypto-js.min.js",
        },
      ],
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
    videoId(val) {
      this.videoId = val;
      this.playVideo();
    },
  },
  computed: {},
  mounted() {
    if (process.browser) {
      this.base64Key = CryptoJS.enc.Base64.parse("bGVsOTk5aXNBZG9yYWJsZQ==");
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
  created() {},
  methods: {
    playVideo() {
      this.$nextTick(() => {
        this.init().then((b) => {
          this.options.video.url = this.videoUrl;
          if (b) {
            new this.dp(this.options);
          }
        });
      });
    },
    decrypt(secretData) {
      let decryptedData = CryptoJS.AES.decrypt(secretData, this.base64Key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
      });

      this.videoUrl = decryptedData.toString(CryptoJS.enc.Utf8);
    },
    async init() {
      let videoId = this.videoId;
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
  width: 100%;
  height: 100%;
  margin: 0 auto;
  text-align: center;
}
</style>