//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // console.log(res.code);
          if (res.code) {
            //发起网络请求
            wx.request({
              url: 'https://zhishi.kermi.xyz/small.php',
              data: {
                code: res.code
              },
              header: {
                "content-type": "application/x-www-form-urlencoded" // 默认值
              },
              method:"POST",
              success:function(res){
                console.log(res.data)
                wx.setStorageSync('openid', res.data);
              },
              fail:function(){ 
                console.log("发送失败");
              }
            })
          } else {
            console.log('获取用户登录态失败！' + res.errMsg)
          }
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    wx.request({
      url: 'https://zhishi.kermi.xyz/statistics1.php',
      data: {
        openid: wx.getStorageSync('openid')
      },
      header: {
        "content-type": "application/x-www-form-urlencoded" // 默认值
      },
      method: "POST",
      success: function (obj) {
        wx.setStorageSync('all_num', obj.data[1].alls);
      }
    })


    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})