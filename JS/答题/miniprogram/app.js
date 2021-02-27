//app.js

App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: 'environment-s8hfl',
        traceUser: true,
      })
    }
    //-----------更新提示---------------
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate(function (res) {
        console.log('onCheckForUpdate====', res)
        // 请求完新版本信息的回调
        if (res.hasUpdate) {
          console.log('res.hasUpdate====')
          wx.clearStorage({
            success: (res) => {
              // console.log('clearStorage');
            },
          })
          updateManager.onUpdateReady(function () {
            
            updateManager.applyUpdate()          
          })
          updateManager.onUpdateFailed(function () {
            // 新的版本下载失败
            wx.showModal({
              title: '已经有新版本了~',
              content: '新版本更新失败~，请移除小程序，重新搜索打开~',
              showCancel: false
            })
          })
        }
      })
    }
    //----------------------------------
    const db = wx.cloud.database();    
    // this.globalData = {
    //   Questions: null,     

    // },   
    //-----------自定义标题栏，获取信息---------------
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
      }
    })
    //-----------缓存---------------
    wx.getStorage({
      key: 'myquestions',
      success:res=>{
        // console.log('缓存存在');
        this.globalData.Questions = res.data
      },
      fail:res=>{
        // console.log('缓存不存在');
        db.collection('questionBank-noanswer').get({
          success: res1=> {                
            this.globalData.Questions = res1
            wx.setStorage({
              data: res1,
              key: 'myquestions',
            })       
          }
      })
      }
    })
    this.isLogin()
  },
  
  globalData:{
    Questions: null,   
    userInfo: {},
    logged: false,
    jsmember: false,
    danxuanSum: 35,
    duoxuanSum: 30,
    panduanSum: 35,
      
  },
  //---------
  isLogin: function(){
        var that = this;    
        // 查看是否授权    
    // console.log('123');
        wx.getSetting({    
            success: function(res) {    
              if (res.authSetting['scope.userInfo']) {    
                wx.getUserInfo({    
                  success: function(res) {    
                    that.globalData.userInfo = res.userInfo;
                    that.globalData.logged = true    //                
                    }                 
                  });   
                wx.cloud.callFunction({
                  name: "judgeuser",      
                }).then(res=>{
                  console.log(res);
                  that.globalData.jsmember = res.result.jsmember  
                  if(that.jsmemberCallback){
                    that.jsmemberCallback(that.globalData.jsmember)
                  }    
                })            
              } else {    
                // 用户没有授权  
                  that.globalData.logged = false
                  console.log('mei  shouquan');

      //             wx.navigateTo({
      //               url: '/pages/login/login'    
      //             })    
              }    
            }    
        })
  }
  //-----------
})
