// pages/test01/text01.js
Page({
  getdata(){
    wx.cloud.callFunction({
      name:'getdata',
      data:{
        x:1567,
        y:22
      },
      success : res=> {
        console.log(res);
        
        wx.showToast({
          title: '调用成功',
        })
      },
      fail: res=> {
        console.log(res);
        
        wx.showToast({
          title: '调用shibai',
        })
      }
    })
    
  },
  _tabsubmit(evt){
    console.log(evt)
    const db = wx.cloud.database()
    const user_collection = db.collection('users')
    user_collection.add({
      data:{
        name:evt.detail.value.account,
        pwd:evt.detail.value.password
      }
    }).then(res=>{
      console.log("chenggong",res)
    }).catch(err=>{
      console.log("fail",err)
    })

  },
  _dianji(){
    wx.request({
      url: 'https://search-x.jd.com/Search', //仅为示例，并非真实的接口地址 https://search.jd.com/Search?keyword=ac66u&enc=utf-8&wq=ac66u&pvid=91c42351ebe849a68dc802184be54a13
      data: {
        callback:'jQuery8914574',
        area:'11',
        enc:'utf-8',
        keyword:'ac66u',
        adType:'7',
        page:'1',
        ad_ids:'291:11',
        xtest:'new_search',
        _:'1593232655462'

      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log(res.data)
        console.log(res)
      }
    })
  },
  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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