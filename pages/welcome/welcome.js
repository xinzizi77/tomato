Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  onLoad: function () {
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        console.log(res)
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              wx.redirectTo({//关闭当前页，跳到不相干的页面，没有返回
                url: '../index/index'
              })
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
                    method: "POST",
                    success: function (res) {
                      console.log(res.data)
                      wx.setStorageSync('openid', res.data);
                    },
                    fail: function () {
                      console.log("发送失败");
                    }
                  })
                } else {
                  console.log('获取用户登录态失败！' + res.errMsg)
                }
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
              }
              // console.log(res.userInfo);
            }
          })
        }
      }
    })
  },
  bindGetUserInfo: function (e) {
    console.log(e.detail.userInfo)
    wx.redirectTo({//关闭当前页，跳到不相干的页面，没有返回
      url: '../index/index'
    })
  }
})