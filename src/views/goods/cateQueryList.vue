<template>
  <div>
    <el-container style="transition: all 0.3s">
      <el-main>
        <el-table
          :data="tableData"
          style="width: 100%"
          :default-sort="{ prop: 'catId', order: 'ascending' }"
        >
          <el-table-column
            label="序号"
            type="index"
            :index="
              index => index + this.page.pageSize * (this.page.pageNum - 1) + 1
            "
            width="80"
          >
          </el-table-column>
          <el-table-column label="分类编号" prop="catId" sortable width="415">
            <template slot-scope="scope">
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.catId }}</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="分类名称" prop="catName" width="415">
          </el-table-column>
          <el-table-column
            label="级别"
            prop="catLevel"
            width="415"
            :filters="arr"
            :filter-method="filterTag"
            filter-placement="bottom-end"
          >
            <template slot-scope="scope">
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium" :type="tagType(scope)">{{
                  arr[scope.row.catLevel].text
                }}</el-tag>
              </div></template
            >
          </el-table-column>
        </el-table>
      </el-main>
      <el-footer>
        <el-row type="flex" justify="center">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="1"
            :page-sizes="[10, 15, 20, 25]"
            :page-size="page.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="count"
            background
          >
          </el-pagination
        ></el-row>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import { queryListApi } from "@/api";
export default {
  data() {
    return {
      tableData: [], //表格数据
      page: {
        pageNum: 1,
        pageSize: 10,
      }, // 记录页码和页面数量
      count: 0, //记录总数
      arr: [
        { text: "未知", value: 0 },
        { text: "一级", value: 1 },
        { text: "二级", value: 2 },
        { text: "三级", value: 3 },
      ],
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    tagType(val) {
      if (val.row.catLevel === 1) {
        return "success";
      } else if (val.row.catLevel === 2) {
        return "warning";
      } else if (val.row.catLevel === 3) {
        return "danger";
      } else {
        return "info";
      }
    },
    // 改变当前页显示条数
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.page.pageSize = val;
    },
    // 改变当前页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page.pageNum = val;
    },
    async getCateList() {
      //   this.tableData = [];
      const { data } = await queryListApi(this.page);
      this.tableData = data.data;
      this.count = data.count;
    },
    filterTag(value, row) {
      return row.catLevel === value;
    },
  },
  async mounted() {
    const { data } = await queryListApi(this.page);
    console.log(data);
    this.tableData = data.data;
    this.count = data.count;
  },

  watch: {
    page: {
      immediate: true,
      deep: true,
      handler(val) {
        this.getCateList();
      },
    },
  },
};
</script>

<style scoped>
.el-table /deep/.el-table__cell {
  text-align: center;
  transition: all 0.3s;
}
.el-table {
  background: none;
}
.el-table--scrollable-x /deep/.el-table__body-wrapper {
  overflow-x: hidden;
}
</style>
