// pages/me/me.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: '../../pages/login/user-unlogin.png',
    userInfo: {},
    nickName: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  
  onLoad: function (options) {
    this.setData({
      userInfo: app.globalData.userInfo,
      nickName: app.globalData.userInfo.nickName,
      avatarUrl: app.globalData.userInfo.avatarUrl
    })
  },
  onGetUserInfo(e){
    // console.log(e);
    
    if(e.detail.errMsg != 'getUserInfo:fail auth deny'){
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        nickName: e.detail.userInfo.nickName,
        avatarUrl: e.detail.userInfo.avatarUrl
      })
      wx.cloud.callFunction({
        name: "adduser",
        data: e.detail.userInfo
      }).then(res=>{
        console.log(res);
      })   
      wx.cloud.callFunction({
        name: "judgeuser",      
      }).then(res=>{
        console.log(res);
        app.globalData.jsmember = res.result.jsmember   
        console.log(app.globalData.jsmember);        
      })    
    }   
    
    
  },
  
  
})