import request from '@/utils/request.js'

// 登录 - 登录接口
// axios内部，会把参数对象转成json字符串格式发后台
// axios内部，会自动携带请求参数（headers）里
// Content-Type: 'application/json' 帮你添加好
export const loginAPI = ({ mobile, code }) => request({
  url: '/v1_0/authorizations',
  method: 'POST',
  data: {
    mobile,
    code
  }
})

// 用户 - 关注
export const userFollowedAPI = ({ userId }) => request({
  url: '/v1_0/user/followings',
  method: 'POST',
  data: {
    target: userId
  }
})

// 用户 - 取消关注
export const userUnFollowedAPI = ({ userId }) => request({
  url: `/v1_0/user/followings/${userId}`,
  method: 'DELETE'
})

// 接口方法, 只负责调用一个接口, 返回一个Promise对象
// 频道 - 获取所有频道
export const getAllChannelsAPI = () => request({
  url: '/v1_0/channels',
  method: 'GET'
})

// 频道 - 获取用户选择的频道
// 注意：用户没有登录，默认返回后台设置的默认频道列表
export const getUserChannelsAPI = () => request({
  url: '/v1_0/user/channels'
  // headers: {
  //   // Authorization: 'Bearer ' + store.state.token
  //   Authorization: `Bearer ${getToken()}`
  // }
})

// 频道 - 更新覆盖频道
export const updateChannelsAPI = ({ channels }) => request({
  url: '/v1_0/user/channels',
  method: 'PUT',
  data: {
    channels // 用户已选整个频道数组
  }
})

// 频道 - 删除用户指定的频道
export const removeTheChannelAPI = ({ channelId }) => request({
  url: `/v1_0/user/channels/${channelId}`,
  method: 'DELETE'
})

// 文章 - 获取列表
export const getAllArticleListAPI = ({ channel_id, timestamp }) => request({
  url: '/v1_0/articles',
  // headers: {
  //   Authorization: `Bearer ${getToken()}`
  // },
  params: { // 这里的参数，axios会帮你拼接在URL？后面（查询字符串）
    channel_id,
    timestamp
  }
})

// 文章 - 反馈 - 不感兴趣
export const dislikeArticleAPI = ({ artId }) => request({
  url: '/v1_0/article/dislikes',
  method: 'POST',
  // headers: {
  //   Authorization: `Bearer ${getToken()}`
  // },
  data: {
    target: artId
  }
})

// 文章 - 反馈 - 反馈垃圾内容
export const reportArticleAPI = ({ artId, type, remark }) => request({
  url: '/v1_0/article/reports',
  method: 'POST',
  // headers: {
  //   Authorization: `Bearer ${getToken()}`
  // },
  data: {
    target: artId,
    type: type,
    remark: remark
  }
})

// 文章 - 获取详情
export const detailAPI = ({ artId }) => request({
  // :id是后台规定的参数名
  // 前端要在对应路径位置传值(不要写:)
  url: `/v1_0/articles/${artId}`
})

// 文章 - 点赞
export const likeArticleAPI = ({ artId }) => request({
  url: '/v1_0/article/likings',
  method: 'POST',
  data: {
    target: artId
  }
})

// 文章 - 取消点赞
export const unLikeArticleAPI = ({ artId }) => request({
  url: `/v1_0/article/likings/${artId}`,
  method: 'DELETE'
})

// 文章 - 获取 - 评论列表
export const commentsListAPI = ({ id, offset = null, limit = 10 }) => request({
  url: '/v1_0/comments',
  params: { // axios只针对params参数，如果发现键值对，值为null，会忽略此参数名和值不携带在url?后面
    type: 'a',
    source: id,
    offset,
    limit
  }
})

// 文章 - 评论 - 喜欢
export const commentLikingAPI = ({ comId }) => {
  return request({
    url: '/v1_0/comment/likings',
    method: 'POST',
    data: {
      target: comId
    }
  })
}

// 文章 - 评论 - 取消喜欢
export const commentDisLikingAPI = ({ comId }) => {
  return request({
    url: `/v1_0/comment/likings/${comId}`,
    method: 'DELETE'
  })
}

// 文章 - 评论 - 发布评论
export const commentSendAPI = ({ id, content, art_id = null }) => {
  // 1.axios中，data请求体传参，如果值为null是不会忽略这个参数的
  // 也会把参数名和值携带给后台（只有params遇到null才会传）
  // 2.形参art_id可选参数，如果逻辑页面是对文章评论，则不需要传递art_id
  // 所以这时，内部art_id值为null就证明此次调用，是针对文章评论
  // data请求体对象需要自己处理
  const obj = {
    target: id,
    content
  }
  if (art_id !== null) { // 如果本次有第三个参数，证明是对评论进行回复
    obj.art_id = art_id
  }
  return request({
    url: '/v1_0/comments',
    method: 'POST',
    data: obj
  })
}

// 搜索 - 联想菜单列表
export const suggestListAPI = ({ keywords }) => request({
  url: '/v1_0/suggestion',
  params: {
    q: keywords
  }
})

// 搜索 - 搜索结果列表
export const searchResultAPI = ({ page = 1, per_page = 10, q }) => request({
  url: '/v1_0/search',
  params: {
    page,
    per_page,
    q
  }
})
