var Data = require('../../data/data.js');
Page({
  onReady: function (e) {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext('myAudio')
  },
  data: {
    music_key:Data.musicList1,
    fanqie:false,
    unlock:true,
    lock:false
  },
  onLoad: function (options) {
    var that = this;
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
        for (var index in Data.musicList1) {
          for (var i in obj.data[1].music_id) {
            if (parseInt(Data.pictureList1[index].pictureId) == parseInt(obj.data[1].music_id[i])) {
              Data.musicList1[index].unlock = false;
              Data.musicList1[index].lock = true;
              // console.log(Data.pictureList1)
            }
            that.setData({
              music_key: Data.musicList1,
            })
          }
        }
      }
    })
  },
  onMusicTap: function (event) {
    var musicId = event.currentTarget.dataset.musicid;
    var postData =Data.musicList[musicId];
    // console.log(postData);    
    this.setData({
      src: postData.url
    });
    this.audioCtx = wx.createAudioContext('myAudio');
    this.audioCtx.play();
  },
  cancel:function(){
    this.setData({
      fanqie:false
    })
  },
  locking: function (event){
    var musicId = event.currentTarget.dataset.musicid;
    var postData =Data.musicList[musicId];
    console.log(wx.getStorageSync('all_num'))
    if (parseInt(wx.getStorageSync('all_num')) >= parseInt(postData.num) ){
      wx.request({
        url: 'https://zhishi.kermi.xyz/unlock_1.php',
        data:{
          openid: wx.getStorageSync('openid'),
          music_id: postData.musicId
        },
        header: {
          "content-type": "application/x-www-form-urlencoded" // 默认值
        },
        method: "POST",
        success: function (obj) {
          wx.setStorageSync('all_num', obj.data);
          console.log(wx.getStorageSync('all_num'));
        }
      })
     Data.musicList1[musicId-1].unlock=false;
     Data.musicList1[musicId-1].lock=true;
    //  console.log(Data.musicList1);                   
          this.setData({
            music_key:Data.musicList1,            
          })
    }else{
      this.setData({
        fanqie: true
      })
    }
    // console.log(postData);
  },
  onMusicTap1:function(event){
    this.setData({
      src: "http://193.112.31.67/music/music1.mp3"
    });
    this.audioCtx = wx.createAudioContext('myAudio');
    this.audioCtx.play();    
  },
  return: function () {
    wx.redirectTo({//关闭当前页，跳到不相干的页面，没有返回
      url: '../index/index'
    })
  },
  go: function () {
    wx.redirectTo({//关闭当前页，跳到不相干的页面，没有返回
      url: '../unlockimg/unlockimg'
    })
  }
})
