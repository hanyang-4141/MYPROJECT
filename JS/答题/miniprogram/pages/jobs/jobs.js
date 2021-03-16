// pages/jobs/jobs.js
const gongju = require('../../utils/tools.js')
const db = wx.cloud.database()
const myjobs = db.collection('jobs')
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
    console.log(this.data.selectDay);
    myjobs.where({
      startdate: this.data.selectDay 
    }).get().then(res=>{
      console.log(res);
      this.setData({
        jobsData: res.data
      })
      // console.log(this.data.jobsData[1].MemberScore.keys);
    })   
      // wx.cloud.callFunction({
      //   name: "getjobs",
      //   data: {
      //     selectDay: this.data.selectDay 
      //   }    
      // }).then(res=>{
      //   // console.log(res);
      //   this.setData({
      //     jobsData: res.result.data
      //   })
      // })   

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    let day = ''
    day = gongju.formatDate(new Date())
    myjobs.where({
      startdate: day
    }).get().then(res=>{
      console.log(res);
      this.setData({
        jobsData: res.data
      })
      
    })

    // wx.cloud.callFunction({
    //   name: "getjobs",
    //     data: {
    //       selectDay: day 
    //     }         
    // }).then(res=>{
    //   // console.log(res);
    //   this.setData({
    //     jobsData: res.result.data
    //   })
    // })

  },
  // ListTouch触摸开始
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
  to_jobinput(){
    wx.navigateTo({
      url: '../jobInput/jobInput',
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
          myjobs.where({
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
      url: '../jobInput/jobInput?id=' + id,
    })
  }

})
