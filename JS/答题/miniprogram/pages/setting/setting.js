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
    switch_time: '',
    questionsXipai: true,
    optionsXipai: true,
    autoNext:false


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      danxuanSum:app.globalData.danxuanSum,
      duoxuanSum:app.globalData.duoxuanSum,
      panduanSum:app.globalData.panduanSum,
      switch_time:app.globalData.switch_time,
      questionsXipai: app.globalData.questionsXipai,
      optionsXipai: app.globalData.optionsXipai
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
      app.globalData.questionsXipai = this.data.questionsXipai
      app.globalData.optionsXipai = this.data.optionsXipai
      app.globalData.autoNext = this.data.autoNext
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
  switch_timeInput(e){
    this.setData({
      switch_time: e.detail.value
    })
    app.globalData.switch_time = this.data.switch_time
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

    questionsXipaiChange(e){
      // console.log(e);   
      // app.globalData.questionsXipai = e.detail.value   
      this.setData({
        questionsXipai: !this.data.questionsXipai
      })
      // console.log(app.globalData.questionsXipai);

    },
    optionsXipaiChange(e){
      // app.globalData.optionsXipai = e.detail.value
      this.setData({
        optionsXipai: !this.data.optionsXipai
      })
      

    },
    autoNextChange(e){
      this.setData({
        autoNext: !this.data.autoNext
      })
    },
    
  
})