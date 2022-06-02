import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'
import { NavBar, Form, Field, Button, Tabbar, TabbarItem, Icon, Tab, Tabs, Cell, List, PullRefresh, ActionSheet, Popup, Row, Col, Badge, Search } from 'vant'

Vue.use(Search)

Vue.use(Badge)
Vue.use(Row)
Vue.use(Col)

Vue.use(Popup)

Vue.use(ActionSheet)

Vue.use(PullRefresh)

Vue.use(List)

Vue.use(Cell)

Vue.use(Tab)
Vue.use(Tabs)

Vue.use(Icon)

Vue.use(Tabbar)
Vue.use(TabbarItem)

Vue.use(Form)
Vue.use(Field)
Vue.use(Button)
Vue.use(NavBar)

Vue.config.productionTip = false

// 封装中间件函数插件
const directiveObj = {
  install (Vue) {
    Vue.directive('fofo', {
      inserted (el) {
        // 指令所在van-search组件
        // 组件根标签是div，input在内部
        // 以上都是原生标签对象
        // console.log(el)
        // el.focus()
        const theInput = el.querySelector('input')
        theInput.focus()
      }
    })
  }
}
// 执行目标对象里面的install方法并传入Vue类
Vue.use(directiveObj)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
