// pages/setting/setting.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    modalName: '',
    danxuanSum: '',
    duoxuanSum: '',
    panduanSum: '',


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      danxuanSum:app.globalData.danxuanSum,
      duoxuanSum:app.globalData.duoxuanSum,
      panduanSum:app.globalData.panduanSum
    })

  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
    
  },
  hideModal(e) {
    // console.log(this.data.modalName);
    if(this.data.modalName == 'DialogModal1'){
      if(this.data.danxuanSum == ''){app.globalData.danxuanSum = 35}else{app.globalData.danxuanSum = this.data.danxuanSum}
      if(this.data.duoxuanSum == ''){app.globalData.duoxuanSum = 30}else{app.globalData.duoxuanSum = this.data.duoxuanSum}
      if(this.data.panduanSum == ''){app.globalData.panduanSum = 35}else{app.globalData.panduanSum = this.data.panduanSum}
    }
    this.setData({
      modalName: null
    })
  },
  danxuanInput(e){
    if(e.detail.value > 100){
      this.setData({
        danxuanSum: 35,
      })
    }else{
      this.setData({
        danxuanSum: parseInt(e.detail.value),
      })
    }

    app.globalData.danxuanSum = this.data.danxuanSum
    // console.log(app.globalData.danxuanSum);

  },
  duoxuanInput(e){
    // console.log(e);
    
    if(e.detail.value > 80){
      this.setData({
        duoxuanSum: 30,
      })
    }else{
      this.setData({
        duoxuanSum: parseInt(e.detail.value),
      })
    }
    app.globalData.duoxuanSum = this.data.duoxuanSum

  },
  panduanInput(e){
    if(e.detail.value > 100){
      this.setData({
        panduanSum: 35,
      })
    }else{
      this.setData({
        panduanSum: parseInt(e.detail.value),
      })
    }
    app.globalData.panduanSum = this.data.panduanSum

  },
  logout() {
    // wx.removeStorageSync('cookie');
    wx.clearStorage({
      success: (res) => {},
    })
    app.globalData.logged = false;
    app.globalData.userInfo = {};
    app.globalData.jsmember = false
    wx.reLaunch({
      url: '../me/me',
    })
    },
    
  
})