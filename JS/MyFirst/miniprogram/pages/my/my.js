// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_img: '../../images/user-unlogin.png',
    username: "NULL",
    nickName:'NULL',
    myid: '999'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // console.log(res)
              console.log(this);
              
              this.setData({                
                user_img: res.userInfo.avatarUrl,
                userInfo: res.userInfo,
                nickName: res.userInfo.nickName
                // openid: res.userInfo.openid
              })
            }
          })
        }        
          
      }
    })

  },
  onGetUserInfo(e){
    console.log(e);
    this.setData({
      username: "ZJ",
      nickName: e.detail.userInfo.nickName,
      user_img: e.detail.userInfo.avatarUrl
    })
    
  }
})