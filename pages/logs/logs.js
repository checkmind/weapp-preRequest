//logs.js
const util = require('../../utils/util.js')
// js 会直接执行
// setInterval(()=>{
//   console.log('log 页面打印')
// },2000 )

const app = getApp()

const pageName = '/pages/logs/logs'

app.globalData.pagesEvent[pageName] = function() {
  console.log('执行请求')
  return new Promise((resolve)=>{
    setTimeout(()=>{
      console.log('请求返回')
      resolve && resolve({name:'duhao'})
    },3000)
  })
}
Page({
  data: {
    logs: []
  },
  onLoad: async function () {
    console.log(new Date() - wx.timer)
    let data = await app.globalData.preData[pageName]
    console.log(data)
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  }
})
