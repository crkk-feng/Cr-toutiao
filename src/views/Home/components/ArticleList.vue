<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
    <!-- 文章列表 -->
    <ArticleItem v-for="obj in list" :key="obj.art_id" :artObj="obj">
    </ArticleItem>
     </van-list>
  </div>
</template>

<script>
import ArticleItem from './ArticleItem.vue'
import { getAllArticleListAPI } from '@/api'

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
      theTime: new Date().getTime() // 用于分页
    }
  },
  components: {
    ArticleItem
  },
  async created () {
    const res = await getAllArticleListAPI({
      channel_id: this.channelId,
      timestamp: new Date().getTime()
    })
    console.log(res)
    // pre_timestamp
    // 下一段开头的文章的时间戳
    // 第一次 系统时间（timestamp)-> 后台返回0-9条数据 ->携带第10条pre_timestamp值返回
    // 第二次 (timestamp)-上一次pre_timestamp(代表告诉后，从指定的时间戳再往后找10个) 10-19条，20条pre_timestamp返回

    this.list = res.data.data.results
    this.theTime = res.data.data.pre_tiemstamp
  },
  methods: {
    // 底部加载事件方法
    async onLoad () {
      const res = await getAllArticleListAPI({
        channel_id: this.channelId,
        timestamp: new Date().getTime()
      })
      console.log(res)
      if (res.data.data.results.length === 0) {
        this.finished = true
        return
      }
      this.list = [...this.list, ...res.data.data.results]
      this.theTime = res.data.data.pre_tiemstamp

      this.loading = false // 如果不关，底部一直是加载中状态，下次触底不会出发onLoad
    }
  }
}
</script>
