<!-- 检索页面 -->
<template>
  <div>
    <el-form>
      <el-row v-show="showSearchInput" :gutter="24">
        <el-col>
          <el-form-item>
            <div class="search-head">
              <el-input
                style="width: calc(80%)"
                v-model="queryParams.keyword"
                clearable
              />
              <el-button round @click="loadKeyword">搜索</el-button>
            </div>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="24">
        <el-col>
          <div>
            <el-collapse @change="toggleFilter">
              <el-collapse-item title="筛选">
                <el-card class="box-card">
                  <div
                    v-for="(attrList, key) in attrData"
                    :key="key"
                    class="text item"
                  >
                    <div class="left-val-div">
                      <label>{{ key }}: </label>
                    </div>
                    <div class="right-tag-div">
                      <el-tag
                        @click="searchFilter(ele.extValue, key)"
                        :id="ele.id"
                        class="lel-el-tag"
                        v-for="(ele, index) in attrList"
                        :key="index"
                        effect="plain"
                        type="info"
                      >
                        {{ ele.attrValue }}
                      </el-tag>
                    </div>
                  </div>
                </el-card>
              </el-collapse-item>
            </el-collapse>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="24" v-for="(data, i) in dataList" :key="i">
        <el-col :span="8" v-for="(item, j) in data" :key="j">
          <el-card
            class="lel-cover-div"
            :body-style="{ padding: '0px', marginBottom: '1px' }"
          >
            <div>
              <nuxt-link :to="`/video/detail/${item.id}`">
                <el-image class="lel-cover-img" :src="item.coverUrl">
                  <div slot="error" class="image-slot">
                    <el-image
                      class="lel-cover-img"
                      src="https://bitqian-website.oss-cn-hangzhou.aliyuncs.com/lel-ft-video/14.png"
                    />
                  </div>
                </el-image>
              </nuxt-link>
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
        </el-col>
      </el-row>
    </el-form>

    <div v-if="dataList !== null && dataList.length > 0" class="block">
      <el-pagination
        layout="prev, pager, next"
        @current-change="currentChange"
        :current-page="queryParams.page"
        :page-size="queryParams.limit"
        :total="data.totalCount"
      >
      </el-pagination>
    </div>
    <div style="text-align: center; color: #999" v-else>
      <h3>
        <label>什么也没找到哟</label>
      </h3>
    </div>

    <block-div
      v-if="showSearchInput && data.totalCount <= 0"
      blockHeight="66vh"
    />
    <block-div
      v-if="!showSearchInput && data.totalCount <= 0"
      blockHeight="43vh"
    />
  </div>
</template>

<script>
import BlockDiv from "@/components/base/BlockDiv.vue";

export default {
  head() {
    return {
      title: "搜索-lelのplayer",
    };
  },
  components: { BlockDiv },
  data() {
    return {
      checkTags: null,
      data: {
        totalCount: 0,
        list: [], // 获取到后台数据
      },
      showSearchInput: true,
      queryParams: {
        page: 1,
        limit: 6,
        keyword: null,
        ids: [], // 检索id
      },
    };
  },
  asyncData({ $api }) {
    return $api
      .get("/v1/view/search/s")
      .then((resp) => resp.data)
      .then((resp) => {
        if (resp.success) {
          return { attrData: resp.data };
        } else {
          return { attrData: {} };
        }
      })
      .catch((e) => console.log(e));
  },
  computed: {
    // 计算获取到的数据
    dataList() {
      let arr = [];
      this.data.list.forEach((item, index) => {
        let outIndex = Math.floor(index / 3);
        if (!arr[outIndex]) {
          arr[outIndex] = [];
        }
        arr[outIndex].push(item);
      });
      return arr;
    },
  },
  created() {
    let wd = this.$route.query.keyword;
    if (this.$route && wd) {
      this.queryParams.keyword = wd;
    }
    this.loadKeyword();
  },
  methods: {
    currentChange(page) {
      this.queryParams.page = page;
      if (this.showSearchInput) {
        this.loadKeyword();
      } else {
        this.loadFilter();
      }
    },
    loadSearchAttrs() {
      let data = this.attrData;
      if (data) {
        for (let key in data) {
          console.log(key, data[key]);
        }
      }
    },
    searchFilter(extValue, k) {
      this.queryParams.ids = [];
      let data = this.attrData;
      for (let key in data) {
        if (key === k) {
          // 点击变色
          let attrs = data[key];
          attrs.forEach((ele) => {
            let tag = document.getElementById(ele.id);

            if (ele.extValue === extValue) {
              tag.classList.add("lel-el-tag-style");
            } else {
              tag.classList.remove("lel-el-tag-style");
            }
          });
        }
      }

      // 获取检索条件
      this.checkTags = document.getElementsByClassName("lel-el-tag-style");
      let tags = this.checkTags;
      for (let item in tags) {
        if (Object.hasOwnProperty.call(tags, item)) {
          const element = tags[item];
          let checkId = element.getAttribute("id");
          let ids = this.queryParams.ids;
          if (!ids.includes(checkId)) {
            ids.push(checkId);
          }
        }
      }

      this.queryParams.page = 1;
      this.loadFilter();
    },
    loadFilter() {
      this.$api
        .post(`/v1/view/search`, this.queryParams)
        .then((resp) => resp.data)
        .then((resp) => {
          if (resp.success) {
            this.data = resp.data;
          }
        });
    },
    loadKeyword() {
      let keyword = this.queryParams.keyword;
      this.$router.push({
        query: { keyword },
      });

      if (keyword) {
        let params = { ...this.queryParams };
        params.keyword = undefined;
        params.key = keyword;
        this.$api
          .get(`v1/view/search/kw`, { params })
          .then((resp) => resp.data)
          .then((resp) => {
            if (resp.success) {
              this.data = resp.data;
            }
          })
          .catch((e) => {
            console.log("search err...", e);
          });
      }
    },
    toggleFilter() {
      this.queryParams.keyword = "";
      this.showSearchInput = !this.showSearchInput;

      if (this.showSearchInput) {
        // 根据名称检索
        this.queryParams.keyword = this.$route.query.keyword;
        this.queryParams.page = 1;
        this.queryParams.limit = 6;
        this.loadKeyword();
      }
    },
  },
};
</script>

<style>
.lel-cover-div {
  margin: 5px auto;
}

.lel-cover-img {
  width: 100%;
  height: 280px;
}

.lel-el-tag {
  margin-right: 10px;
  margin-top: 2px;
  width: auto;
  text-align: center;
}

.lel-el-tag-style {
  color: #67c23a !important;
  border-color: #67c23a !important;
}

.lel-el-tag:hover {
  color: #67c23a;
  border-color: #67c23a;
}

.left-val-div {
  width: 5%;
}

.right-tag-div {
  width: 95%;
  padding: 6px auto;
}

.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
  display: flex;
}

.box-card {
  width: calc(100%);
}

.el-collapse-item__header {
  font-size: 20px;
  color: #999;
}
.search-head {
  margin: 0 auto;
  display: block;
  width: calc(50%);
}
</style>