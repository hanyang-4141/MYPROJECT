// pages/trainInput/trainInput.js
const gongju = require('../../utils/tools.js')
const db = wx.cloud.database()
const mytrains = db.collection('trains')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: "",
    startdate: '',
    enddate: '',
    starttime: '',
    endtime: '',
    teacher: '',
    addr: '',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var d = new Date()
    // console.log(d.getMonth());
    // console.log(gongju.formatTime(d));
    this.setData({
      startdate: gongju.formatDate(d),
      enddate: gongju.formatDate(d),
      starttime: gongju.formatTime(d) ,
      endtime: gongju.formatTime(d)
    })

  },
  StartTimeChange(e) {
    this.setData({
      starttime: e.detail.value
    })
  },
  StartDateChange(e) {
    this.setData({
      startdate: e.detail.value
    })
  },
  EndTimeChange(e) {
    this.setData({
      endtime: e.detail.value
    })
  },
  EndDateChange(e) {
    this.setData({
      enddate: e.detail.value
    })
  },
  textareaBInput(e){
    this.setData({
      content: e.detail.value
    })

  },
  teacherInput(e){
    this.setData({
      teacher: e.detail.value
    })
  },
  addrInput(e){
    this.setData({
      addr: e.detail.value
    })
  },
  formSubmit(e){
    var tempdata;    
    tempdata = e.detail.value
            
    console.log(tempdata);
    
    mytrains.add({
      data: tempdata
    }).then(res=>{
      wx.redirectTo({
        url: '../train/train',
      })
      console.log(res);
    })    
  }

})