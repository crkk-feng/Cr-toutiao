// 此文件封装三个方法->专门用于操作token
// 封装目的：代码分层，更方便快捷，修改方便
const key = 'cr-toutiao'

// 设置
export const setToken = (token) => {
  localStorage.setItem(key, token)
}

// 获取
export const getToken = () => localStorage.getItem(key)

// 删除
export const removeToken = () => {
  localStorage.removeItem(key)
}
