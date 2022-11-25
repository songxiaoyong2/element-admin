<template>
  <div style="padding: 20px">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" label="序号" width="60"> </el-table-column>
      <el-table-column prop="psId" label="权限编码" width="387">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.psId }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="psName" label="权限名称" width="395">
      </el-table-column>
      <el-table-column
        prop="psLevel"
        label="权限级别"
        width="395"
        :filters="[
          { text: '一级', value: '0' },
          { text: '二级', value: '1' },
          { text: '三级', value: '2' },
        ]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.psLevel | level">{{
            arr[scope.row.psLevel]
          }}</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getPermissionApi } from "@/api";
export default {
  data() {
    return {
      tableData: [],
      arr: ["一级", "二级", "三级"],
    };
  },
  async mounted() {
    const { data } = await getPermissionApi({});
    this.tableData = data.data;
  },
  filters: {
    level: function (val) {
      if (val == 0) {
        return "success";
      } else if (val == 1) {
        return "warning";
      } else if (val == 2) return "danger";
    },
  },
  methods: {
    filterTag(value, row) {
      return row.psLevel === value;
    },
  },
};
</script>

<style scope>
/deep/.el-table .cell {
  box-sizing: border-box;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  word-break: break-all;
  line-height: 23px;
  padding-left: 10px;
  padding-right: 10px;
  text-align: center;
}
</style>
