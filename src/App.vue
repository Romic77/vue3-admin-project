<template>
  <div class="app-container">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
// 这里可以添加需要的组件引入
</script>

<style lang="scss">
// 确保图标样式正确加载
.app-container {
  width: 100%;
  height: 100%;
}

:deep(svg) {
  width: 1em;
  height: 1em;
  vertical-align: middle;
}

// 确保 Element Plus 图标正常显示
.el-icon {
  vertical-align: middle;
}
</style>
