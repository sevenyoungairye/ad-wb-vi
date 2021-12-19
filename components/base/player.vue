<template>
  <div class="palyer-pg">
    <client-only placeholder="Loading...">
      <d-player :options="options" />
    </client-only>
  </div>
</template>

<script>
export default {
  name: "Player",
  props: {
    videoUrl: {
      vlaue: "",
      type: String,
    },
  },
  data() {
    return {
      options: {
        // container: null, //播放器容器
        mutex: false, //  防止同时播放多个用户，在该用户开始播放时暂停其他用户
        theme: "#b7daff", // 风格颜色，例如播放条，音量条的颜色
        loop: false, // 是否自动循环
        lang: "zh-cn", // 语言，'en', 'zh-cn', 'zh-tw'
        screenshot: true, // 是否允许截图（按钮），点击可以自动将截图下载到本地
        hotkey: true, // 是否支持热键，调节音量，播放，暂停等
        preload: "auto", // 自动预加载
        volume: 0.7, // 初始化音量
        playbackSpeed: [0.5, 0.75, 1, 1.25, 1.5, 2, 3], //可选的播放速度，可自定义
        logo: "",
        video: {
          url: this.vidoeUrl, // 播放视频的路径
          quality: [
            // 设置多个质量的视频
            {
              name: "超清",
              url: this.videoUrl,
              type: "hls", // 'auto', 'hls', 'flv', 'dash', 'webtorrent', 'normal' 或 其他自定义类型
            },
          ],
          defaultQuality: 0, // 默认是高清
        },
        contextmenu: [
          //  自定义上下文菜单
          // 右键菜单
          {
            text: "作者Github",
            link: "https://github.com/sevenyoungairye",
          },
          {
            text: "查看播放器",
            click: (player) => {
              console.log(player);
            },
          },
        ],
        highlight: [
          //进度条上的自定义时间标记
          // 进度条时间点高亮
          {
            text: "10M",
            time: 6,
          },
          {
            text: "20M",
            time: 12,
          },
        ],
      },
    };
  },
  mounted() {
    require("vue-dplayer");

    console.log("...", this.videoUrl);
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