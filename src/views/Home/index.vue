<template>
  <div>
    <div>
      <!-- 头部标签 -->
      <!-- fixed固定顶部 -->
      <van-nav-bar fixed>
        <template #left>
          <!-- <img class="logo" src="../../assets/toutiao_logo.png" alt="" /> -->
          <img class="logo" :src="imgObj" />
        </template>
        <template #right>
          <!-- 坑: postcss只能翻译style里css样式代码，标签内行内样式它无法转换px转rem,所以需要自己手动计算 -->
          <van-icon name="search" size="0.48rem" color="#fff" />
        </template>
      </van-nav-bar>
    </div>
    <div class="main">
      <!-- 频道部分 -->
      <!-- (重要)每个van-tab代表一个标签导航，中间夹着内容，对应的下属列表内容-->
      <!-- (重要)每个van-tab都对应独立的自己的ArticleList-->
      <van-tabs v-model="active" animated sticky offset-top="1.226667rem">
        <!-- key提升更新性能 -->
        <van-tab :title="obj.name" v-for="obj in userChannelList" :key="obj.id">
          <ArticleList></ArticleList>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import logoPng from '../../assets/toutiao_logo.png'
import { getAllArticleListAPI, getUserChannelsAPI } from '@/api'
import ArticleList from './components/ArticleList.vue'

export default {
  name: 'Home',
  data () {
    return {
      active: 0,
      imgObj: logoPng,
      userChannelList: [] // 用户选择频道列表
    }
  },
  async created () {
    // 频道列表
    const res = await getUserChannelsAPI()
    console.log(res)
    this.userChannelList = res.data.data.channels

    // 文章列表
    const res2 = await getAllArticleListAPI({
      channel_id: 0, // 先默认请求推荐频道数据
      timestamp: new Date().getTime()
    })
    console.log(res2)
  },
  components: { ArticleList }
}
</script>

<style scoped lang="less">
.logo {
  width: 120px;
  height: 40px;
}
.main {
  padding-top: 46px;
  // 底部在Layout/index.vue中给了
}
</style>
