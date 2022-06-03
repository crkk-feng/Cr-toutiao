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
    <!-- 文章列表 -->
    <div>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check="false"
        offset="50"
      >
        <ArticleItem
          v-for="obj in articleList"
          :key="obj.art_id"
          :artObj="obj"
          :isShow="false"
          @click.native="itemClickFn(obj.art_id)"
        >
        </ArticleItem>
      </van-list>
    </div>
  </div>
</template>

<script>
// 事件修饰符.native -> 给组件内根标签，绑定原生click点击事件
import { searchResultAPI } from '@/api'
import ArticleItem from '@/components/ArticleItem.vue'
export default {
  name: 'SearchResult',
  data () {
    return {
      page: 1, // 页码
      articleList: [], // 文章列表
      loading: false, // 加载状态
      finished: false // 是否全部加载完成
    }
  },
  async created () {
    const res = await searchResultAPI({
      page: this.page,
      q: this.$route.params.kw
    })
    console.log(res)
    this.articleList = res.data.data.results
  },
  components: {
    ArticleItem
  },
  methods: {
    async onLoad () {
      if (this.articleList.length > 0) {
        this.page++
        const res = await searchResultAPI({
          page: this.page,
          q: this.$route.params.kw
        })
        if (res.data.data.results.length === 0) {
          // 没有更多数据
          this.finished = true
          return
        }
        console.log(res)
        this.articleList = [...this.articleList, ...res.data.data.results]
        this.loading = false
      }
    },
    // 跳转到详情
    itemClickFn (id) {
      this.$router.push({
        path: `/detail?art_id=${id}`
      })
    }
  }
}
// 业务:
// 前端(自己）->后端(自己)
// 后端保存文章的数据，文章里的图片来自于其他服务器路径cnblog(图片第三方的)
// 后端只是保存了图片的地址
// 后端会把数据和图片地址返回给前端，前端铺设页面，用img标签-〉第三方图片(404/403) - (人家把图片删除了)
// 404无法解决 -> 后台换图(前端只能给个占位图提示)
// 403你无权利去请求此地址 -> 后端做了图片防盗链
// 防止你用img标签来请求此图片（它不想让它的图片，被你的网站所引用)//后端会判断请求时，Reffer字段的来源是不是自己的地址
// 解决:meta不让浏览器携带请求头里reffer,让后端判断失效
</script>

<style lang="less" scoped>
.search-result-container {
  padding-top: 46px;
}
</style>
