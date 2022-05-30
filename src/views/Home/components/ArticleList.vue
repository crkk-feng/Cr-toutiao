<template>
  <div>
    <ArticleItem v-for="obj in list" :key="obj.art_id" :artObj="obj">
    </ArticleItem>
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
      list: [] // 文章列表数组
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
    this.list = res.data.data.results
  }
}
</script>
