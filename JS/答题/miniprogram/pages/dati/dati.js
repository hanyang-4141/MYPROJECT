//index.js
const app = getApp()

Page({
  data: {
    nickName: '',
    avatarUrl: './user-unlogin.png',
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

  onLoad: function() {
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
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // console.log(res);
    //           getApp().globalData.userInfo = res.userInfo
    //           this.setData({
    //             avatarUrl: res.userInfo.avatarUrl,
    //             userInfo: res.userInfo,
    //             nickName: res.userInfo.nickName
    //           })
    //         }
    //       })
    //     }
    //   }
    // })
    // // console.log(this.data.nickName);

    
  },
  
  // onGetUserInfo: function(e) {
  //   if (!this.data.logged && e.detail.userInfo) {
  //     // console.log(e);
  //     getApp().globalData.userInfo = e.detail.userInfo
  //     this.setData({
  //       logged: true,
  //       avatarUrl: e.detail.userInfo.avatarUrl,
  //       userInfo: e.detail.userInfo,
  //       nickName: e.detail.userInfo.nickName
  //     })
  //   }
  // },
})
