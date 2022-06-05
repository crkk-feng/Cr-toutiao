import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '@/views/Login'
// import Layout from '@/views/Layout'
// import Home from '@/views/Home'
// import User from '@/views/User'
// import Search from '@/views/Search'
// import SearchResult from '@/views/Search/SearchResult'
// import ArticleDetail from '@/views/ArticleDetail'
// import UserEdit from '@/views/User/UserEdit'
// import Chat from '@/views/Chat'
import { getToken } from '@/utils/token.js'

// 总结：
// 路由懒加载：为了让第一个页面，加载的app.js小一点，打开网页快一点
// 思路：把组件对应的js，分成若干个.js，路由切换到哪个页面，才去加载对应的.js文件
// 原因：webpack分析入口时，发现router里上来就import所有界面，所以直接打包进app.js->很大
// 解决：当路由路径匹配规则时，才现去import引入对应的组件js文件
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/layout/home' // 这里默认打开首页(layout页下的home)
  },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    // component: Login
    component: () => import(/* webpackChunkName: "Login" */ '@/views/Login'),
    beforeEnter (to, from, next) {
      if (getToken()?.length > 0) {
        // 证明有token-已经登录了
        // next(false) // 阻止跳转原地呆着
        // 存在缺陷，在文章详情页想进入登录页，无法进行后退
        // 措施：如果登录，强制返回首页
        next('/layout/home')
        // 手机app里没有地址栏，无法破坏跳转过程
      } else {
        next() // 其它情况通通放行
      }
    }
  },
  {
    path: '/layout',
    // component: Layout,
    component: () => import(/* webpackChunkName: "Layout" */ '@/views/Layout'),
    // redirect: '/layout/home', // 默认显示二级页面为home首页
    children: [
      {
        path: 'home',
        // component: Home
        component: () => import(/* webpackChunkName: "Home" */ '@/views/Home'),
        meta: {
          scrollT: 0 // 保存首页离开时，滚动条的位置
        }
      },
      {
        path: 'user',
        // component: User
        component: () => import(/* webpackChunkName: "User" */ '@/views/User')
      }
    ]
  },
  {
    path: '/search',
    // component: Search
    component: () => import(/* webpackChunkName: "Search" */ '@/views/Search')
  },
  { // 搜索结果页面
    path: '/search_result/:kw',
    // component: SearchResult
    component: () => import(/* webpackChunkName: "SearchResult" */ '@/views/Search/SearchResult')
  },
  { // 文章详情页
    path: '/detail',
    // component: ArticleDetail
    component: () => import(/* webpackChunkName: "Detail" */ '@/views/ArticleDetail')
  },
  { // 用户编辑页面
    path: '/user_edit',
    // component: UserEdit
    component: () => import(/* webpackChunkName: "UserEdit" */ '@/views/User/UserEdit')
  },
  { // 聊天页面
    path: '/chat',
    // component: Chat
    component: () => import(/* webpackChunkName: "Chat" */ '@/views/Chat')
  }
]

const router = new VueRouter({
  routes
})

// 路由 - 全局前置守卫（在路由发生真正跳转之前，执行此函数）
// 此函数可以决定路由是否跳转/取消/强制中断切换到别的路由
// router.beforeEach((to, from, next) => {
//   // 有token, 不能去登录页
//   // 无token, 需要用户"权限"的才需要去登录页
//   if (getToken()?.length > 0 && to.path === '/login') {
//     // 证明有token-已经登录了
//     next(false) // 阻止跳转原地呆着
//     next('/layout/home')
//   } else {
//     next() // 其它情况通通放行
//   }
// })

export default router
