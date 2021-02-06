// pages/panduan/panduan.js
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
    var tempArr = []
    app.globalData.Questions.data[2].PanDuan.forEach(item =>{
      tempArr.push(item)
    })    
    // console.log(tempArr);
    var newArr = [];
        while (tempArr.length) {
          var index = parseInt(Math.random() * tempArr.length);
          newArr = newArr.concat(tempArr.splice(index, 1)) 
        }

    this.setData({
      PanDuan: newArr
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
  },
  beforeQuestion(){
    if(this.data.tags < 1){
      return
    }    
    this.setData({
      afterclick: false,
      tags: this.data.tags - 1,
      answererror: false,
      hidden: true
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
        hidden: true
      })
  },
  
})