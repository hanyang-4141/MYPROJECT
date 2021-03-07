// pages/duoxuan/duoxuan.js
const gongju = require('../../utils/tools')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    DuoXuan: [],
    questions: [],
    shoucang: '',
    shijiIndex: 0,
    tags : 0,
    afterclick: false,
    currentanswer: null,
    answererror: false,
    hidden: true,
    questionIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {    
    let json_str = options.questionIndex=='1'?JSON.stringify(app.globalData.Questions_dianqi.data[1].DuoXuan):JSON.stringify(app.globalData.Questions.data[1].DuoXuan)
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
      DuoXuan: json_arry,
      shoucang: app.globalData.shoucang,
      questionIndex: options.questionIndex,
      shijiIndex: json_arry[this.data.tags].index
    })  
  },
  beforeQuestion(){
    if(this.data.tags < 1){
      return
    }    
    this.setData({
      afterclick: false,
      tags: this.data.tags - 1,
      answererror: false,
      hidden:true,
      shijiIndex: this.data.DuoXuan[this.data.tags-1].index
    })   
  },
  afterQuestion(){
    if (this.data.tags + 2 > this.data.DuoXuan.length){
      return
    }
      this.setData({
        afterclick: false,
        tags: this.data.tags + 1,
        answererror: false,
        hidden:true,
        shijiIndex: this.data.DuoXuan[this.data.tags+1].index
      })
  },
  submitclick(){
    // console.log(this.data.questions[this.data.tags].answer);
    let chooseArr = this.data.DuoXuan[this.data.tags].options;
    let rightanswer = this.data.DuoXuan[this.data.tags].answer
    let tempanswer_list = []
    chooseArr.forEach(item =>{
      if(item.checked == true){
        tempanswer_list.push(item.value)
      }
    })
    var tempanswer_str = tempanswer_list.sort().join('')    
    if(tempanswer_str === rightanswer){ 
      this.setData({
        hidden: false
      })
    }
    else{
      chooseArr.forEach(item =>{
        item.checked = false
        if(rightanswer.indexOf(item.value) != -1){
          item.checked = true
        }
      })
      // console.log(chooseArr);
      this.setData({
        answererror: true,
        DuoXuan:this.data.DuoXuan,
        hidden: false
      })      
    }
    setTimeout(this.afterQuestion, app.globalData.switch_time)
  },

  chooseAnswer(res){
    let chooseArr = this.data.DuoXuan[this.data.tags].options;
    let index = res.currentTarget.dataset.index;        
    chooseArr[index].checked = !chooseArr[index].checked
    this.setData({
      DuoXuan: this.data.DuoXuan,     
    })      
  },

  ShouCang(){ 
    this.data.shoucang.duoxuan[this.data.shijiIndex-1] = !this.data.shoucang.duoxuan[this.data.shijiIndex-1]    
    wx.showToast({
      title: this.data.shoucang.duoxuan[this.data.shijiIndex-1]?'加入收藏':'取消收藏',
    })
    this.setData({
      shoucang: this.data.shoucang,      
    })     
    app.globalData.shoucang = this.data.shoucang
    wx.cloud.callFunction({
      name: 'updateshoucang',
      data:{   
        questionIndex: this.data.questionIndex,     
        type: 'duoxuan',
        shoucang: this.data.shoucang
      }
    })
  }
})