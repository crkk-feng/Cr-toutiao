// 基于 axios 封装的请求模块
import theAxios from 'axios'
import router from '@/router'
import { Notify } from 'vant'
import { getToken } from '@/utils/token.js'
// 新建一个新的axios实例
const axios = theAxios.create({
  baseURL: 'http://geek.itheima.net', // 基地址
  timeout: 20000 // 20秒超时时间
})

// 添加请求拦截器
// 使用后不再需要headers
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 目标：统一携带token
  // 判断本地有token再携带，判断具体api/index.js里如果没有携带Authorization，再添加上去
  // 未定义叫undefined，null具体的值得赋予才叫空
  // ?. 可选链操作符，如果前面对象里没有length，整个表达式原地返回undefined
  // 如果getToken()在原地有值token字符串，才能调用length获取长度
  if (getToken()?.length > 0 && config.headers.Authorization === undefined) {
    config.headers.Authorization = `Bearer ${getToken()}`
    console.log(config)
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
// 本质：就是一个函数
axios.interceptors.response.use(function (response) {
  // 当http响应状态码为2xx/3xx开头的进这里
  // 对响应数据做点什么
  return response
}, function (error) {
  // 当http响应状态码为4xx/5xx开头的进这里
  // 对响应错误做点什么
  console.dir(error)
  // console.dir(this) // undefined
  // 只有401才代表身份过期，才需要跳转登录
  if (error.response.status === 401) {
    // 不能使用this.$router(因为this不是vue组件对象)
    // 解决：this.$router为了拿到router路由对象，所以直接去上面引入@/router对象
    // this.$router.replace('login')
    Notify({ type: 'warning', message: '身份已过期' })
    router.replace('/login')
  }
  return Promise.reject(error)
})

// 导出自定义函数, 参数对象解构赋值
export default ({ url, method = 'GET', params, data, headers }) => {
  return axios({
    url: url,
    method: method,
    params: params,
    data: data,
    headers: headers
  })

// 以后换库, 只需要改这里, 逻辑页面不用动, 保证代码的复用性和独立性(高内聚低耦合)
//   return $.ajax({
//     url: url,
//     type: method,
//     data: data,
//     header: headers
//   })
}
