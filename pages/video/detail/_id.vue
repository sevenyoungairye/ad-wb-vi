<template>
  <div>
    <el-container>
      <el-aside style="width: 75%">
        <BasePlayer v-bind:playObj="playObj" />
      </el-aside>

      <el-main>
        <!-- keep the scrollbar height as the screen height of 80%; -->
        <div style="height: calc(80vh)">
          <el-scrollbar style="height: 100%">
            <div style="width: auto; height: auto">
              <el-row
                :gutter="24"
                v-for="(data, index) in episodeList"
                :key="index"
              >
                <el-col :span="8" v-for="(every, j) in data" :key="j">
                  <el-button
                    class="episode-text episode-all"
                    :style="index === 0 && j === 0 ? 'color: #409eff;' : ''"
                    @click="playCurrent(every.id)"
                    type="text"
                  >
                    <span class="grid-content bg-purple-light">
                      {{ every.episodeSerialNo }}
                    </span>
                  </el-button>
                </el-col>
              </el-row>
            </div>
          </el-scrollbar>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      playId: "", // 资源id
      dataList: [
        {
          id: null,
          ftId: null,
          episodeSerialNo: null,
          episodePlayDesc: null,
        },
      ],
    };
  },
  computed: {
    episodeList() {
      /*
        [
          [1, 2, 3], 
          [4, 5, 6],
          [7, 8, 9]
        ]
      */
      let arr = [];
      this.dataList.forEach((item, index) => {
        let outIndex = Math.floor(index / 3); // 每行3个
        if (!arr[outIndex]) {
          arr[outIndex] = [];
        }
        arr[outIndex].push(item);
      });
      return arr;
    },
  },
  // query和params的区别, 前者是url后面？后的参数, params可以是restful参数
  async asyncData({ $api, params }) {
    let resp = [];
    resp = await $api
      .get(`/v1/view/ftDtl/${params.id}`)
      .then((resp) => {
        if (resp.status === 200) {
          return resp.data;
        }
        return {
          data: [{}],
        };
      })
      .then((resp) => {
        return {
          dataList: resp.data,
          playObj: {
            videoId: resp.data[0].id || null,
            playUrl: null,
            mode: "hls",
            title: resp.data[0].episodePlayDesc,
          },
        };
      });

    return resp;
  },
  created() {},
  methods: {
    playCurrent(id) {
      let changeIndex = null;
      this.dataList.forEach((item, index) => {
        if (id === item.id) {
          changeIndex = index;
        }
      });

      let all = document.getElementsByClassName("episode-all");
      for (let btn of all) {
        btn.style.color = "#c0c4cc";
      }
      all[changeIndex].style.color = "#409eff";

      this.$nextTick(() => {
        this.playObj.videoId = id; // 根据剧集id查询
        this.dataList
          .filter((item) => item.id === id)
          .every((item) => {
            this.playObj.title = item.episodePlayDesc;
          });
      });
    },
    init() {
      if (this.dataList && this.dataList.length > 0) {
        this.playObj.videoId = this.dataList[0].id;
      } else {
        this.playObj.videoId = "";
      }
    },
  },
};
</script>

<style scoped>
.episode-text {
  color: #c0c4cc;
}

.el-col {
  border-radius: 4px;
}

.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  line-height: 30px;
  font-size: 10px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  /* line-height: 200px; */
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  /* line-height: 160px; */
}

/* 滚动条 */
.el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>