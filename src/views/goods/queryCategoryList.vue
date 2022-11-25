<template>
  <div style="padding: 20px">
    <div class="block">
      选择分类：
      <el-cascader
        placeholder="试试搜索：海信"
        :options="options"
        filterable
        @change="ch"
        :clearable="true"
      ></el-cascader>
    </div>
    <el-divider></el-divider>
    <el-collapse
      v-model="activeNames"
      @change="handleChange"
      v-show="dataList.length"
    >
      <el-collapse-item
        v-for="(item, index) in dataList"
        :key="index"
        :title="item.attrName"
        :name="index"
      >
        <div>
          <el-tag type="item.type" effect="plain"> {{ item.attrVals }} </el-tag>
        </div>
      </el-collapse-item>
    </el-collapse>
    <el-alert title="暂无数据" type="warning" v-show="count === 0"> </el-alert>
  </div>
</template>

<script>
import { queryCategoryListApi, attrListApi } from "@/api";
export default {
  data() {
    return {
      options: [],
      activeNames: [],
      dataList: [],
      count: null,
    };
  },
  async mounted() {
    const { data } = await queryCategoryListApi();
    const a = JSON.stringify(data.data)
      .replace(/catName/g, "label")
      .replace(/catId/g, "value");
    this.options = JSON.parse(a);
    console.log(this.options);
  },
  methods: {
    async ch(val) {
      this.activeNames = [];
      if (val.length !== 0) {
        const { data } = await attrListApi(val[val.length - 1]);
        this.dataList = data.data;
        this.count = data.count;
      } else {
        return;
      }
    },
    handleChange(val) {
      console.log(val);
    },
  },
  // watch: {
  //   dataList: {
  //     deep: true,
  //     immediate: true,
  //     handler() {},
  //   },
  // },
};
</script>

<style scope>
.el-divider {
  background-color: #6d91e5;
  position: relative;
}
.el-collapse {
  background-color: #fff;
  padding: 20px;
}
</style>
