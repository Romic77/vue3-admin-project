<template>
  <div>
    首页
    {{ useUserStore.username }}
  </div>
</template>
<script setup lang="ts">
import userStore from '@/store/modules/user'
let useUserStore = userStore()
</script>
<style scoped lang="scss"></style>
