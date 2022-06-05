// 基于 axios 封装的请求模块
import theAxios from 'axios'
import router from '@/router'
// import { Notify } from 'vant'
import { getToken, removeToken } from '@/utils/token.js' // setToken
// import { getNewTokenAPI } from '@/api'
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
}, async function (error) {
  // 当http响应状态码为4xx/5xx开头的进这里
  // 对响应错误做点什么
  console.dir(error)
  // console.dir(this) // undefined
  // 只有401才代表身份过期，才需要跳转登录
  if (error.response.status === 401) {
    // 不能使用this.$router(因为this不是vue组件对象)
    // 解决：this.$router为了拿到router路由对象，所以直接去上面引入@/router对象
    // this.$router.replace('login')
    // Notify({ type: 'warning', message: '身份已过期' })

    // removeToken()
    // 方式1：清除token,强制跳转到登录，用户有感知
    removeToken() // 先清除token，才能让路由守卫判断失效，放行去登录页
    // router.replace('/login')
    // router.currentRoute相当于 在vue文件内this.$route -> 当前路由对象的信息
    // fullPath，路由对象里完整路由路径：#号后面一切
    router.replace(`/login?path=${router.currentRoute.fullPath}`)
  }
  // 方式2：使用refresh_token换回新的token再继续使用，JS代码实现，用户无感知（效果好）
  //   const res = await getNewTokenAPI()
  //   // 1.更新token在本地
  //   setToken(res.data.data.token)
  //   // 2.更新新的token在请求头里
  //   error.config.headers.Authorization = `Bearer ${res.data.data.token}`
  //   // 3.未完成的请求，再次发起
  //   // error.config就是上一次请求的配置对象
  //   // 结果要return回原本逻辑页面调用的地方-return回去一个Promise对象
  //   return axios(error.config)
  //   // console.log(res)
  // } else if (error.response.status === 500 && error.config.url === '/v1_0/authorizations' && error.config.method === 'put') {
  //   // 刷新的refresh_token也过期了
  //   localStorage.clear() // 清除localStorage里所有的值
  //   Notify({ type: 'warning', message: '身份已过期' })
  //   router.replace('/login')
  // }
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
