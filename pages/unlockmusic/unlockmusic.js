var Data = require('../../data/data.js');
Page({
  onReady: function (e) {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext('myAudio')
  },
  data: {
    music_key: Data.musicList1
  },
  onMusicTap: function (event) {
    var musicId = event.currentTarget.dataset.musicid;
    var postData = Data.musicList[musicId];
    this.setData({
      src: postData.url
    });
    this.audioCtx = wx.createAudioContext('myAudio');
    this.audioCtx.play();
  },
  onMusicTap1:function(event){
    this.setData({
      src: "http://193.112.31.67/music/%E9%AB%98%E5%B1%B1%E6%B5%81%E6%B0%B4.mp3"
    });
    this.audioCtx = wx.createAudioContext('myAudio');
    this.audioCtx.play();    
  },
  return: function () {
    wx.redirectTo({//关闭当前页，跳到不相干的页面，没有返回
      url: '../index/index'
    })
  }
})
