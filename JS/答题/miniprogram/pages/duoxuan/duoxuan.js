// pages/duoxuan/duoxuan.js

var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    DuoXuan: [],
    questions: [],
    tags : 0,
    afterclick: false,
    currentanswer: null,
    answererror: false,
    hidden: true
    

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var tempArr = []
    app.globalData.Questions.data[1].DuoXuan.forEach(item =>{
      tempArr.push(item)
    })    
    // console.log(tempArr);
    var newArr = [];
        while (tempArr.length) {
          var index = parseInt(Math.random() * tempArr.length);
          newArr = newArr.concat(tempArr.splice(index, 1)) 
        }
    this.setData({
      DuoXuan: newArr
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
      hidden:true
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
        hidden:true
      })
  },
  submitclick(){
    // console.log(this.data.questions[this.data.tags].answer);
    let chooseArr = this.data.DuoXuan[this.data.tags].options;
    let rightanswer = this.data.DuoXuan[this.data.tags].answer
    let tempanswer = ''
    chooseArr.forEach(item =>{
      if(item.checked == true){
        tempanswer += item.value
      }
    })
    console.log(tempanswer,rightanswer);
    if(tempanswer === rightanswer){
      console.log("回答正确");
      this.setData({
        hidden: false
      })
    }
    else{
      console.log("回答错误");
      chooseArr.forEach(item =>{
        item.checked = false
        if(rightanswer.indexOf(item.value) != -1){
          item.checked = true
        }
      })
      console.log(chooseArr);
      this.setData({
        answererror: true,
        DuoXuan:this.data.DuoXuan,
        hidden: false
      })      
    }
  },
  chooseAnswer(res){
    let chooseArr = this.data.DuoXuan[this.data.tags].options;
    let index = res.currentTarget.dataset.index;        
    chooseArr[index].checked = !chooseArr[index].checked
    this.setData({
      DuoXuan: this.data.DuoXuan,     
    })   
  },

})