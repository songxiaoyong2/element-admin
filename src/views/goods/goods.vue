<template>
  <div style="padding: 20px">
    <el-container style="transition: all 0.3s">
      <el-header>
        <div style="margin-top: 15px">
          <el-input
            placeholder="请输入内容"
            v-model="page.goodsName"
            class="input-with-select"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              style="color: #00fefe"
              @click="search"
            ></el-button>
          </el-input></div
      ></el-header>
      <el-main>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column
            label="序号"
            type="index"
            :index="
              index => index + this.page.pageSize * (this.page.pageNum - 1) + 1
            "
          >
          </el-table-column>
          <el-table-column prop="goodsId" label="商品编号" width="100">
            <template slot-scope="scope">
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.goodsId }}</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="商品名称" prop="goodsName"> </el-table-column>
          <el-table-column label="商品价格" prop="goodsPrice" width="100">
            <template slot-scope="scope">
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium" type="danger">{{
                  "￥" + scope.row.goodsPrice
                }}</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="商品库存" prop="goodsNumber" width="100">
          </el-table-column>
          <el-table-column label="商品介绍" width="100">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="info" size="mini"
                >查看</el-button
              >
            </template>
          </el-table-column>
        </el-table></el-main
      >
      <foot
        :count="count"
        :page="page"
        @changeSize="changeSize"
        @changeNum="changeNum"
      ></foot>
    </el-container>
  </div>
</template>

<script>
import { getGoodsApi } from "@/api";
import foot from "../../components/footer.vue";
export default {
  components: { foot },
  data() {
    return {
      page: { pageNum: 1, pageSize: 10, goodsName: "" },
      tableData: [],
      count: 0,
    };
  },
  methods: {
    // 封装接口
    async getGoodsList() {
      const { data } = await getGoodsApi(this.page);
      this.tableData = data.data;
      this.count = data.count;
    },

    changeSize(size) {
      this.page.pageSize = size;
      this.getGoodsList();
    },
    changeNum(num) {
      this.page.pageNum = num;
      this.getGoodsList();
    },
    // 点击查看
    handleClick(row) {
      this.$alert(row.goodsIntroduce, "商品详情", {
        dangerouslyUseHTMLString: true,
        customClass: "custom-class",
        closeOnClickModal: true,
      });
    },
    search() {
      this.getGoodsList();
      this.page.goodsName = "";
    },
  },
  mounted() {
    this.getGoodsList();
  },
};
</script>

<style scoped>
/deep/.el-input-group__append {
  background-color: rgb(0, 149, 255);
}
.el-table /deep/.el-table__cell {
  text-align: center;
}
#app .el-message-box__wrapper ::v-deep.custom-class {
  height: 600px;
  overflow: scroll !important;
}
.el-table /deep/.el-table__cell:nth-child(3) {
  text-align: left;
}
.el-table /deep/.has-gutter tr th {
  text-align: center !important;
}
</style>
<style>
.el-message-box__wrapper {
  overflow-y: scroll;
}
</style>
