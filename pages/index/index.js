var inter_content;
var content_id;
Page({
  data: {
    selectPerson: true,
    selectArea: false,
    show: false,
    name: "",
    time: ""
  },
  //点击选择类型
  inputname: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  inputtime: function (e) {
    this.setData({
      time: e.detail.value
    })
  },
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
  lock: function () {
    wx.navigateTo({//关闭当前页，跳到不相干的页面，没有返回
      url: '../unlockimg/unlockimg'
    })
  },
  chart: function () {
    wx.navigateTo({//关闭当前页，跳到不相干的页面，没有返回
      url: '../chart/chart'
    })
  },
  skip: function (event) {
    var contentid = event.currentTarget.dataset.contentid;
    wx.redirectTo({//关闭当前页，跳到不相干的页面，没有返回
      url: '../show/show?id=' + contentid
    })
  },
  tianjia: function (e) {
    this.setData({
      show: true
    })
  },

  //新建任务连接
  save: function (e) {
    var that = this;
    // console.log(this.data.name);
    // console.log(this.data.time);
    wx.request({
      url: 'https://zhishi.kermi.xyz/add.php',
      data: {
        openid: wx.getStorageSync('openid'),
        name: this.data.name,
        time: parseInt(this.data.time)
      },
      header: {
        "content-type": "application/x-www-form-urlencoded" // 默认值
      },
      method: "POST",
      success: function (obj) {
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
            that.setData({
              content: obj.data
            })
          }
        })
      }
    })
    this.setData({
      show: false
    })
  },
  cancel: function () {
    this.setData({
      show: false
    })
  },

  //删除任务获取id
  del: function (event) {
    var postData;
    var contentid = event.currentTarget.dataset.contentid;
    for (var index in inter_content.data){
      if (inter_content.data[index].id == contentid) {
        console.log(inter_content.data[index].id)
        postData = inter_content.data[index];
      }
    }
    content_id = postData.id;
    this.setData({
      del: true
    })
  },

  //删除任务时的链接
  del_button: function () {
    // console.log(content_id);
    var that=this;
    wx.request({
      url: 'https://zhishi.kermi.xyz/add.php',
      data: {
        openid: wx.getStorageSync('openid'),
        id: content_id

      },
      header: {
        "content-type": "application/x-www-form-urlencoded" // 默认值
      },
      method: "POST",
      success: function (obj) {
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
            // console.log(obj);
            inter_content = obj;
            that.setData({
              content: obj.data
            })
          }
        })
      }
    })
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
    var that = this;
    // 页面初始化 options为页面跳转所带来的参数
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
        // console.log(obj);
        inter_content = obj;        
        that.setData({
          content: obj.data
        })
      }
    })
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