var Data = require('../../data/data.js');
Page({
  data: {
    weeklyMovieList: Data.pictureList1,
    count: 123,
    score: 68,
    fanqie: false,
    unlock: true,
    lock: false
  },
  onLoad: function (options) {
    var that=this;
    wx.request({
      url: 'https://zhishi.kermi.xyz/unlock_id.php',
      data: {
        openid: wx.getStorageSync('openid')
      },
      header: {
        "content-type": "application/x-www-form-urlencoded" // 默认值
      },
      method: "POST",
      success: function (obj) {
        console.log(obj.data[0].pic_id[0])
        for (var index in Data.pictureList1) {
          for (var i in obj.data[0].pic_id) {
            if (parseInt(Data.pictureList1[index].pictureId) == parseInt(obj.data[0].pic_id[i]) ) {                 
              Data.pictureList1[index].unlock = false;
              Data.pictureList1[index].lock = true;    
              console.log(Data.pictureList1)
            }
          that.setData({
            weeklyMovieList: Data.pictureList1,
          })
          }
        }
      }
    })
  },
  cancel: function () {
    this.setData({
      fanqie: false
    })
  },
  return:function(){
    wx.redirectTo({//关闭当前页，跳到不相干的页面，没有返回
      url: '../index/index'
    })
  },
  go: function () {
    wx.redirectTo({//关闭当前页，跳到不相干的页面，没有返回
      url: '../unlockmusic/unlockmusic'
    })
  },
  locking: function (event) {
    var imgId = event.currentTarget.dataset.imgid;
    var postData = Data.pictureList1[imgId-1];
    console.log(postData)
    if (parseInt(wx.getStorageSync('all_num')) >= parseInt(postData.num)) {
      console.log(wx.getStorageSync('all_num'));
      wx.request({
        url: 'https://zhishi.kermi.xyz/unlock_1.php',
        data: {
          openid: wx.getStorageSync('openid'),
          picture_id: postData.pictureId
        },
        header: {
          "content-type": "application/x-www-form-urlencoded" // 默认值
        },
        method: "POST",
        success: function (obj) {
          wx.setStorageSync('all_num', obj.data);
        }
      })
      Data.pictureList1[imgId - 1].unlock = false;
      Data.pictureList1[imgId - 1].lock = true;
      //  console.log(Data.musicList1);                   
      this.setData({
        weeklyMovieList: Data.pictureList1,
      })
    } else {
      this.setData({
        fanqie: true
      })
    }}
})
