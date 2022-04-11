<!-- a temp parse m3u8 page -->
<template>
  <div>
    <!-- 
      https://aidi.tv/play/1931-1-1.html
       -->
    <div>
      <el-collapse accordion>
        <el-collapse-item title="播放操作">
          <div>
            <el-input
              v-show="showInput"
              placeholder="输入要播放的链接"
              v-model="playUrl"
              clearable
            />
            <el-button @click="doPlay">{{
              showInput ? "播放" : "搜索"
            }}</el-button>
          </div>
        </el-collapse-item>

        <el-collapse-item title="小编推荐">
          <el-descriptions
            class="margin-top"
            title="播放链接推荐~"
            :column="1"
            size="medium"
          >
            <el-descriptions-item
              v-for="(item, index) in dataList"
              :key="index"
              :label="item.filmDesc"
            >
              <el-tooltip
                v-for="(url, j) in item.m3u8List"
                :key="j"
                content="点击复制"
                placement="bottom"
                effect="light"
                class="le-tool-tip"
              >
                <el-tag @click="copyText($event)">
                  {{ url }}
                </el-tag>
              </el-tooltip>
            </el-descriptions-item>
          </el-descriptions>

          <div style="text-align: center">
            <el-tooltip :content="loadMoreTip">
              <el-button class="load-more-btn" @click="loadMore" type="text">
                ...
              </el-button>
            </el-tooltip>
          </div>
        </el-collapse-item>

        <el-collapse-item title="tips">
          <el-row>
            <el-col>
              有些资源存在跨域问题, 播放不了, 请使用Microsoft Edge +
              插件配合食用。
            </el-col>
          </el-row>

          <el-row>
            <el-col>
              <el-tag>
                <el-tooltip
                  content="点击跳转"
                  placement="bottom"
                  effect="light"
                >
                  <el-link
                    :underline="false"
                    target="_blank"
                    href="https://microsoftedge.microsoft.com/addons/detail/allow-cors-accesscontro/bhjepjpgngghppolkjdhckmnfphffdag?hl=zh-CN"
                  >
                    去下载插件
                  </el-link>
                </el-tooltip>
              </el-tag>
            </el-col>
          </el-row>
        </el-collapse-item>
      </el-collapse>
    </div>

    <BasePlayer v-show="showPlayer" v-bind:playObj="playObj" />
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { doCopy, arrayDiff } from "@/utils/common/tool.js";

export default {
  head() {
    return {
      title: "parse api",
    };
  },
  components: {},
  props: {},
  data() {
    //这里存放数据
    return {
      loadMoreTip: "点击加载更多",
      totalPage: 0,
      dataList: [],
      queryParams: {
        params: {
          page: 1,
          limit: 1,
        },
      },
      playUrl: undefined,
      showInput: true,
      showPlayer: false,
      playObj: {
        videoId: null,
        playUrl: null,
        mode: "auto",
        title: "api parse page",
      },
    };
  },
  computed: {},
  watch: {
    "queryParams.params.page": {
      handler(val) {
        if (val === this.totalPage) {
          this.loadMoreTip = "没有更多内容了...";
        }
      },
      immediate: true,
    },
  },
  methods: {
    loadMore() {
      if (this.queryParams.params.page < this.totalPage) {
        ++this.queryParams.params.page;
        let _dataList = [...this.dataList];
        this.getData().then((dataList) => {
          dataList.forEach((item) => {
            _dataList.push(item);
          });
          this.dataList = arrayDiff(_dataList, "filmDesc");
        });
      }
    },
    getData() {
      return this.$api
        .get("/v1/view/tool/parse/l", this.queryParams)
        .then((resp) => resp.data)
        .then((resp) => {
          if (resp.success) {
            this.totalPage = resp.data.totalPage;
            this.dataList = resp.data.list;
            return this.dataList;
          }
          return new Array();
        })
        .catch((e) => console.log(e));
    },
    copyText(e) {
      doCopy(e.target);
    },
    doPlay() {
      this.showInput = !this.showInput;
      if (this.playUrl && this.playUrl.trim() !== "") {
        this.showPlayer = true;
        this.$nextTick(() => {
          this.playObj.playUrl = this.playUrl;
        });
      } else {
        this.showPlayer = false;
      }
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getData();
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
};
</script>
<style scoped>
.le-tool-tip {
  margin-left: 3px;
  margin-right: 3px;
  margin-top: 1px;
  margin-bottom: 1px;
}

.load-more-btn {
  font-weight: bolder;
  font-size: 30px;
  color: #c0c4cc;
}
</style>