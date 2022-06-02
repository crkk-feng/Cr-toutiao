<template>
  <div>
    <!-- 搜索结果页-头部导航 -->
    <div class="search-result-container">
      <!-- 点击实现后退效果 -->
      <van-nav-bar
        title="搜索结果"
        left-arrow
        @click-left="$router.go(-1)"
        fixed
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchResult'
}
</script>

<style lang="less" scoped>
.search-result-container {
  padding-top: 46px;
}
</style>
