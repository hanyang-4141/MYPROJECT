// miniprogram/pages/index/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
    }, {
      id: 1,
        type: 'image',
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
    }, {
      id: 2,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
    }, {
      id: 3,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
    }, {
      id: 4,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
    }, {
      id: 5,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
    }, {
      id: 6,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
    }],
    questions:[
      {
        title:'热机安规',
        name:'dati',
        icon:'safe',
        color:'red'
      },     
      {
        title: '电气安规',
        name: 'dati',
        icon: 'like',
        color: 'pink'
      }],
    elements:[      
      {
        title:'工作记录',
        name:'jobs',
        icon:'safe',
        color:'yellow'
      },      
      {
        title:'培训记录',
        name:'train',
        icon:'safe',
        color:'olive'
      },
      {
        title:'保护投退',
        name:'protect',
        icon:'safe',
        color:'green'
      },
      {
        title:'加班统计',
        name:'overtime',
        icon:'safe',
        color:'cyan'
      },
      {
        title:'热机安规',
        name:'dati',
        icon:'safe',
        color:'red'
      },     
      {
        title: '电气安规',
        name: 'dati',
        icon: 'like',
        color: 'pink'
      },
      {
        title: '工具',
        name: 'tools',
        icon: 'like',
        color: 'orange'
      }, 
    ],
    tools:[            
      {
        title: '热电阻',
        name: 'resistance',
        icon: 'like',
        color: 'yellow'
      },
      {
        title: '热电偶',
        name: 'Thermocouple',
        icon: 'copy',
        color: 'brown'
      },
      {
        title: '量程',
        name: 'measure',
        icon: 'settings',
        color: 'mauve'
      },
    ],
    banzurecord:[      
      {
        title:'工作记录',
        name:'jobs',
        icon:'safe',
        color:'yellow'
      },      
      {
        title:'培训记录',
        name:'train',
        icon:'safe',
        color:'olive'
      },
      {
        title:'保护投退',
        name:'protect',
        icon:'safe',
        color:'green'
      },
      {
        title:'加班统计',
        name:'overtime',
        icon:'safe',
        color:'cyan'
      }],
    jsmember: false

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    
    if(!app.globalData.jsmemberCallback || app.globalData.jsmemberCallback == ''){
        app.jsmemberCallback = jsmember=>{
          this.setData({
            jsmember: jsmember
          })
        }
    }
   
    
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({jsmember: app.globalData.jsmember})
    console.log(app.globalData.jsmember);
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})