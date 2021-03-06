// pages/panduan/panduan.js
const gongju = require('../../utils/tools')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    PanDuan: [],
    tags: 0,
    answererror: false,
    hidden: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let json_str = options.questionIndex=='1'?JSON.stringify(app.globalData.Questions_dianqi.data[2].PanDuan):JSON.stringify(app.globalData.Questions.data[2].PanDuan)
    let json_arry = JSON.parse(json_str)    //深拷贝    
    if(app.globalData.questionsXipai){
      gongju.shuffle(json_arry)
    }    
    //选项随机排列
    if(app.globalData.optionsXipai){
      json_arry.forEach(item=>{
        gongju.shuffle(item.options)
      })
    }    
    this.setData({
      PanDuan: json_arry,      
      shoucang: app.globalData.shoucang,
      questionIndex: options.questionIndex,
      shijiIndex: json_arry[this.data.tags].index
    })   
  },

  chooseAnswer(res){    
    let chooseArr = this.data.PanDuan[this.data.tags].options;
    let index = res.currentTarget.dataset.index;    
    chooseArr.forEach(item => {
      item.checked = false
    })
    chooseArr[index].checked = true
    // console.log(chooseArr);
    if(chooseArr[index].value != this.data.PanDuan[this.data.tags].answer){
      // console.log('error');
      this.setData({
        answererror: true
      })
    }
    this.setData({
      PanDuan: this.data.PanDuan,
      afterclick: true,
      hidden: false
    })
    if(app.globalData.autoNext){
      setTimeout(this.afterQuestion, app.globalData.switch_time)
    }
  },
  beforeQuestion(){
    if(this.data.tags < 1){
      return
    }    
    this.setData({
      afterclick: false,
      tags: this.data.tags - 1,
      answererror: false,
      hidden: true,
      shijiIndex: this.data.PanDuan[this.data.tags-1].index
    })
  },
  afterQuestion(){
    if (this.data.tags + 2 > this.data.PanDuan.length){
      return
    }
      this.setData({
        afterclick: false,
        tags: this.data.tags + 1,
        answererror: false,
        hidden: true,
        shijiIndex: this.data.PanDuan[this.data.tags+1].index
      })     
  }, 

ShouCang(){ 
  this.data.shoucang.panduan[this.data.shijiIndex-1] = !this.data.shoucang.panduan[this.data.shijiIndex-1]  
  wx.showToast({
    title: this.data.shoucang.panduan[this.data.shijiIndex-1]?'加入收藏':'取消收藏',
  })
  this.setData({
    shoucang: this.data.shoucang,      
  })   
  app.globalData.shoucang = this.data.shoucang
  wx.cloud.callFunction({
    name: 'updateshoucang',
    data:{   
      questionIndex: this.data.questionIndex,     
      type: 'panduan',
      shoucang: this.data.shoucang
    }
  })
}  
})