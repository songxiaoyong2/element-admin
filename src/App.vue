<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script></script>

<style lang="scss">
#app,
body,
html {
  height: 100%;
}
* {
  padding: 0;
  margin: 0;
}
.el-table--scrollable-x .el-table__body-wrapper {
  overflow-x: hidden !important;
}
</style>
