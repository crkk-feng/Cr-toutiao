<template>
  <div>
    <!-- Header 区域 -->
    <van-nav-bar
      fixed
      title="文章详情"
      left-arrow
      @click-left="$router.back()"
    />

    <!-- 文章信息区域 -->
    <div class="article-container">
      <!-- 文章标题 -->
      <h1 class="art-title">{{ artObj.title }}</h1>

      <!-- 用户信息 -->
      <van-cell
        center
        :title="artObj.aut_name"
        :label="formatDate(artObj.pubdate)"
      >
        <template #icon>
          <img :src="artObj.aut_photo" alt="" class="avatar" />
        </template>
        <template #default>
          <div>
            <van-button
              type="info"
              size="mini"
              v-if="artObj.is_followed === true"
              @click="followedFn(true)"
              >已关注</van-button
            >
            <van-button
              icon="plus"
              type="info"
              size="mini"
              plain
              v-else
              @click="followedFn(false)"
              >关注</van-button
            >
          </div>
        </template>
      </van-cell>

      <!-- 分割线 -->
      <van-divider></van-divider>

      <!-- 文章内容 -->
      <div class="art-content" v-html="artObj.content"></div>

      <!-- 分割线 -->
      <van-divider>End</van-divider>

      <!-- 点赞 -->
      <!-- attitude: -1：无态度，0：不喜欢，1：点赞 -->
      <div class="like-box">
        <van-button
          icon="good-job"
          type="danger"
          size="small"
          v-if="artObj.attitude === 1"
          @click="loveFn(true)"
          >已点赞</van-button
        >
        <van-button
          icon="good-job-o"
          type="danger"
          plain
          size="small"
          v-else
          @click="loveFn(false)"
          >点赞</van-button
        >
      </div>
    </div>

    <!-- 文章评论区域 -->
    <div>
      <CommentList></CommentList>
    </div>
  </div>
</template>

<script>
import {
  detailAPI,
  userFollowedAPI,
  userUnFollowedAPI,
  likeArticleAPI,
  unLikeArticleAPI
} from '@/api'
import { timeAgo } from '@/utils/data.js'
import CommentList from './CommentList.vue'
export default {
  data () {
    return {
      artObj: {} // 文章对象
    }
  },
  async created () {
    const res = await detailAPI({
      artId: this.$route.query.art_id
    })
    console.log(res)
    this.artObj = res.data.data
  },
  methods: {
    formatDate: timeAgo,
    // 关注/取关 -> 作者
    // 注意:每个登录的手机号，都维护着自己的关注列表
    // 强烈建议:重新用自己手机号登录,不然会互相影响
    async followedFn (bool) {
      if (bool === true) {
        // 用户点在"已关注"按钮
        // 页面 -> 显示关注按钮
        this.artObj.is_followed = false
        // 业务 -> 取关
        // 调接口 -> 取关接口
        const res = await userUnFollowedAPI({
          userId: this.artObj.aut_id
        })
        console.log(res)
      } else {
        this.artObj.is_followed = true
        const res = await userFollowedAPI({
          userId: this.artObj.aut_id
        })
        console.log(res)
      }
    },
    // 点赞/取消点赞 -> 文章
    async loveFn (bool) {
      if (bool === true) {
        // 用户点在了"已点赞"身上
        // 显示"点赞"按钮
        this.artObj.attitude = 0 // 0是不喜欢，-1无态度
        // 业务 -> 取消点赞
        // 调接口 -> 取消点赞接口
        const res = await unLikeArticleAPI({
          artId: this.artObj.art_id
        })
        console.log(res)
      } else {
        this.artObj.attitude = 1
        const res = await likeArticleAPI({
          artId: this.artObj.art_id
        })
        console.log(res)
      }
    }
  },
  components: {
    CommentList
  }
}
</script>

<style scoped lang="less">
.article-container {
  padding: 10px;
  margin-top: 46px;
}
.art-title {
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0;
}

.art-content {
  font-size: 12px;
  line-height: 24px;
  width: 100%;
  overflow-x: scroll;
  word-break: break-all;
  /deep/ img {
    width: 100%;
  }
  /deep/ pre {
    white-space: pre-wrap;
    word-wrap: break-word;
  }
}

.van-cell {
  padding: 5px 0;
  &::after {
    display: none;
  }
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #f8f8f8;
  margin-right: 5px;
  border: none;
}

.like-box {
  display: flex;
  justify-content: center;
}
</style>
