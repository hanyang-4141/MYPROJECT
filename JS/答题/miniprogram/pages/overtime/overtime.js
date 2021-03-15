// pages/overtime/overtime.js
const gongju = require('../../utils/gongju')
const db = wx.cloud.database()
const myjobs = db.collection('jobs')

Page({
  data: {
    OverTimeData: '',

  },
  onLoad: function (options) {
    myjobs.where({
      JiaBan: true
    }).get().then(res=>{
      console.log(res);
      this.data.OverTimeData = res.data
      this.data.OverTimeData.forEach(item=>{
        var startTime = item.startdate + ' ' + item.starttime
        var endTime = item.enddate + ' ' + item.endtime
        var start = new Date(startTime.replace(/-/g, "/")).getTime();
        var end = new Date(endTime.replace(/-/g, "/")).getTime(); 
        var diff = new Date(end - start);
        var str = "HH小时mm分";         
        str = str.replace(/HH/, Math.floor(diff / (60 * 60 * 1000)));
        str = str.replace(/mm/, Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000)));
        // str = str.replace(/ss/, Math.floor((diff % (60 * 1000)) / 1000));
        item.overtimelong = str
        console.log(str);
      })
      this.setData({
        OverTimeData: this.data.OverTimeData
      })
      

    })
    
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

})