<template>
  <div>
    <!-- 表格弹出层 -->
    <el-drawer
      title="查看信息"
      :visible.sync="tables"
      direction="rtl"
      size="50%"
      @close="close"
    >
      <el-descriptions
        direction="vertical"
        :column="1"
        border
        style="padding: 0 20px"
      >
        <el-descriptions-item label="用户名">{{
          curData.username
        }}</el-descriptions-item>
        <el-descriptions-item label="手机号">{{
          curData.userTel
        }}</el-descriptions-item>
        <el-descriptions-item label="邮箱" :span="2">{{
          curData.userEmail
        }}</el-descriptions-item>
        <el-descriptions-item label="性别">
          <el-tag size="small">{{ curData.userSex }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="学历">
          <el-tag size="small">{{ curData.userXueli }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="学号">
          <el-tag size="small">{{ curData.userId }}</el-tag>
        </el-descriptions-item>
      </el-descriptions>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: "showUser",
  props: {
    table: {
      type: Boolean,
      default: false,
    },
    curData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      // 是否展示弹出层
      // table: false,
      //   展示的数据
      // curData: [],
    };
  },
  computed: {
    tables: {
      set() {},
      get() {
        return this.table;
      },
    },
  },
  methods: {
    close() {
      this.$emit("tableClose", false);
    },
  },
};
</script>

<style></style>
