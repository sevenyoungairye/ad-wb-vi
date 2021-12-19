import Vue from "vue";
import VueDPlayer from "vue-dplayer";
Vue.use(VueDPlayer);

// 加载m3u8文件
window.Hls = require("hls.js");