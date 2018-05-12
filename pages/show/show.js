var app = getApp()
var interval;
var varName;
var cutTime;
var ctx = wx.createCanvasContext('canvasArcCir');
function countdown(that, total_micro_second) {
   console.log('剩余时间：' + total_micro_second);
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

Page({
  data: {
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
    clearInterval(varName);
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
    var step = 1, startAngle = 1.5 * Math.PI, endAngle = 0;
    var animation_interval = 1000, n = 81;
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
    clearInterval(cutTime);
    var total_micro_second = 80;    
    var downTime=function(){
      if (total_micro_second>=0){
        countdown(that, total_micro_second);
        total_micro_second = total_micro_second-1;
        console.log(total_micro_second);
      } else { 
        clearInterval(cutTime)};
    };
    cutTime = setInterval(downTime,1000);
  }
})