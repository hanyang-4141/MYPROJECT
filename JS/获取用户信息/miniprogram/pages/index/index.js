//index.js
const app = getApp()
const db = wx.cloud.database()
Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    realname:'',
    banzu:"",
    hidden:true,
    nameArray:[
      {'id':1,'text':'语文'},{'id':2,'text':'数学'},{'id':3,'text':'历史'},{'id':4,'text':'物理'},{'id':5,'text':'地理'},{'id':6,'text':'生物'},{'id':7,'text':'外语'},
    ],
    banzuArray:[
      {'id':1,'text':'自动043'},{'id':2,'text':'自动053'},{'id':3,'text':'自动063'},{'id':4,'text':'自动073'},{'id':5,'text':'自动083'},
    ],
    nameIndex:0,
    banzuIndex:0
  },
  selectlistTap_name(e){
    console.log(e.detail);
    this.setData({nameIndex:e.detail.id, realname:e.detail.name})
  },
  selectlistTap_banzu(e){
    console.log(e.detail);
    this.setData({banzuIndex:e.detail.id, banzu:e.detail.name})
  },
  confirm(){
    if(this.data.nameIndex == 0 || this.data.banzuIndex == 0){
      wx.showToast({
        title: '请输入！',
      })
      return
    }
    db.collection('users').add({
      data:{
        realname:this.data.realname,
        banzu:this.data.banzu
      }
    }).then(res=>{
      console.log(res);      
    })
    this.setData({hidden:true})
  },
  showmodal(){
    this.setData({hiddenModal:false})
  },
  modalCancel(){
    this.setData({hiddenModal:true})
  },
  modalConfirm(){
    this.setData({hiddenModal:true})
  },

  //获取USERS信息
  get_users_info(){
    db.collection('users').get().then(res=>{
      console.log(res.data);
      if (res.data.length!=0){
        this.setData({realname:res.data[0].realname})
        console.log(res.data[0].realname);
        
      }else{
        // wx.redirectTo({
        //   url: '../../pages/register/register'
        // })
        this.setData({hidden:false})
      }
    })
  },

  onLoad: function() {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => { 
              this.setData({
                logged: true,
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
              this.get_users_info()
            }
          })
        }
      }
    })   
  },

  onGetUserInfo: function(e) {
    if (!this.data.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })      
    } 
    this.get_users_info()       
  },

  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.navigateTo({
          url: '../userConsole/userConsole',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  }, 

})
