import Vue from 'vue'
import { NavBar, Form, Field, Button, Tabbar, TabbarItem, Icon, Tab, Tabs, Cell, List, PullRefresh, ActionSheet, Popup, Row, Col, Badge, Search, Image as VanImage, Divider, Tag, CellGroup, Image, Dialog, DatetimePicker, Loading, Lazyload } from 'vant'

Vue.use(Lazyload, {
  preLoad: 0.8, // 屏幕高度百分比0-1，预加载范围
  error: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.sccnn.com%2Fbimg%2F338%2F55250.jpg&refer=http%3A%2F%2Fimg.sccnn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1657035364&t=b787da7ed37e7f379163b13f8b27eda1' // 懒加载图片失败，使用错误提示图片
})

Vue.use(Loading)

// Vue.directive('highlight', function (el) { // 自定义一个代码高亮指令
//   const highlight = el.querySelectorAll('pre, code') // 获取里面所有pre或者code标签
//   highlight.forEach((block) => {
//     hljs.highlightElement(block) // 突出显示这些标签(以及内部代码, 会自动识别语言)
//   })
// })

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
