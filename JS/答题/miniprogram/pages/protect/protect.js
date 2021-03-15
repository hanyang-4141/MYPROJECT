// pages/protect/protect.js
const db = wx.cloud.database()
const myprotects = db.collection('protects')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ProtectData: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    myprotects.where({

    }).get().then(res=>{
      this.setData({
        ProtectData: res.data
      })
    })
  },
  to_protectinput(e){
    wx.navigateTo({
      url: '../protectInput/protectInput',
    })
  },
  ListTouchStart(e) {
    this.setData({
      ListTouchStart: e.touches[0].pageX
    })
  },

  // ListTouch计算方向
  ListTouchMove(e) {
    // console.log(e.touches[0].pageX - this.data.ListTouchStart);
    // this.setData({
    //   ListTouchDirection: e.touches[0].pageX - this.data.ListTouchStart > 0 ? 'right' : 'left'
    // })
    if(e.touches[0].pageX - this.data.ListTouchStart < -100){
      this.setData({
        ListTouchDirection:'left'
      })
    }
    if(e.touches[0].pageX - this.data.ListTouchStart > 0){
      this.setData({
        ListTouchDirection:'right'
      })
    }
    
  },

  // ListTouch计算滚动
  ListTouchEnd(e) {
    if (this.data.ListTouchDirection =='left'){
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    } else {
      this.setData({
        modalName: null
      })
    }
    this.setData({
      ListTouchDirection: null
    })
  },
  del(e){    
    var that = this
    wx.showModal({
      title: '提示',
      content: '是否删除？',
      success (res) {
        if (res.confirm) {
          // console.log('用户点击确定')
          let id = e.currentTarget.dataset.id
          myprotects.where({
            _id: id
          }).remove().then(res=>{
            console.log(res);
            that.onLoad()
          })          
        } else if (res.cancel) {
          // console.log('用户点击取消')
        }
      }
    })    
  },
  listTap(e){
    console.log(e);
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../protectInput/protectInput?id=' + id,
    })
  },
})