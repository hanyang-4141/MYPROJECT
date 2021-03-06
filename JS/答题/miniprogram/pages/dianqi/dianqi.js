// pages//dianqi/dianqi.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // dianqi:true,
    nickName: '',
    avatarUrl: '../dati/user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    elements:[
      {
        title:'单选题',
        name:'danxuan',
        icon:'question',
        color:'blue'
      },
      {
        title: '多选题',
        name: 'duoxuan',
        icon: 'back',
        color: 'red'
      },
      {
        title: '判断题',
        name: 'panduan',
        icon: 'copy',
        color: 'cyan'
      },
      {
        title: '考试',
        name: 'kaoshi',
        icon: 'upstage',
        color: 'pink'
      },
      {
        title: '错题',
        name: 'cuoti',
        icon: 'bad',
        color: 'purple'
      },
      {
        title: '收藏',
        name: 'shoucang',
        icon: 'like',
        color: 'orange'
      },
    ]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    if(app.globalData.logged == false){
      wx.showModal({
        title: '提示',
        content: '请先登录！',
        showCancel: false,
        success (res) {
          wx.reLaunch({
            url: '../me/me',
          })
        }
      })      
    }
    this.setData({
      userInfo: app.globalData.userInfo,
      nickName:app.globalData.userInfo.nickName,
      avatarUrl:app.globalData.userInfo.avatarUrl
    })

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