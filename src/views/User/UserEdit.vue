<template>
  <div class="user-edit-container">
    <!-- Header 区域 -->
    <van-nav-bar
      title="编辑资料"
      left-arrow
      @click-left="$router.back()"
      fixed
    />

    <!-- 用户资料 -->
    <van-cell-group class="action-card">
      <van-cell title="头像" is-link center>
        <template #default>
          <van-image
            round
            class="avatar"
            :src="profileObj.photo"
            @click="imageClickFn"
          />
          <!-- file 选择框 -->
          <!-- v-show视觉上隐藏，标签还在DOM树上，还可以触发功能 -->
          <input
            type="file"
            ref="iptFile"
            v-show="false"
            accept="image/*"
            @change="onFileChange"
          />
        </template>
      </van-cell>
      <van-cell
        title="名称"
        is-link
        :value="profileObj.name"
        @click="nameClickFn"
      />
      <van-cell title="生日" is-link :value="profileObj.birthday" />
    </van-cell-group>

    <!-- 姓名修改弹窗 -->
    <van-dialog
      v-model="show"
      title="标题"
      show-cancel-button
      :before-close="beforeCloseFn"
    >
      <input type="text" v-fofo v-model="inputUserName" />
    </van-dialog>
  </div>
</template>

<script>
import { userProfileAPI, updateUserPhotoAPI } from '@/api'
import { Notify } from 'vant'
export default {
  name: 'UserEdit',
  data () {
    return {
      profileObj: {}, // 用户基本资料
      show: false, // 控制姓名修改输入框出现/隐藏
      inputUserName: '' // 修改名字-弹出框绑定值
    }
  },
  async created () {
    const res = await userProfileAPI()
    console.log(res)
    this.profileObj = res.data.data
  },
  methods: {
    // 文件选择改变 - 事件
    async onFileChange (e) {
      if (e.target.files.length === 0) return // 用户可能没有选择图片文件阻止代码往下
      console.log(e.target.files[0]) // （用户选中的文件对象）数组其实是一个特殊的对象
      // 创建FormData对象
      const theFd = new FormData()
      theFd.append('photo', e.target.files[0]) // 请求体里加入一对参数名和值

      const res = await updateUserPhotoAPI(theFd)
      console.log(res)
      this.profileObj.photo = res.data.data.photo
    },
    // 图片 - 点击事件
    imageClickFn () {
      this.$refs.iptFile.click() // JS模拟标签的事件触发
    },
    // 姓名 - 点击事件
    nameClickFn () {
      this.show = true
      this.inputUserName = this.profileObj.name
    },
    // 姓名 - 确认框 - 关闭前回调函数
    beforeCloseFn (action, done) {
      // console.log(action)
      if (action === 'confirm') {
        // 点确认
        const reg = /^[a-zA-Z0-9\u4e00-\u9fa5]{1,7}$/
        if (reg.test(this.inputUserName) === true) {
          // 通过了校验
          done()
        } else {
          // 没通过校验，给用户提示
          Notify({ type: 'warning', message: '用户名只能是1-7位中英数字组合' })
          done(false)
        }
      } else {
        // 点取消
        done() // 让弹窗关闭
      }
    }
  }
}
</script>

<style lang="less" scoped>
.user-edit-container {
  padding-top: 46px;
  .avatar {
    width: 50px;
    height: 50px;
  }
}

// /deep/=::v-deep
/deep/.van-dialog__content {
  text-align: center;
  input {
    padding: 0;
    outline: none;
    border: none;
    text-align: center;
  }
}
</style>
