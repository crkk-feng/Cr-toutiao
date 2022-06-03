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
        <ArticleItem
          v-for="obj in list"
          :key="obj.art_id"
          :artObj="obj"
          @disLikeEV="disLikeFn"
          @reportEV="reportFn"
          @click.native="itemClickFn(obj.art_id)"
        >
        </ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import ArticleItem from '../../../components/ArticleItem.vue'
import { getAllArticleListAPI, dislikeArticleAPI, reportArticleAPI } from '@/api'
import { Notify } from 'vant'

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
    this.getArticleListFn()
  },
  methods: {
    // 专门负责发送请求
    async getArticleListFn () {
      const res = await getAllArticleListAPI({
        channel_id: this.channelId,
        timestamp: this.theTime
      })
      console.log(res)
      // created()上来第一次list是空数组,合并空数组没问题
      // onLoad()触底加载更多，2个数组合并更没问题
      this.list = [...this.list, ...res.data.data.results]
      // pre_timestamp
      // 下一段开头的文章的时间戳
      // 第一次 系统时间（timestamp)-> 后台返回0-9条数据 ->携带第10条pre_timestamp值返回
      // 第二次 (timestamp)-上一次pre_timestamp(代表告诉后，从指定的时间戳再往后找10个) 10-19条，20条pre_timestamp返回
      this.theTime = res.data.data.pre_timestamp

      // created()上来走一次，loading没触底本身就是false，但是给false也没问题
      // 为了一会儿onLoad()调用时，才有用

      // 对异步请求进行处理，需要都放入该方法中
      this.loading = false // 如果不关，底部一直是加载中状态，下次触底不会出发onLoad
      // if (res.data.data.results.length === 0) {
      if (res.data.data.pre_timestamp === null) {
        // 本次数据为最后的，没有下一段时间戳
        this.finished = true
      }
      // 顶部加载状态改为false
      this.isLoading = false
    },
    // 底部加载事件方法
    async onLoad () {
      if (this.list.length === 0) {
        return // 如果页面没有数据，没有高度，让本次onLoad逻辑代码不往下执行
      }
      this.getArticleListFn()
    },
    // 顶部-刷新数据事件方法
    async onRefresh () {
      // 目标：list数组清空，来请求新的数据
      this.list = []
      this.theTime = new Date().getTime()
      this.getArticleListFn()
    },
    // 反馈-不感兴趣
    async disLikeFn (id) {
      // const res = await dislikeArticleAPI({
      // 如果用try+catch自己处理错误，内部throw就不会向控制台抛出打印错误，而是交给你的catch内来自定义错误处理
      // try+catch捕获同步代码的异常
      try {
        await dislikeArticleAPI({
          artId: id
        })
        // res里没有什么有用的信息，所以await往下放行，证明请求和响应成功，反馈成功
        // console.log(res)
        Notify({ type: 'success', message: '反馈成功' })
        console.log('成功了')
      } catch (err) {
        // Notify({ type: 'warning', message: '反馈失败-联系程序员' })
        console.log('失败了')
      }
    },
    // 反馈-垃圾内容
    async reportFn (id, value) {
      try {
        await reportArticleAPI({
          artId: id,
          type: value,
          remark: '其他问题'
        })
        Notify({ type: 'success', message: '举报成功' })
      } catch (err) {
        // Notify({ type: 'warning', message: '举报失败' })
      }
    },
    // 文章单元格-点击事件
    // 需要阻止反馈按钮的事件冒泡
    itemClickFn (id) {
      this.$router.push({
        path: `/detail?art_id=${id}`
      })
    }
  }
}
</script>
