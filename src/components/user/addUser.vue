<template>
  <div>
    <!-- 添加弹出层 -->
    <el-dialog
      title="添加"
      :visible.sync="dialogFormVisible"
      :beforeClose="close"
    >
      <el-form :model="form" :rules="rules" ref="formName">
        <el-form-item label="姓名" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="userEmail">
          <el-input v-model="form.userEmail"></el-input>
        </el-form-item>

        <el-form-item label="电话" prop="userTel">
          <el-input v-model="form.userTel"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="$emit('hideDialog', false)">取 消</el-button>
        <el-button
          type="primary"
          @click="submitForm('formName')"
          :loading="loading"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addUserApi } from "@/api";
export default {
  props: {
    dialogFormVisible: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      // 展示表单数据
      form: {
        username: "",
        userEmail: "",
        userTel: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        userEmail: [
          {
            required: true,
            message: "请填写一个邮箱",
            trigger: "blur",
          },
        ],
        userTel: [{ required: true, message: "请填写手机号", trigger: " " }],
      },
      loading: false,
    };
  },
  methods: {
    // 添加数据
    submitForm(formName) {
      this.loading = true;
      // validate可以查看表单验证是否通过，参数valid是true或false
      this.$refs[formName].validate(async valid => {
        if (valid) {
          // 通过调用接口
          const { data } = await addUserApi(this.form);
          // 提交成功提示
          if (data.status === 200) {
            this.$message({
              message: "恭喜你，成功添加",
              type: "success",
            });
            this.loading = false;
            this.$emit("hideDialog", false);
          } else {
            // 提交失败提示
            this.loading = false;
            this.$message.error("未知错误，请稍后重试。");
          }
        } else {
          // 不通
          this.loading = false;
        }
      });
    },
    // 关闭弹窗
    close() {
      this.$emit("hideDialog", false);
    },
  },
};
</script>

<style scoped>
.el-form-item {
  margin-bottom: 22px;
  display: flex;
}
.el-form-item /deep/.el-form-item__content {
  line-height: 40px;
  position: relative;
  font-size: 14px;
  flex: 1 !important;
}
</style>
