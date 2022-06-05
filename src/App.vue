<template>
  <div>
    <!-- 有些一级路由页面无需缓存 -->
    <keep-alive exclude="Search,SearchResult,Detail,UserEdit">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {}
</script>

<style>
</style>
