// pages/protectInput/protectInput.js
const db = wx.cloud.database()
const myprotects = db.collection('protects')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    jizuList: ['#1机组', '#2机组', '丰泰公用','#3机组', '#4机组', '科林公用'],    
    jizu: '',
    jizuIndex: '',
    content: "",
    exitdate: "无",
    exittime: "无",
    exitoperator: "",
    recoverydate: "无",
    recoverytime: "无",
    recoveryoperator: "",
    show: false,
    update: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id);
    if(options.id != undefined && options.id != null ){
      console.log('id cunzai');
      myprotects.where({
        _id: options.id
      }).get().then(res=>{
        console.log(res.data[0]);
        this.setData({
          id: options.id,
          jizu:  res.data[0].jizu,
          jizuIndex: this.data.jizuList.indexOf(res.data[0].jizu),
          content: res.data[0].content,
          exitdate: res.data[0].exitdate,
          exittime: res.data[0].exittime,
          exitoperator: res.data[0].exitoperator,
          recoverydate: res.data[0].recoverydate,
          recoverytime: res.data[0].recoverytime,
          recoveryoperator: res.data[0].recoveryoperator,
          show: res.data[0].show,
          update: true
        })
      })
    }
    
  },
  PickerChange(e){
    this.setData({
      jizuIndex: e.detail.value,
      jizu: this.data.jizuList[e.detail.value]
    })
  },
  textareaBInput(e){
    this.setData({
      content: e.detail.value
    })
  },
  exitdateChange(e){
    this.setData({
      exitdate: e.detail.value
    })

  },
  exittimeChange(e){
    this.setData({
      exittime: e.detail.value
    })
  },
  exitoperatorInput(e){
    this.setData({
      exitoperator: e.detail.value
    })
  },
  isRecoveryChange(e){
    // console.log(e);
    this.setData({
      show: e.detail.value
    })
  },


  recoverydateChange(e){
    this.setData({
      recoverydate: e.detail.value
    })
  }, 
  recoverytimeChange(e){
    this.setData({
      recoverytime: e.detail.value
    })
  },
  recoveryoperatorInput(e){
    this.setData({
      recoveryoperator: e.detail.value
    })
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
    console.log(tempdata);    
    if(this.data.update){
      myprotects.where({
        _id: this.data.id
      }).update({
        data: tempdata
      }).then(res=>{
        wx.redirectTo({
          url: '../protect/protect',
        })
      })

    }else{
      myprotects.add({
        data: tempdata
      }).then(res=>{
        wx.redirectTo({
          url: '../protect/protect',
        })
        console.log(res);
      }) 
    }
    
  },
  
  
})