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

// 接口方法, 只负责调用一个接口, 返回一个Promise对象
// 频道 - 获取所有频道
export const getAllChannelsAPI = () => request({
  url: '/v1_0/channels',
  method: 'GET'
})

// 获取 - 获取用户选择的频道
// 注意：用户没有登录，默认返回后台设置的默认频道列表
export const getUserChannelsAPI = () => request({
  url: '/v1_0/user/channels'
  // headers: {
  //   // Authorization: 'Bearer ' + store.state.token
  //   Authorization: `Bearer ${getToken()}`
  // }
})

// 文章 - 获取列表
export const getAllArticleListAPI = ({ channel_id, timestamp }) => {
  return request({
    url: '/v1_0/articles',
    // headers: {
    //   Authorization: `Bearer ${getToken()}`
    // },
    params: { // 这里的参数，axios会帮你拼接在URL？后面（查询字符串）
      channel_id,
      timestamp
    }
  })
}

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
export const reportArticleAPI = ({ artId, type, remark }) => {
  return request({
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
}
