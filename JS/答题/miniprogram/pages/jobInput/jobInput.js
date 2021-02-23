// pages/jobInput/jobInput.js
const gongju = require('../../utils/tools.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jizuList: ['#1机组', '#2机组', '丰泰公用','#3机组', '#4机组', '科林公用'],    
    jizu: '',
    jizuIndex: '',     
    content: "",
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
  ],
    member: [{
      name: '张三三',
      score: 1.5
    },
    {
      name: '李四',
      score: 2.5
    },
    {
      name: '王五',
      score: 3.5
    },
    {
      name: '赵六六',
      score: 5.5
    },
    {
      name: '张三',
      score: 1.5
    },
    {
      name: '李四四',
      score: 2.5
    },
    {
      name: '王五五',
      score: 3.5
    },
    {
      name: '赵六',
      score: 5.5
    },
  ]
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
  PickerChange(e) {    
    this.setData({
      jizuIndex: e.detail.value,
      jizu: this.data.jizuList[e.detail.value]
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
  submit(){
    // console.log(this.data.jizuIndex);
    
  },
  formSubmit(e){
    var tempdata;
    console.log(e);
    if(!this.data.jizu){
      wx.showToast({
        title: '请选择机组!',
      })
      return
    }
    tempdata = e.detail.value
    tempdata['tags'] = [{'jiaban': 0},{'zhongda': 0},{'yiliu': 0},{'xiujiulifei': 0},{'jigai': 0},]
    console.log(tempdata);
    wx.cloud.callFunction({
      name: "insertjobs",
      data: tempdata
    }).then(res=>{
      console.log('jiaru  chenggong');
      wx.redirectTo({
        url: '../../pages/jobs/jobs',
      })
    })

  },
  formReset(e){

  },

  

})