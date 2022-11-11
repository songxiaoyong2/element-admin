<template>
  <div>
    <!-- 弹出层 -->
    <el-drawer
      title="编辑"
      :before-close="handleClose"
      :visible.sync="dialogs"
      direction="ltr"
      custom-class="demo-drawer"
      ref="drawer"
    >
      <div class="demo-drawer__content" style="padding: 0 20px">
        <el-form status-icon :rules="rules">
          <el-form-item label="姓名">
            <el-input v-model="form.username" style="width: 300px"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="form.userEmail" style="width: 300px"></el-input>
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="form.userTel" style="width: 300px"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <el-row type="flex" class="row-bg" justify="center">
        <el-button @click="cancelForm">取 消</el-button>
        <el-button type="primary" @click="commit()" :loading="loading">{{
          loading ? "提交中 ..." : "确 定"
        }}</el-button>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
import { editUserApi } from "@/api";
export default {
  props: {
    dialog: {
      type: Boolean,
      required: true,
    },
    editForm: {
      type: Object,
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
        userId: null,
      },
      //   弹出层宽度
      formLabelWidth: "80px",

      loading: false,
      timer: null,
    };
  },
  computed: {
    dialogs: {
      set() {},
      get() {
        return this.dialog;
      },
    },
  },
  methods: {
    // 关闭表单弹出层
    handleClose(done) {
      if (this.loading) {
        return;
      } else {
        this.$emit("closeDialog", false);
      }
    },
    // 关闭表单
    cancelForm() {
      this.loading = false;
      this.$emit("closeDialog", false);
    },
    // 提交数据
    commit() {
      this.loading = true;
      this.$confirm("确定要提交表单吗？")
        .then(_ => {
          this.timer = setTimeout(async () => {
            const { data } = await editUserApi(this.form);
            this.$emit("closeDialog", true);
            // 动画关闭需要一定的时间
            setTimeout(() => {
              this.loading = false;
            }, 400);
          }, 2000);
        })
        .catch(_ => {
          this.loading = false;
        });
      this.$refs.drawer.closeDrawer();
    },
  },
  watch: {
    dialog: {
      immediate: true,
      deep: true,
      handler(val) {
        if (val) {
          this.form.username = this.editForm.username;
          this.form.userEmail = this.editForm.userEmail;
          this.form.userTel = this.editForm.userTel;
          this.form.userId = this.editForm.userId;
        }
      },
    },
  },
};
</script>

<style></style>
