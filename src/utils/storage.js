// 封装本地存储的方式
// 整个项目使用localStorage,sessionStorage,还是cookie
// 只需要改变这里即可
// 封装：为了统一管理，方便以后替换和修改
export const setStorage = (key, value) => {
  localStorage.setItem(key, value)
}

export const getStorage = (key) => {
  return localStorage.getItem(key)
}

export const removeStorage = (key) => {
  localStorage.removeItem(key)
}
