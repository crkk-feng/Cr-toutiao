<template>
  <div>
    <van-nav-bar title="Cr头条-登录" />
    <van-form @submit="onSubmit">
      <van-field
        v-model="formLogin.mobile"
        type="tel"
        label="手机号"
        placeholder="请输入手机号"
        required
        :rules="[
          {
            required: true,
            message: '请填写手机号',
            trigger: 'onChange',
            pattern: /^1[3-9]\d{9}$/,
          },
        ]"
      />
      <van-field
        v-model="formLogin.code"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
        :rules="[
          {
            required: true,
            message: '请填写密码',
            trigger: 'onChange',
            pattern: /^\d{6}$/,
          },
        ]"
      />
      <div style="margin: 16px">
        <van-button
          block
          type="info"
          native-type="submit"
          :loading="isLoading"
          :disabled="isLoading"
          loading-text="正在登录ing"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { Notify } from 'vant'
import { loginAPI } from '@/api'
import { setToken } from '@/utils/token.js'
export default {
  name: 'Login',
  data () {
    return {
      formLogin: {
        mobile: '13888888888',
        code: '246810' // 默认只能用246810后台规定了
      },
      isLoading: false // 登录按钮-加载状态
    }
  },
  methods: {
    async onSubmit () {
      // 状态设置true
      this.isLoading = true

      try {
        const res = await loginAPI(this.formLogin)
        console.log(res)
        // const { token, refresh_token } = res.data.data
        // console.log(token)
        // console.log(refresh_token)
        Notify({ type: 'success', message: '登录成功啦！！！' })
        setToken(res.data.data.token)
        // 跳转一定要写在最后->尽量延迟操作
        // location.href -〉当前浏览器地址和要跳转的地址一样(不包含#后面锚点信息)-〉不会刷新网页
        // 地址改变，就会导致网页刷新
        // location.href = 'http://localhost:8081/a/b/c/#/layout/home'
        // this.$prouter.push()压栈(会产生历史记录，可以回退),this.$router.replace()替换(不会产生历史记录)
        this.$router.replace({
          path: '/layout/home' // 因为我们路由规则里/layout里没有重定向，所以直接在这里写全
        })
      } catch (err) {
        console.error(err)
        Notify({ type: 'warning', message: '手机号或密码错误' })
      }

      this.isLoading = false // 网络请求完成后，把状态关闭
    }
  }
}
</script>

<style scoped lang="less">
/* 此类名是van-nav-bar组件内根标签 */
// .van-nav-bar{
//    background: #007bff;
// }
/* 此选择器名字是van-nav-bar组件内标签
scoped尝试把此选择器后属性选择器匹配当前页
面标签（选不中组件内部的) */
// lang="less"当前style标签内是less语法
// 用/deep/就不会被vscode标记红线
// /deep/会把属性选择器加到前面(用后代选择器的方式往里找匹配的类名)
// /deep/ .van-nav-bar__title{
//     color: white;
// }
</style>
