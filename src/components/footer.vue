<template>
  <el-footer>
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
    </el-pagination>
  </el-footer>
</template>

<script>
export default {
  name: "foot",
  props: {
    page: {
      type: Object,
      required: true,
    },
    count: {
      type: Number,
      required: true,
    },
  },
  computed: {
    pages() {
      return this.page;
    },
  },
  methods: {
    // 改变当前页显示条数
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pages.pageSize = val;
      this.$emit("changeSize", this.pages.pageSize);
    },
    // 改变当前页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pages.pageNum = val;
      this.$emit("changeNum", this.pages.pageNum);
    },
  },
};
</script>

<style scope>
.el-footer {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
