<template>
  <div>
    <el-row :gutter="20" v-for="(page, index) of pages" :key="index">
      <el-col :span="8" v-for="item of page" :key="item.id">
        <div class="grid-content bg-purple">
          <el-skeleton style="width: auto" :loading="loading" animated>
            <template slot="template">
              <el-skeleton-item variant="image" />
              <div style="padding: 14px">
                <el-image
                  :src="`https://bitqian-website.oss-cn-hangzhou.aliyuncs.com/lel-ft-video/14.png`"
                />
              </div>
            </template>
            <template>
              <el-card :body-style="{ padding: '0px', marginBottom: '1px' }">
                <nuxt-link :to="`/video/detail/${item.id}`">
                  <div
                    :id="item.id"
                    class="parentDiv"
                    @mousemove="mouseMove($event, `info-${item.id}`, item.id)"
                    @mouseleave="leave($event, `info-${item.id}`)"
                  >
                    <el-image
                      :src="item.coverUrl"
                      class="image parent"
                      style="width: 100%; height: 280px"
                    >
                      <!-- 封面无法显示 -->
                      <div slot="error" class="image-slot">
                        <el-image
                          style="width: 100%; height: 280px"
                          src="https://bitqian-website.oss-cn-hangzhou.aliyuncs.com/lel-ft-video/14.png"
                        />
                      </div>
                    </el-image>
                  </div>
                </nuxt-link>

                <!-- 悬浮框 -->
                <div
                  class="infoDiv"
                  :id="`info-${item.id}`"
                  style="display: none"
                >
                  <span class="std-font"></span>{{ item.episodeSts }}

                  <label class="std-font">{{ item.ftName }}</label>
                </div>

                <div style="padding: 14px">
                  <span style="color: #999; font-size: 20px">
                    {{ item.ftName }}
                  </span>
                  <div class="bottom card-header">
                    <span class="std-font">
                      {{ item.year === "0" ? "未知年份" : item.year }}
                    </span>
                    <span class="std-font">{{ item.category }}</span>
                    <span class="std-font">{{ item.area }}</span>
                  </div>
                </div>
              </el-card>
            </template>
          </el-skeleton>
        </div>
      </el-col>
    </el-row>

    <div class="block">
      <el-pagination
        layout="prev, pager, next"
        @current-change="currentChange"
        :page-size="queryParams.limit"
        :total="dataList.totalCount"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      showInfoFlg: true,
      loading: true,
      queryParams: {
        page: 1,
        limit: 12,
      },
      dataList: {
        totalCount: 1000,
        pageSize: 10,
        totalPage: 106,
        currPage: 1,
        list: [
          {
            id: null,
            ftName: null,
            seasons: null,
            coverUrl: null,
            dtlUrl: null,
            shortDtlUrl: null,
            year: null,
            category: null,
            area: null,
            episodeSts: null,
            episodes: -1,
            createTime: null,
            updateTime: null,
          },
        ],
      },
    };
  },
  /**
  async asyncData({ $api }) {
    let resp = {};
    try {
      resp = await $api
        .get("/v1/ftFo/l", { params: { page: 1, limit: 12 } })
        .then((resp) => {
          // 获取axios中的data
          return resp.data;
        })
        .then((resp) => {
          // 获取分页信息
          return { dataList: resp.data };
        });
    } catch (error) {
      console.log("async data error...", error);
    }

    return resp;
  },   
   */
  computed: {
    pages() {
      const pages = [];
      this.dataList.list.forEach((item, index) => {
        const page = Math.floor(index / 3);
        if (!pages[page]) {
          pages[page] = [];
        }
        pages[page].push(item);
      });
      return pages;
    },
  },
  created() {
    this.getDataList();
  },
  methods: {
    leave(e, id) {
      if (this.showInfoFlg) {
        let showDiv = document.getElementById(id);
        showDiv.style.display = "none";
        this.showInfoFlg = false;
      }
    },
    mouseMove(e, id, imgId) {
      let showDiv = document.getElementById(id);
      showDiv.style.display = "display";
      showDiv.style.top = showDiv.style.top + 225 + "px";
      if (imgId) {
        let parent = document.getElementById(imgId);
        showDiv.style.width = parent.clientWidth - 1;
      }
      showDiv.style.display = "block";
      this.showInfoFlg = true;
    },
    getDataList() {
      this.$api
        .get("/v1/view/ftFo/l", { params: this.queryParams })
        .then((resp) => resp.data)
        .then((resp) => {
          this.dataList = resp.data;
        })
        .catch((e) => console.log("sth error... ", e));
      setTimeout(() => {
        this.loading = false;
      }, 2000);
    },
    currentChange(page) {
      this.queryParams.page = page;
      this.getDataList();
    },
  },
};
</script>

<style scoped>
.std-font {
  color: #333;
}

.parentDiv {
  position: relative;
}

.infoDiv {
  line-height: 60px;
  background-color: #f9fafc;
  border: 1px solid #f9fafc;
  width: 200px;
  position: absolute;
  animation: action_translateY 1s;
  opacity: 0.9;
}

@keyframes action_translateY {
  0% {
    transform: translateY(50px);
    opacity: 0;
  }
  100% {
    transform: translateY(0px);
    opacity: 1;
  }
}

.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}

/* 
.bg-purple {
  background: #d3dce6;
}
*/
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 300px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>