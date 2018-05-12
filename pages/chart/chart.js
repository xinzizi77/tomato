var wxCharts = require('../../utils/wxcharts.js');
var app = getApp();
var pieChart = null;
var columnChart = null;
var chartData = {
  main: {
    data: [12, 16, 14, 13,10,11,13],
    categories: ['5月6日', '7', '8', '9','10','11','12']
  },
  sub: [{
    title: '5月6日完成',
    data: [2, 5, 2, 3],
    categories: ['看书', '工作', '学习', '运动']
  }, {
      title: '5月7日完成',
    data: [3, 4, 7, 2],
    categories: ['阅读', '运动', '喝水', '休息']
  }, {
      title: '5月8日完成',
      data: [3, 4, 7, 2],
      categories: ['阅读', '运动', '喝水', '休息']
  }, {
      title: '5月8日完成',
      data: [3, 4, 7, 2],
      categories: ['阅读', '运动', '喝水', '休息']
  }, {
    title: '5月9日完成',
    data: [3, 4, 7, 2],
    categories: ['阅读', '运动', '喝水', '休息']
  }, {
    title: '5月10日完成',
    data: [3, 4, 7, 2],
    categories: ['阅读', '运动', '喝水', '休息']
  }, {
    title: '5月11日完成',
    data: [3, 4, 7, 2],
    categories: ['阅读', '运动', '喝水', '休息']
  }, {
    title: '5月12日完成',
    data: [3, 4, 7, 2],
    categories: ['阅读', '运动', '喝水', '休息']
  }]
};
Page({
  data: {
    isMainChartDisplay: true
  },
  backToMainChart: function () {
    this.setData({
      chartTitle: chartData.main.title,
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
        chartTitle: chartData.sub[index].title,
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
  },
  touchHandler: function (e) {
    console.log(pieChart.getCurrentDataIndex(e));
  },
  onLoad: function (e) {
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }

    pieChart = new wxCharts({
      animation: true,
      canvasId: 'pieCanvas',
      type: 'pie',
      series: [{
        name: '阅读',
        data: 15,
      }, {
        name: '运动',
        data: 10,
      }, {
        name: '休息',
        data: 20,
      }, {
        name: '工作',
        data: 40,
      }],
      width: windowWidth,
      height: 300,
      dataLabel: true,
    });
  }
});