// pages/redianou/redianou.js
const gongju = require('../../utils/gongju')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    redianou_kind: ['K', 'T'],
    kind_index: 0,
    wendu:null,
    haofu: null,
  },
  clearinput(){
    this.setData({
      wendu:null,
      haofu:null
    })
  },
  input_haofu(e){    
    this.setData({
      haofu: e.detail.value
    })    
  },
  input_wendu(e){
    this.setData({
      wendu: e.detail.value
    }) 
  },
  calc_wendu(){
    // console.log(this.data.wendu);
    if(this.data.wendu == null || this.data.wendu == ''){
      // wx.showToast({
      //   title: '请输入温度值！',
      // })
      return
    }
    this.setData({
      haofu: gongju.TempToMV(this.data.wendu)
    })
    
  },
  calc_haofu(){
    if(this.data.haofu == null || this.data.haofu == ''){
      // wx.showToast({
      //   title: '请输入电阻值！',
      // })
      return
    }
    this.setData({
      wendu: gongju.MVToTemp(this.data.haofu)
    })
  },
  king_change(e){
    // console.log(e);
    this.setData({
      kind_index: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})