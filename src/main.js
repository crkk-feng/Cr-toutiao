import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'
import { NavBar, Form, Field, Button, Tabbar, TabbarItem, Icon, Tab, Tabs, Cell, List, PullRefresh, ActionSheet, Popup, Row, Col, Badge, Search, Image as VanImage, Divider, Tag, CellGroup, Image, Dialog, DatetimePicker } from 'vant'

Vue.use(DatetimePicker)

Vue.use(Dialog)

Vue.use(Image)

Vue.use(CellGroup)
Vue.use(Tag)

Vue.use(Divider)

Vue.use(VanImage)

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
      // el代表指令所在标签
      // 指令所在标签，被插入到真实DOM时才触发，如果标签用display:none隐藏再出现，不会在触发inserted的
      inserted (el) {
        // 指令所在van-search组件
        // 组件根标签是div，input在内部
        // 以上都是原生标签对象
        // console.log(el)
        // el.focus()
        // 搜索界面 el是div
        // 文章评论 el是textarea
        // 以后el还可能是input
        // 知识点：原生的DOM.nodeName 拿到标签名字（注意：大写的字符串）
        if (el.nodeName === 'TEXTAREA' || el.nodeName === 'INPUT') {
          el.focus()
        } else {
          // el本身不是输入框，尝试获取一下
          setTimeout(() => {
            const theInput = el.querySelector('input')
            const theTextArea = el.querySelector('textarea')
            if (theInput) theInput.focus()
            if (theTextArea) theTextArea.focus()
          })
        }
      },
      update (el) { // 指令所在标签，被更新时触发
        if (el.nodeName === 'TEXTAREA' || el.nodeName === 'INPUT') {
          el.focus()
        } else {
          // el本身不是输入框，尝试获取一下
          setTimeout(() => {
            const theInput = el.querySelector('input')
            const theTextArea = el.querySelector('textarea')
            if (theInput) theInput.focus()
            if (theTextArea) theTextArea.focus()
          })
        }
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
