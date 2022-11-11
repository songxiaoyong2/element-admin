<template>
  <div>
    <!-- 添加弹出层 -->
    <el-dialog title="添加" :visible.sync="dialogFormVisible">
      <el-form :model="editForm">
        <el-form-item label="日期" :label-width="formLabelWidth">
          <div class="block">
            <el-date-picker
              v-model="form.date"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="地址">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addDialog">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 是否关闭弹出层
      dialogFormVisible: false,
      // 展示表单数据
      form: {
        name: "",
        date: "",
        address: "",
      },
    };
  },
  methods: {
    // 添加数据
    addDialog() {
      this.dialogFormVisible = false;
      this.tableData.push(this.form);
    },
  },
};
</script>

<style></style>
