//index.js
const app = getApp()
const db = wx.cloud.database()
const myshoucang = db.collection('shoucang')
Page({
  data: {
    exist: true,
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

  onLoad: function(options) {
    if(options.questionTitle == "热机安规"){
      app.globalData.questionIndex = 0
    }else if(options.questionTitle == "电气安规"){
      app.globalData.questionIndex = 1
    }
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
      questionIndex: app.globalData.questionIndex
    })
    myshoucang.where({
      _openid: app.globalData._openid
    }).get().then(res=>{
      console.log(res);
      if(res.data.length == 0){
          var temparr = []
          for (let i = 0; i < 300; i++) {
          temparr.push(false)
          }
          var temp ={}
          var rj = {}
          var dq = {}
          rj.danxuan = temparr
          rj.duoxuan = temparr
          rj.panduan = temparr
          dq.danxuan = temparr
          dq.duoxuan = temparr
          dq.panduan = temparr
          temp.rj = rj
          temp.dq = dq
          console.log(temp);
          app.globalData.shoucang = options.questionTitle == "热机安规"?temp.rj:temp.dq
        myshoucang.add({
          data:{
            _openid: app.globalData._openid, 
            热机安规: rj,
            电气安规: dq
          }         
        })
      }else{
        app.globalData.shoucang = app.globalData.shoucang = options.questionTitle == "热机安规"?res.data[0].热机安规:res.data[0].电气安规
        // res.data[0]
        console.log(app.globalData.shoucang);
      }
    })

    
      // wx.cloud.callFunction({
      //   name: 'getshoucang'
      // }).then(res=>{
      //   if(res.result.res.data.length > 0){
      //     console.log('获取收藏', res);
      //     app.globalData.shoucang = res.result.res.data[0]
      //   }else{
      //     var temparr = []
      //     for (let i = 0; i < 300; i++) {
      //     temparr.push(false)
      //     }
      //     var temp ={}
      //     temp.danxuan = temparr
      //     temp.duoxuan = temparr
      //     temp.panduan = temparr
      //     console.log(temp);
      //     app.globalData.shoucang = temp
      //     this.setData({
      //       exist: false
      //     })
      //   }
      // })
    
  
    
  },
})
