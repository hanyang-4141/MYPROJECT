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
    currentMemberIndex: '',
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
      checked: false, 
      score: 0
    },
    {
      name: '李四',
      checked: false, 
      score: 0
    },
    {
      name: '王五',
      checked: false, 
      score: 0
    },
    {
      name: '赵六六',
      checked: false, 
      score: 0
    },
    {
      name: '张三',
      checked: false, 
      score: 0
    },
    {
      name: '李四四',
      checked: false, 
      score: 0
    },
    {
      name: '王五五',
      checked: false, 
      score: 0
    },
    {
      name: '赵六',
      checked: false, 
      score: 0
    },
  ],
  checkbox: [{
    value: 0.5,    
    checked: false,   
  }, {
    value: 1.0,    
    checked: false,   
  }, {
    value: 1.5,    
    checked: false,    
  }, {
    value: 2,    
    checked: false,    
  }, {
    value: 2.5,    
    checked: false,   
  }, {
    value: 3.0,    
    checked: false,    
  }, {
    value: 3.5,    
    checked: false,    
  }, {
    value: 4.0,    
    checked: false,    
  }, {
    value: 4.5,    
    checked: false,    
  }, {
    value: 5.0,    
    checked: false,    
  }, {
    value: 5.5,    
    checked: false,    
  }, {
    value: 6.0,    
    checked: false,    
  }]
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
  JiaBanChange(e){

  },
  ZhongDaChange(e){

  },
  YiLiuChange(e){
    
  },
  submit(){
    // console.log(this.data.jizuIndex);
    
  },
  formSubmit(e){
    var tempdata;
    // console.log(e);
    if(!this.data.jizu){
      wx.showToast({
        title: '请选择机组!',
      })
      return
    }
    tempdata = e.detail.value
    // tempdata['tags'] = [{'jiaban': 0},{'zhongda': 0},{'yiliu': 0},{'xiujiulifei': 0},{'jigai': 0},]
    // let tags = {}
    // tags['加班'] = e.detail.value.JiaBan
    // tags['重大'] = e.detail.value.ZhongDa
    // tags['遗留'] = e.detail.value.YiLiu
    
    let MemberScore = {}
    this.data.member.forEach(item=>{
      if(item.checked == true){
        MemberScore[item.name] = item.score
      }
    })
    // tempdata['tags'] = tags
    tempdata['MemberScore'] = MemberScore
    console.log(tempdata);
    const db = wx.cloud.database()
    const myjobs = db.collection('jobs')
    myjobs.add({
      data: tempdata
    }).then(res=>{
      wx.redirectTo({
        url: '../jobs/jobs',
      })
      console.log(res);
    })
    // return
    // wx.cloud.callFunction({
    //   name: "insertjobs",
    //   data: tempdata
    // }).then(res=>{
    //   console.log('jiaru  chenggong');
    //   wx.redirectTo({
    //     url: '../../pages/jobs/jobs',
    //   })
    // })

  },
  formReset(e){

  },
  showModal(e) {
    console.log(e);
    let index = e.currentTarget.dataset.index
    this.data.currentMemberIndex = index
    if(!this.data.member[index].checked){
      this.data.member[index].checked = true
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    }else{
      this.data.member[index].checked = false
    }
    this.setData({
      member: this.data.member
    })
    
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  ChooseCheckbox(e) {
    console.log(e);
    let items = this.data.checkbox;
    let values = e.currentTarget.dataset.value;
    let index = e.currentTarget.dataset.index;
    for (let i = 0, lenI = items.length; i < lenI; ++i) {      
        items[i].checked = false; 
    }
    items[index].checked = true
    this.data.member[this.data.currentMemberIndex].score = values
    this.setData({
      checkbox: items,
      member: this.data.member
    })
    this.hideModal()
  }

  

})