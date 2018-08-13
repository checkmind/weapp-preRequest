/**
 * 一个简单的预请求实现
 * 首先在 app 全局 globalData 建立 两个空对象 pagesEvent  和 preData ，并引入该脚本
 * 跳转路由时使用 gotoRouter ,只支持绝对路径
 * 在预加载页面重写 app.globalData.pagesEvent[pageName] pageName 为绝对路径，函数参数为路由参数 健值对
 * 在预加载页面onLoad 事件通过 app.globalData.preData[pageName] 获取事件返回结
 */

// 页面 page 对象
//app.globalData.pagesEvent

let bus = {
    gotoRouter(url) {
        const app = getApp()
        wx.navigateTo({
            url
        })
        let routerName = url
        // 执行对应页面预加载钩子
        let data = app.globalData.pagesEvent[routerName](bus.url2Obj(url.split('?')[1]))
        app.globalData.preData[routerName] = data
    },
    url2Obj(query) {
        var reg = /([^=&\s]+)[=\s]*([^&\s]*)/g
        var obj = {}
        while (reg.exec(query)) {
            obj[RegExp.$1] = RegExp.$2
        }
        return obj
    }
}

module.exports = bus