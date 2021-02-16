// pages/jobInput/jobInput.js
const gongju = require('../../utils/tools.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picker: ['#1机组', '#2机组', '丰泰公用','#3机组', '#4机组', '科林公用'],    
    jizuIndex: '',
    startdate: '',
    enddate: '',
    starttime: '',
    endtime: '',
    ColorList: [{
      title: '嫣红',
      name: 'red',
      color: '#e54d42'
    },
    {
      title: '桔橙',
      name: 'orange',
      color: '#f37b1d'
    },
    {
      title: '明黄',
      name: 'yellow',
      color: '#fbbd08'
    },
    {
      title: '橄榄',
      name: 'olive',
      color: '#8dc63f'
    },
    {
      title: '森绿',
      name: 'green',
      color: '#39b54a'
    },
    {
      title: '天青',
      name: 'cyan',
      color: '#1cbbb4'
    },
    {
      title: '海蓝',
      name: 'blue',
      color: '#0081ff'
    },    
  ]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var d = new Date()
    console.log(gongju.formatTime(d));
    this.setData({
      startdate: gongju.formatDate(d),
      enddate: gongju.formatDate(d),
      starttime: gongju.formatTime(d) ,
      endtime: gongju.formatTime(d)
    })

  },
  PickerChange(e) {
    // console.log(e);
    this.setData({
      jizuIndex: e.detail.value
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
  submit(){
    console.log(this.data.jizuIndex);
    if(!this.data.jizuIndex){
      wx.showToast({
        title: '请选择机组!',
      })
    }
  }

  

})