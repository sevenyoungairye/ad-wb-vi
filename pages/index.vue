<template>
  <div id="id-index">
    <div class="le-index-word">
      <span style="margin-left: 1vw">hello, welcom to my simple sites!</span>
    </div>

    <block-div :blockHeight="`100vh`" :id="`id-index`" />
  </div>
</template>

<script>
import BlockDiv from "@/components/base/BlockDiv.vue";

import req from "@/api/req.js";

export default {
  head() {
    return {
      title: "首页",
    };
  },
  components: {
    BlockDiv,
  },
  data() {
    return {
      allData: {},
    };
  },
  created() {
    req.getCaptchaImg().then((resp) => {
      this.allData = resp;
    });
  },
  methods: {
    toAbout: () => {
      window.location.href = "/about";
    },
  },
};
</script>

<style scoped>
.le-index-word {
  font-size: 1.5em;
  font-family: Cursive;
  color: #999;
  background-color: white;
  opacity: 0.6;
  width: 100%;
  height: calc(5vh);
}
body {
  margin: 0;
}
</style>
