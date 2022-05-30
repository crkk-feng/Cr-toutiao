<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import { getAllChannelsAPI } from '@/api'
// try+catch来捕获await同步代码的错误
export default {
  async created () {
    try {
      const res = await getAllChannelsAPI()
      console.log(res)
    } catch (err) {
      // err参数拿到的就是错误对象
      // 给用户来个弹窗提示-程序出错了
      // console.dir()详细打印
      console.dir(err)
      // console.log(err)
    }
  }
}
</script>
<style>

</style>
