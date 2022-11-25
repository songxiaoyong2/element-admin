<template>
  <div style="padding: 20px">
    <el-container>
      <el-main>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column
            label="序号"
            width="60"
            type="index"
            :index="index => index + page.pageSize * (page.pageNum - 1) + 1"
          >
          </el-table-column>
          <el-table-column prop="orderId" label="订单编号" width="80">
            <template slot-scope="scope">
              <el-tag>{{ scope.row.orderId }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="userId" label="用户编号" width="100">
            <template slot-scope="scope">
              <el-tag>{{ scope.row.userId }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="orderNumber" label="订单号" width="177">
          </el-table-column>
          <el-table-column prop="orderPrice" label="订单价格" width="100">
            <template slot-scope="scope">
              <el-tag type="danger">{{ "￥" + scope.row.orderPrice }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="payStatus" label="订单状态" width="120">
            <template slot-scope="scope">
              <el-tag :type="scope.row.payStatus == '1' ? 'success' : 'danger'">
                <i
                  class="el-icon-success"
                  v-show="scope.row.payStatus === '1'"
                ></i>
                <i
                  class="el-icon-error"
                  v-show="scope.row.payStatus === '0'"
                ></i>
                {{ scope.row.payStatus == "1" ? "已付款" : "未付款" }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column prop="isSend" label="发货状态" width="120">
          </el-table-column>
          <el-table-column label="发票信息" width="140">
            <template slot-scope="scope">
              <el-popover placement="right" trigger="click">
                <el-descriptions
                  title="发票信息"
                  style="width: 250px"
                  direction="horizontal"
                  :column="1"
                >
                  <el-descriptions-item label="发票类型">{{
                    scope.row.orderFapiaoTitle
                  }}</el-descriptions-item>
                  <el-descriptions-item label="所属公司">{{
                    scope.row.orderFapiaoCompany
                      ? scope.row.orderFapiaoCompany
                      : "无"
                  }}</el-descriptions-item>
                  <el-descriptions-item label="发票内容">{{
                    scope.row.orderFapiaoContent
                  }}</el-descriptions-item>
                </el-descriptions>
                <el-button size="mini" slot="reference">查看</el-button>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间">
            <template slot-scope="scope">
              {{
                scope.row.createTime
                  .replace("T0", " ")
                  .replace(".000+00:00", "")
              }}
            </template>
          </el-table-column>
        </el-table>
        <foot
          :page="page"
          :count="count"
          @changeSize="changeSize"
          @changeNum="changeNum"
        ></foot>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { getOrderListApi } from "@/api";
import foot from "../../components/footer.vue";

export default {
  components: { foot },
  data() {
    return {
      page: {
        pageNum: 1,
        pageSize: 10,
      },
      tableData: [],
      count: 0,
    };
  },
  async mounted() {
    const { data } = await getOrderListApi(this.page);
    this.tableData = data.data;
    this.count = data.count;
  },
  methods: {
    changeSize(val) {
      this.pageSize = val;
    },
    changeNum(val) {
      this.pageNum = val;
    },
  },
  watch: {
    page: {
      deep: true,
      immediate: true,
      async handler() {
        const { data } = await getOrderListApi(this.page);
        this.tableData = data.data;
        this.count = data.count;
      },
    },
  },
};
</script>

<style scoped>
.el-table /deep/.cell {
  text-align: center;
}
.el-card__body,
.el-main {
  padding: 0px;
}
</style>
