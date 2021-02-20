// pages/jobs/jobs.js
const gongju = require('../../utils/tools.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {    
    jobsData:'',
    selectComplete: true,
    selectDay: '',
    is_open: false,
    selected: [
      {
        date: '2018-5-21'
      }, {
        date: '2018-5-22'
      },{
        date: '2018-5-24'
      },{
        date: '2018-5-25'
      }
    ]

  },
  bindselect(e) {
    console.log(e.detail.ischeck)
    this.setData({
      selectComplete: !e.detail.ischeck
    })
    // if(this.data.selectComplete){
    //   wx.cloud.callFunction({
    //     name: "getjobs",
    //     data: {
    //       selectDay: this.data.selectDay 
    //     }    
    //   }).then(res=>{
    //     console.log(res);
    //     this.setData({
    //       jobsData: res.result.data
    //     })
    //   })

    // }

  },
  /**
   * 获取选择日期
   */
  bindgetdate(e) {
    let time = e.detail;
    // console.log(time)
    this.setData({
      selectDay: time.year + '-' + time.month + '-' + time.date
    })
   
      wx.cloud.callFunction({
        name: "getjobs",
        data: {
          selectDay: this.data.selectDay 
        }    
      }).then(res=>{
        // console.log(res);
        this.setData({
          jobsData: res.result.data
        })
      })
    

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let day = ''
    day = gongju.formatDate(new Date())
    wx.cloud.callFunction({
      name: "getjobs",
        data: {
          selectDay: day 
        }         
    }).then(res=>{
      // console.log(res);
      this.setData({
        jobsData: res.result.data
      })
    })

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

  },
  // ListTouch触摸开始
  ListTouchStart(e) {
    this.setData({
      ListTouchStart: e.touches[0].pageX
    })
  },

  // ListTouch计算方向
  ListTouchMove(e) {
    console.log(e.touches[0].pageX - this.data.ListTouchStart);
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
  to_jobinput(){
    wx.navigateTo({
      url: '../jobInput/jobInput',
    })
  }
})
