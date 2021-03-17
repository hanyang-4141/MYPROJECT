// pages/jobInput/jobInput.js
const gongju = require('../../utils/tools.js')
const db = wx.cloud.database()
const myjobs = db.collection('jobs')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    update: false,
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
      name: '胡毅',
      checked: false, 
      score: 0
    },
    {
      name: '尚卓毓',
      checked: false, 
      score: 0
    },
    {
      name: '周军',
      checked: false, 
      score: 0
    },
    {
      name: '乔智',
      checked: false, 
      score: 0
    },
    {
      name: '王志英',
      checked: false, 
      score: 0
    },
    {
      name: '车璐',
      checked: false, 
      score: 0
    },
    {
      name: '云雯',
      checked: false, 
      score: 0
    },
    {
      name: '范舒婷',
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
    console.log(options.id);
    if(options.id){
      console.log('id cunzai');
      myjobs.where({
        _id: options.id
      }).get().then(res=>{
        console.log(res.data[0]);
        let tempMember = res.data[0].MemberScore
        console.log(tempMember);
        this.data.member.forEach(item=>{
          console.log(item.name);
          if(item.name in tempMember){
            item.checked = true
            item.score = tempMember[item.name]
          }
        })
        this.setData({
          id: options.id,
          jizu:  res.data[0].jizu,
          jizuIndex: this.data.jizuList.indexOf(res.data[0].jizu),
          content: res.data[0].content,
          startdate: res.data[0].startdate,
          starttime: res.data[0].starttime,
          JiaBan: res.data[0].JiaBan,
          ZhongDa: res.data[0].ZhongDa,
          YiLiu: res.data[0].YiLiu,
          enddate: res.data[0].enddate,
          endtime: res.data[0].endtime,
          member: this.data.member,          
          update: true
        })
      })
    }else{
      var d = new Date()    
    this.setData({
      startdate: gongju.formatDate(d),
      enddate: gongju.formatDate(d),
      starttime: gongju.formatTime(d) ,
      endtime: gongju.formatTime(d)
    })
    }

    

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

    
    // tempdata['tags'] = [{'jiaban': 0},{'zhongda': 0},{'yiliu': 0},{'xiujiulifei': 0},{'jigai': 0},]
    // let tags = {}
    // tags['加班'] = e.detail.value.JiaBan
    // tags['重大'] = e.detail.value.ZhongDa
    // tags['遗留'] = e.detail.value.YiLiu
    tempdata = e.detail.value
    let MemberScore = {}
    this.data.member.forEach(item=>{
      if(item.checked == true){
        MemberScore[item.name] = item.score
      }
    })
    // tempdata['tags'] = tags
    tempdata['MemberScore'] = MemberScore
    console.log(tempdata);
    
    if(this.data.update){
      myjobs.where({
        _id: this.data.id
      }).update({
        data: tempdata
      }).then(res=>{
        wx.redirectTo({
          url: '../jobs/jobs',
        })
      })
    }else{
      myjobs.add({
        data: tempdata
      }).then(res=>{
        wx.redirectTo({
          url: '../jobs/jobs',
        })
        console.log(res);
      })
    }

    
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