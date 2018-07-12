var wxCharts = require('../../utils/wxcharts.js');
var app = getApp();
var pieChart = null;
var columnChart = null;
var myDate = new Date();
var chartData;
Page({
  data: {
    isMainChartDisplay: true,
    date:myDate.toLocaleDateString()
  },
  backToMainChart: function () {
    console.log(wx.getStorageSync('chartData'))                                                                  
    this.setData({
      isMainChartDisplay: true
    });
    columnChart.updateData({
      categories: chartData.main.categories,
      series: [{
        name: '番茄量',
        data: chartData.main.data,
        format: function (val, name) {
          return val + '个';
        }
      }]
    });
  }, 
  touchHandler2: function (e) {
    var index = columnChart.getCurrentDataIndex(e);
    if (index > -1 && index < chartData.sub.length && this.data.isMainChartDisplay) {
      this.setData({
        isMainChartDisplay: false
      });
      columnChart.updateData({
        categories: chartData.sub[index].categories,
        series: [{
          name: '番茄量',
          data: chartData.sub[index].data,
          format: function (val, name) {
            return val + '个';
          }
        }]
      });

    }
  },
  onReady: function (e) {
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }


    //获取柱形图数据
    wx.request({
      url: 'https://zhishi.kermi.xyz/statistics3.php',
      data: {
        openid: wx.getStorageSync('openid')
      },
      header: {
        "content-type": "application/x-www-form-urlencoded" // 默认值
      },
      method: "POST",
      success: function (obj) {
        console.log(obj);
        console.log(obj.data.sub)
        chartData={
          main:{
            data: obj.data.main.data,
            categories: obj.data.main.categories
          },
          sub: obj.data.sub
        },
          columnChart = new wxCharts({
          canvasId: 'columnCanvas',
          type: 'column',
          animation: true,
          categories: chartData.main.categories,
          series: [{
            name: '番茄量',
            data: chartData.main.data,
            format: function (val, name) {
              return val + '个';
            }
          }],
          yAxis: {
            format: function (val) {
              return val;
            },
            min: 0
          },
          xAxis: {
            disableGrid: false,
            type: 'calibration'
          },
          extra: {
            column: {
              width: 15
            }
          },
          width: windowWidth,
          height: 200,
        });
      }
    }) 

  },
  touchHandler: function (e) {
    console.log(pieChart.getCurrentDataIndex(e));
  },
  onLoad: function (e) {
    var that = this;
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }
    //今日数、周数、总数获取
    wx.request({
      url: 'https://zhishi.kermi.xyz/statistics1.php',
      data:{
        openid: wx.getStorageSync('openid')        
      },
      header: {
        "content-type": "application/x-www-form-urlencoded" // 默认值
      },
      method: "POST",
      success:function(obj){
        wx.setStorageSync('all_num', obj.data[1].alls);
        // console.log(obj);
        that.setData({
          today_num: obj.data[0].today,
          count_num: obj.data[1].alls,
          week_num:obj.data[2].weekly,
          ava_num: parseInt(obj.data[2].weekly / 7) 
        })
      }
    })

    //饼形图的数据获取
    wx.request({
      url: 'https://zhishi.kermi.xyz/statistics2.php',
      data: {
        openid: wx.getStorageSync('openid')
      },
      header: {
        "content-type": "application/x-www-form-urlencoded" // 默认值
      },
      method: "POST",
      success: function (obj) {
        // console.log(obj.data);
        // console.log(typeof arry);
        pieChart = new wxCharts({
          animation: true,
          canvasId: 'pieCanvas',
          type: 'pie',
          series:obj.data,
          width: windowWidth,
          height: 300,
          dataLabel: true,
        });
      }
    })           
  }
});