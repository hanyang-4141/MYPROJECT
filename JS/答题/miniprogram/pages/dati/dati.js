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
    var isexist_shoucang = false
    wx.cloud.callFunction({
      name: 'updateshoucang',
      data:{
        type: 'init',
      }
    }).then(res=>{
      // console.log(res);
      if(res.result.shoucang.data.length > 0){
        app.globalData.shoucang = res.result.shoucang.data[0]
        isexist_shoucang = true
        
      }
    })
    if(!isexist_shoucang){
      wx.cloud.callFunction({
        name: 'getshoucang'
      }).then(res=>{
        console.log('获取收藏', res);
        app.globalData.shoucang = res.result.res.data[0]
      })
    }
    console.log(app.globalData.shoucang);
    

    
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
