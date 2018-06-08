var Data = require('../../data/data.js');
var app = getApp()
var interval;
var varName;
var cutTime;
var inter_content;
var postData;
var ctx = wx.createCanvasContext('canvasArcCir');
var total_micro_second;    //设置倒计时
var step = 1, startAngle = 1.5 * Math.PI, endAngle = 0;
var animation_interval = 1000;
var n;

var musicLock=[];
var animation = function () {
  if (step <= n) {
    endAngle = step * 2 * Math.PI / n + 1.5 * Math.PI;
    drawArc(startAngle, endAngle);
    step++;
  } else {
    clearInterval(varName);
  }
}
function drawArc(s, e) {
  ctx.setFillStyle('rgba(0, 0, 0, 0.1)');
  ctx.clearRect(0, 0, 240, 240);
  ctx.draw();
  var x = 120, y = 120, radius = 116;
  ctx.setLineWidth(5);
  ctx.setStrokeStyle('#fff');
  ctx.setLineCap('round');
  ctx.beginPath();
  ctx.arc(x, y, radius, s, e, false);
  ctx.stroke()
  ctx.draw()
}
function countdown(that, total_micro_second) {
  //  console.log('剩余时间：' + total_micro_second);
    // 渲染倒计时时钟
    that.setData({
      clock: dateformat(total_micro_second)
    });
    if (total_micro_second <= 0) {
      that.setData({
         clock: "00:00"
      });
      //return;
    }
 }

 // 时间格式化输出，如11:03 25:19 每1s都会调用一次
 function dateformat(micro_second) {
    // 总秒数
    var second = Math.floor(micro_second / 1000);
    // 小时
    var hr = Math.floor(micro_second / 3600 % 24);
    // 分钟
    var min = Math.floor(micro_second / 60 % 60);
    // 秒
    var sec = Math.floor(micro_second % 60);
    if (hr<=0){
        if(min<10){
          if (sec<10){
            return '0' + min + ":0" + sec;                      
          }
          return  '0'+min + ":" + sec;          
        }else{
          if (sec < 10) {
            return min + ":0" + sec;
          }
        }
      return  min + ":" + sec;
    }else{
      if (min < 10) {
        if (sec < 10) {
          return '0' +hr + ":0"+ min + ":0" + sec;
        }
        return '0' +hr+":0" + min + ":" + sec;
      }else{
        if (sec < 10) {
          return '0' +hr + ":"+ min + ":0" + sec;
        }
        return '0' + hr + ":" + min + ":" + sec;              
      }
    }
 }

function draw(){
  clearInterval(varName);
  var animation = function () {
    if (step <= n) {
      endAngle = step * 2 * Math.PI / n + 1.5 * Math.PI;
      drawArc(startAngle, endAngle);
      step++;
    } else {
      clearInterval(varName);
    }
  };
  varName = setInterval(animation, animation_interval);
}

