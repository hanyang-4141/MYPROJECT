// pages/shoucang/shoucang.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ShouCang:'',
    tags: 0,
    answererror: '',
    hidden: true,    
    tempshoucangList: [],
    shijiIndex:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('shoucangoptions', options);
    var newArr = []
    let json_str = options.questionIndex=='1'?JSON.stringify(app.globalData.Questions_dianqi.data[0].DanXuan): JSON.stringify(app.globalData.Questions.data[0].DanXuan)
    let json_arry = JSON.parse(json_str)
    app.globalData.shoucang.danxuan.forEach((item, index)=>{
      if(item){
        newArr.push(json_arry[index])
      }
    })
    // console.log(newArr);
    json_str = options.questionIndex=='1'?JSON.stringify(app.globalData.Questions_dianqi.data[1].DuoXuan):JSON.stringify(app.globalData.Questions.data[1].DuoXuan)
    json_arry = JSON.parse(json_str)
    app.globalData.shoucang.duoxuan.forEach((item, index)=>{
      if(item){
        newArr.push(json_arry[index])
      }
    })
    json_str = options.questionIndex=='1'?JSON.stringify(app.globalData.Questions_dianqi.data[2].PanDuan):JSON.stringify(app.globalData.Questions.data[2].PanDuan)
    json_arry = JSON.parse(json_str)
    app.globalData.shoucang.panduan.forEach((item, index)=>{
      if(item){
        newArr.push(json_arry[index])
      }
    })
    
    for(let i=0; i<newArr.length; i++){
      this.data.tempshoucangList.push(true)
    }
    this.setData({
      ShouCang: newArr,    
      tempshoucangList: this.data.tempshoucangList,
      questionIndex: options.questionIndex,      
    })
    // console.log(this.data.ShouCang);

  },
  chooseAnswer(res){    
    let chooseArr = this.data.ShouCang[this.data.tags].options;
    let index = res.currentTarget.dataset.index;  
    if(this.data.ShouCang[this.data.tags].type == 'DuoXuan'){
      //多选   
      chooseArr[index].checked = !chooseArr[index].checked 
      this.setData({
        ShouCang: this.data.ShouCang
      })
    }else{
          
      chooseArr.forEach(item => {
        item.checked = false
      })
      chooseArr[index].checked = true      
      if(chooseArr[index].value != this.data.ShouCang[this.data.tags].answer){
        // console.log('error');
        this.setData({
          answererror: true,
          hidden: false
        })
      }
    }       
    this.setData({
      ShouCang: this.data.ShouCang,       
    })        
  },

  submitclick(){
    // console.log(this.data.questions[this.data.tags].answer);
    let chooseArr = this.data.ShouCang[this.data.tags].options;
    let rightanswer = this.data.ShouCang[this.data.tags].answer
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
     
      this.setData({
        answererror: true,
        ShouCang:this.data.ShouCang,
        hidden: false
      })      
    }
    // setTimeout(this.afterQuestion, 500)
  },

  beforeQuestion(){
    if(this.data.tags < 1){
      return
    }    
    this.setData({      
      tags: this.data.tags - 1,    
      answererror: false, 
      hidden: true 
    })
  },
  afterQuestion(){
    if (this.data.tags + 2 > this.data.ShouCang.length){
      //交卷
      return      
    }   
      this.setData({        
        tags: this.data.tags + 1,    
        answererror: false,    
        hidden: true
      })      
  }, 
  ShouCang() {
    this.data.tempshoucangList[this.data.tags] = !this.data.tempshoucangList[this.data.tags]
    console.log(this.data.ShouCang[this.data.tags]);
    wx.showToast({
      title: this.data.tempshoucangList[this.data.tags]?'加入收藏' : '取消收藏',
    })
    let type = this.data.ShouCang[this.data.tags].type
    let shijiIndex = this.data.ShouCang[this.data.tags].index
    // console.log(app.globalData.shoucang);
    console.log(type);
    if(type == "DanXuan"){
      console.log('单选',shijiIndex);
      app.globalData.shoucang.danxuan[shijiIndex-1] = !app.globalData.shoucang.danxuan[shijiIndex-1]
    }else if(type == "DuoXuan"){
      console.log('多选',shijiIndex);
      app.globalData.shoucang.duoxuan[shijiIndex-1] = !app.globalData.shoucang.duoxuan[shijiIndex-1]
    }else if(type == "PanDuan"){
      console.log('判断',shijiIndex);
      app.globalData.shoucang.panduan[shijiIndex-1] = !app.globalData.shoucang.panduan[shijiIndex-1]
    }
    console.log(app.globalData.shoucang);
    this.setData({
      tempshoucangList: this.data.tempshoucangList,      
    })
    wx.cloud.callFunction({
      name: 'updateshoucang',
      data: {
        questionIndex: this.data.questionIndex,        
        shoucang: app.globalData.shoucang
      }
    })    
  }
  
})