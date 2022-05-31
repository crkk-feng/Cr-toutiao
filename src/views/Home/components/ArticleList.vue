<template>
  <div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check="false"
        offset="50"
      >
        <!-- 文章列表 -->
        <ArticleItem v-for="obj in list" :key="obj.art_id" :artObj="obj">
        </ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import ArticleItem from './ArticleItem.vue'
import { getAllArticleListAPI } from '@/api'

// 产生问题：网页刚打开，created里请求和onLoad里请求同时发送，请求的都是最新数据
// onLoad中，2次一样的数据合并，数据重复，key重复了
// 原因：van-list组件，组件挂载时，默认就会判定一次是否触底
// 第一页数据也是网络请求回来的，标签先挂载了，数据回来更新DOM，所以标签没有高度，list的load事件上来就触发
// 解决1：list组件添加 :immediate-check="false" 上来初始化时不判定
// 解决2：onLoad第一行，写数组长度判断

export default {
  props: {
    // list: Array // 文章列表数组
    channelId: Number // 频道id
  },
  data () {
    return {
      list: [], // 文章列表数组
      loading: false, // 底部加载状态
      finished: false, // 底部完成状态
      theTime: new Date().getTime(), // 用于分页
      isLoading: false // 顶部加载状态
    }
  },
  components: {
    ArticleItem
  },
  async created () {
    const res = await getAllArticleListAPI({
      channel_id: this.channelId,
      timestamp: this.theTime
    })
    console.log(res)
    // pre_timestamp
    // 下一段开头的文章的时间戳
    // 第一次 系统时间（timestamp)-> 后台返回0-9条数据 ->携带第10条pre_timestamp值返回
    // 第二次 (timestamp)-上一次pre_timestamp(代表告诉后，从指定的时间戳再往后找10个) 10-19条，20条pre_timestamp返回

    this.list = res.data.data.results
    this.theTime = res.data.data.pre_timestamp
  },
  methods: {
    // 底部加载事件方法
    async onLoad () {
      if (this.list.length === 0) {
        return // 如果页面没有数据，没有高度，让本次onLoad逻辑代码不往下执行
      }

      const res = await getAllArticleListAPI({
        channel_id: this.channelId,
        timestamp: this.theTime
      })
      console.log(res)
      this.list = [...this.list, ...res.data.data.results]
      this.theTime = res.data.data.pre_timestamp

      this.loading = false // 如果不关，底部一直是加载中状态，下次触底不会出发onLoad
      // if (res.data.data.results.length === 0) {
      if (res.data.data.pre_timestamp === null) {
        // 本次数据为最后的，没有下一段时间戳
        this.finished = true
      }
    },
    // 顶部-刷新数据事件方法
    async onRefresh () {
      // 目标：list数组清空，来请求新的数据
      this.list = []
      this.theTime = new Date().getTime()

      const res = await getAllArticleListAPI({
        channel_id: this.channelId,
        timestamp: this.theTime
      })
      console.log(res)
      this.list = [...this.list, ...res.data.data.results]
      this.theTime = res.data.data.pre_timestamp

      // 顶部加载状态改为false
      this.isLoading = false
    }
  }
}
</script>