Page({
  data: {
    circle: false,
    stop:true,
    bg: 'http://193.112.31.67/images/bg1.jpg',
    picture_key: Data.pictureList,    
    music_key: Data.musicList,
    url:false,
    get_apple:false   
  },
  onReady: function () {
    //创建并返回绘图上下文context对象。
    var cxt_arc = wx.createCanvasContext('canvasCircle');
    cxt_arc.setLineWidth(6);
    cxt_arc.setStrokeStyle('rgba(0, 0, 0, 0.1)');
    cxt_arc.setLineCap('round');
    cxt_arc.beginPath();
    cxt_arc.arc(120, 120, 116, 0, 2 * Math.PI, false);
    cxt_arc.stroke();
    cxt_arc.draw();   
  },
  onLoad: function (options) {
    var that = this;
    var contentid = options.id;
    wx.request({
      url: 'https://zhishi.kermi.xyz/unlock.php',
      data: {
        openid: wx.getStorageSync('openid')
      },
      header: {
        "content-type": "application/x-www-form-urlencoded" // 默认值
      },
      method: "POST",
      success: function (obj) {

        console.log(obj)
        // var pictureLock = [];
        // pictureLock.push(Data.pictureList[0]);
        // console.log(typeof Data.pictureList[0])
        // for (var x = 1; x <= obj.data.picture_id.length; x++) {                              
        //     for(var index in Data.pictureList){
        //         if (parseInt(Data.pictureList[index].pictureId) == parseInt(obj.data.picture_id[x - 1]) ){
        //           pictureLock.push(Data.pictureList[index]);
        //         // console.log(pictureLock[x]);
        //         // console.log(Data.pictureList[index]);                                      
        //         // console.log(pictureLock);    
        //         break;            
        //       }
        //     }
        // }
        // console.log(pictureLock);
        // pictureLock[1]= Data.pictureList[1]
      }
    })

    wx.request({
      url: 'https://zhishi.kermi.xyz/home.php',
      data: {
        openid: wx.getStorageSync('openid')
      },
      header: {
        "content-type": "application/x-www-form-urlencoded" // 默认值
      },
      method: "POST",
      success: function (obj) {
        inter_content = obj;
      for (var index in inter_content.data) {
      if (inter_content.data[index].id == contentid) {
        postData = inter_content.data[index];
      }
    }
      that.setData({
        content: postData.content
      });
        total_micro_second = parseInt(postData.time)*60; 
        n = total_micro_second+1;

        draw();
        clearInterval(cutTime);
        var downTime = function () {
          if (total_micro_second >= 0) {
            countdown(that, total_micro_second);
            total_micro_second = total_micro_second - 1;
          } else {
            clearInterval(cutTime);
            wx.request({
              url: 'https://zhishi.kermi.xyz/add_apple.php',
              data: {
                openid: wx.getStorageSync('openid'),
                type: postData.content
              },
              header: {
                "content-type": "application/x-www-form-urlencoded" // 默认值
              },
              method: "POST",
              success: function (obj) {
                var all = wx.getStorageSync('all_num');
                wx.setStorageSync('all_num', parseInt(all)+1);
                that.setData({
                  get_apple:true
                });
              }
            })
          };
        }
        cutTime = setInterval(downTime, 1000);
      }
    })
  },
  onTap:function(event){
    this.setData({
      circle: true,    
      music:true,
    });
  },
  picture:function(){
    this.setData({
      circle: true,
      picture: true,
    });
  },
  onPicture:function(){
    this.setData({
      circle: false,
      picture: false,
    })
  },
  picture_box:function(){
    this.setData({
      circle: true,
      picture: true,
    })
  },
  audioPlay: function (event) {
    console.log(this);
    this.audioCtx.play()
  },
  music:function(event){
    this.setData({
      circle: false,    
      music: false,
    })
  },
  music_box:function(){
    this.setData({
      circle: true,    
      music: true,
    })
  },
  onPlay:function(){
    var that = this; 
    var downTime = function () {
      if (total_micro_second > 0) {
        countdown(that, total_micro_second);
        total_micro_second = total_micro_second - 1;
      } else {
        clearInterval(cutTime)
      };
    }       
    varName = setInterval(animation, animation_interval);
    cutTime = setInterval(downTime, 1000);
    this.setData({
      play:false,
      stop:true
    })
  },
  onStop:function(option){
    clearInterval(varName);
    clearInterval(cutTime);
    this.setData({
      play: true,
      stop: false
    })
  },
  onReset:function(){
    step = 1; startAngle = 1.5 * Math.PI; endAngle = 0;
    animation_interval = 1000; n = total_micro_second+1;
    draw();
    total_micro_second = parseInt(postData.time) * 60;    
    // total_micro_second =10;
  }, 
  onPictureTap: function (event) {
    // currentTarget是指当前鼠标所选对象，dataset是指所有自定义属性的集合
    var pictureId = event.currentTarget.dataset.pictureid;
    var postData = Data.pictureList[pictureId];
    console.log(pictureId);
    this.setData({
      bg: postData.url
    })
  },
  onMusicTap:function(event){
    var musicId = event.currentTarget.dataset.musicid;
    var postData = Data.musicList[musicId];
    this.setData({
      src: postData.url
    });
    this.audioCtx = wx.createAudioContext('myAudio');
    this.audioCtx.play();
    console.log(event);    
  },
  MusicStop:function(){
    this.setData({
      src: false
    });
  },
  onSkip:function(){
    this.setData({
      circle: true,
      skip: true,
    })
  },
  back:function(){
    this.setData({
      circle: false,
      skip: false,
    })
  },
  back_box:function(){
    this.setData({
      circle: true,
      skip: true,
    })
  },
  true:function(){
    wx.redirectTo({//关闭当前页，跳到不相干的页面，没有返回
      url: '../index/index'
    })
  },
  cancel:function(){
    this.setData({
      circle: false,
      skip: false,
    })
  },
  cancel1:function(){
    wx.navigateTo({//关闭当前页，跳到不相干的页面，没有返回
      url: '../index/index'
    })
  }
})