<template>
  <div>
    <el-container style="transition: all 0.3s">
      <el-main>
        <el-button type="primary" @click="add"
          >添加<i class="el-icon-circle-plus el-icon--right"></i
        ></el-button>

        <el-table
          :data="tableData"
          style="text-align: center; transition: all 0.3s"
        >
          <el-table-column
            type="index"
            label="编号"
            :index="getIndex"
            width="60"
            :default-sort="{ prop: 'userId', order: 'descending' }"
          >
          </el-table-column>
          <el-table-column label="ID" width="60" prop="userId" sortable>
            <template slot-scope="scope">
              <el-tag size="mini">{{ scope.row.userId }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="username" label="姓名" width="140">
          </el-table-column>
          <el-table-column prop="userSex" label="性别" width="60">
          </el-table-column>
          <el-table-column prop="userEmail" label="邮箱" width="200">
          </el-table-column>
          <el-table-column prop="userTel" label="电话" width="120">
          </el-table-column>
          <el-table-column prop="userXueli" label="学历" width="200">
          </el-table-column>
          <el-table-column
            prop="option"
            label="操作"
            :width="isCollapse ? 425 : 300"
            style="transition: all 0.3s"
          >
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="info" size="mini"
                >查看</el-button
              >
              <el-button type="primary" size="mini" @click="edit(scope.row)"
                >编辑</el-button
              >
              <el-button
                @click.native.prevent="deleteRow(scope.$index, tableData)"
                type="danger"
                size="mini"
              >
                移除
              </el-button>
            </template>
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
            :total="total"
            background
          >
          </el-pagination></el-row
      ></el-footer>
    </el-container>
    <add-user
      :dialogFormVisible="dialogFormVisible"
      @hideDialog="hideDialog"
    ></add-user>

    <edit-user
      :editForm="editForm"
      :dialog="dialog"
      @closeDialog="closeDialog"
    ></edit-user>

    <show-user
      :table="table"
      :curData="curData"
      @tableClose="tableClose"
    ></show-user>
  </div>
</template>

<script>
import addUser from "./addUser.vue";
import editUser from "./editUser.vue";
import showUser from "./showUser.vue";

import { userListApi } from "@/api";
export default {
  components: { addUser, editUser, showUser },
  name: "userList",
  data() {
    return {
      table: false, //展示信息
      curData: {},
      dialog: false, //编辑
      tableData: [], //保存当前页的数据
      total: 0, //数据的总条数
      page: {
        pageSize: 10,
        pageNum: 1,
      },
      editForm: {}, //保存修改的数据
      ins: [],
      dialogFormVisible: false, //用来控制添加用户弹出窗
    };
  },

  methods: {
    // 删除此条数据
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    // 查看数据
    handleClick(row) {
      // this.curData = row;
      // console.log(row);
      this.curData = {};
      this.curData = row;
      this.table = true;
    },
    // 修改信息
    edit(row) {
      this.editForm = row;
      this.dialog = true;
    },
    // 添加
    add() {
      this.dialogFormVisible = true;
    },
    // 关闭查看
    tableClose(val) {
      this.table = val;
    },
    // 关闭修改
    async closeDialog(val) {
      if (val) {
        this.tableData = [];
        const { data } = await userListApi(this.page);
        this.tableData = data.data;
        this.dialog = false;
      } else {
        this.dialog = val;
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
    // 封装：请求用户列表
    async getUserList() {
      const { data } = await userListApi(this.page);
      this.total = data.count;
      this.tableData = data.data;
    },
    getIndex(ind) {
      return ind + this.page.pageSize * (this.page.pageNum - 1) + 1;
    },
    // 关闭添加用户弹出窗
    hideDialog(val) {
      this.dialogFormVisible = val;
    },
  },
  async mounted() {
    this.getUserList();
    console.log(this.getIndex());
  },
  watch: {
    page: {
      immediate: true,
      deep: true,
      handler(val) {
        console.log(val);
        this.getUserList();
      },
    },
  },
  computed: {
    isCollapse() {
      return this.$store.state.isCollapse;
    },
  },
};
</script>

<style>
.section-big {
  margin-left: 64px !important;
}
el-contain {
  transition: all 0.3s;
}
.el-table .el-table__cell {
  text-align: center;
}
</style>
