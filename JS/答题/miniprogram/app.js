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
        // env: 'my-env-id',
        traceUser: true,
      })
    }
    const db = wx.cloud.database();    
    // this.globalData = {
    //   Questions: null,     

    // },   
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
      }
    })
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
    logged: false
      
  },
  //---------
  isLogin: function(){
        var that = this;    
        // 查看是否授权    
        wx.getSetting({    
            success: function(res) {    
              if (res.authSetting['scope.userInfo']) {    
                wx.getUserInfo({    
                  success: function(res) {    
                    that.globalData.userInfo = res.userInfo;    
                    // 根据自己的需求有其他操作再补充    
                    // 我这里实现的是在用户授权成功后，调用微信的 wx.login 接口，从而获取code   
                    console.log('shouquan');
                    wx.reLaunch({
                      url: '/pages/index/index'    
                    })     
    //                 wx.login({    
    //                   success: res => {    
    //                     console.log(res.code);
    //                     // 获取到用户的 code 之后：res.code    
    //                     // console.log("用户的code:" + res.code);    
    //                     // 可以传给后台，再经过解析获取用户的 openid    
    //                     // 或者可以直接使用微信的提供的接口直接获取 openid ，方法如下：    
    //                     // wx.request({    
    //                     //     // 自行补上自己的 APPID 和 SECRET    
    //                     //     url: 'https://api.weixin.qq.com/sns/jscode2session?appid=自己的APPID&secret=自己的SECRET&js_code=' + res.code + '&grant_type=authorization_code',    
    //                     //     success: res => {    
    //                     //         // 获取到用户的 openid    
    //                     //         console.log("用户的openid:" + res.data.openid);    
    //                     //     }    
    //                     // });    
    //                     }    
    //                   });    
                    }    
                  });    
              } else {    
                // 用户没有授权    
                console.log('mei  shouquan');
                wx.navigateTo({
                  url: '/pages/login/login'    
                })    
              }    
            }    
        })
  }
  //-----------
})
