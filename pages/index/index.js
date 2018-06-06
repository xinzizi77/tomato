Page({
  data: {
    selectPerson: true,
    selectArea: false,
    show:false
  },
  //点击选择类型
  clickPerson: function () {
    var selectPerson = this.data.selectPerson;
    if (selectPerson == true) {
      this.setData({
        selectArea: true,
        selectPerson: false,
      })
    } else {
      this.setData({
        selectArea: false,
        selectPerson: true,
      })
    }
  },
  //点击切换
  wai:function(){
    console.log("aaaa");
  },
  lock:function(){
    wx.navigateTo({//关闭当前页，跳到不相干的页面，没有返回
      url: '../unlockimg/unlockimg'
    })
  },
  chart: function () {
    console.log("cccc");    
    wx.navigateTo({//关闭当前页，跳到不相干的页面，没有返回
      url: '../chart/chart'
    })
  },
  skip: function () {
    console.log("cccc");
    wx.redirectTo({//关闭当前页，跳到不相干的页面，没有返回
      url: '../show/show'
    })
  },
  tianjia: function (e) {
    this.setData({
      show: true
    })
  },
  save:function(){
    this.setData({
      show: false
    })
  },
  cancel:function(){
    this.setData({
      show: false
    })
  },
  del:function(){
    this.setData({
      del: true
    })
  },
  del_button:function(){
    this.setData({
      del: false
    })
  },
  cancel_button: function () {
    this.setData({
      del: false
    })
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})