<template>
  <div style="padding: 20px">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="序号" type="index" width="60"> </el-table-column>
      <el-table-column prop="roleId" label="角色编号" width="100">
        <template slot-scope="scope">
          <el-tag size="medium">{{ scope.row.roleId }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="roleName" label="角色名称" width="100">
      </el-table-column>
      <el-table-column prop="roleDesc" label="角色描述" width="150">
      </el-table-column>
      <el-table-column label="具备权限">
        <template slot-scope="scope">
          <el-badge
            :value="scope.row.children[index].children.length"
            class="item"
            type="primary"
            v-for="(item, index) in scope.row.children"
            :key="index"
          >
            <el-popover placement="right" trigger="click">
              <el-card class="box-card" shadow="never">
                <div slot="header" class="clearfix">
                  <span>权限详情</span>
                </div>
                <span v-show="item.children.length === 0" style="color: #f56c6c"
                  >暂无数据</span
                >
                <div
                  v-for="(o, index) in item.children"
                  :key="index"
                  class="text item"
                >
                  <el-tag size="medium" type="success"> {{ o.psName }}</el-tag>
                </div>
              </el-card>
              <el-button
                size="mini"
                slot="reference"
                @click="info(scope.row.children)"
                >{{ item.psName }}</el-button
              >
            </el-popover>
          </el-badge>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getRoleApi } from "@/api";
export default {
  data() {
    return {
      tableData: [],
      visible: false,
    };
  },
  methods: {
    info(data) {
      console.log(data);
    },
  },
  async mounted() {
    const { data } = await getRoleApi({ pageSize: 10, pageNum: 1 });
    this.tableData = data.data;
  },
};
</script>

<style scoped>
.el-table /deep/.cell {
  overflow: unset;
}
/deep/.el-badge__content.is-fixed {
  position: absolute;
  top: 0;
  right: 10px;
  transform: translateY(-50%) translateX(70%);
}
.el-table td.el-table__cell div {
  margin: 5px 10px;
  margin-left: 0;
  box-sizing: border-box;
}
div.text.item {
  margin-bottom: 10px;
}
.el-table /deep/.el-table__cell:nth-child(5) {
  text-align: left;
}
.el-table /deep/.has-gutter .el-table__cell:nth-child(5) {
  text-align: center;
}
</style>
