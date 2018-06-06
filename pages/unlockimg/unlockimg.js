var Data = require('../../data/data.js');
Page({
  data: {
    weeklyMovieList: Data.pictureList1,
    count: 123,
    score: 68
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
  }
})