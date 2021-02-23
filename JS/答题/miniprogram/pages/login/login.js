// miniprogram/pages/index/index.js
const db = wx.cloud.database()
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userInfo: {},

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(!app.globalData.logged){
      console.log('no login');
    }

  },
  bindGetUserInfo(e){
    if(e.detail.errMsg != 'getUserInfo:fail auth deny'){
      app.globalData.userInfo = e.detail.userInfo
      // console.log(e.detail.userInfo);
      wx.cloud.callFunction({
        name: "adduser",
        data: e.detail.userInfo
      }).then(res=>{
        console.log(res);
      })
      wx.reLaunch({
        url: '/pages/index/index',
      })
    }else{
      wx.showModal({       
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: res=>{

        }
      })

    }   

    //     if (e.detail.errMsg!='getUserInfo:fail auth deny') {    
    //       app.isLogin();   
          // console.log(e);
          // app.globalData.userInfo = e.detail.userInfo
          // this.setData({
          //   userInfo: e.detail.userInfo
          // })
    //       wx.reLaunch({    
    //         url: '/pages/index/index'    
    //       })    
    //     } else {    
    //   console.log('jujue');
    //       wx.showModal({    
    //         title: '警告',    
    //         content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',    
    //         showCancel: false,    
    //         confirmText: '返回授权',    
    //         success: function(res) {    
              // 用户没有授权成功，点击了返回授权    
    //           if (res.confirm) {}    
    //         }    
    //       });    
    //     }    
      },   

  
})