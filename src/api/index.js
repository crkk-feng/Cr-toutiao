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
