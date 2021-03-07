// pages/usermanage/usermanage.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: '../../pages/login/user-unlogin.png',
    userInfo: {},
    nickName: '',
    gender: 0,
    userGroup: []


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
      name: 'getuser'
    }).then(res=>{
      this.setData({
        userGroup: res.result.data
      })
      console.log(res);
    })

  },

  MemberChange(e){
    // console.log(e);
    app.globalData.jsmember = e.detail.value
    wx.cloud.callFunction({
      name: 'updateuser',
      data:{
        id: e.currentTarget.dataset.id,
        jsmember: e.detail.value
      }
    }).then(res=>{
      console.log(res);
    })
  },
  
 
})