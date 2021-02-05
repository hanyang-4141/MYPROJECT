// pages/kaoshi/kaoshi.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    KaoShi: null,
    tags: 0,
    DaTiKa: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var tempArr = []
    app.globalData.Questions.data[0].DanXuan.forEach(item =>{
      tempArr.push(item)
    })    
    // console.log(tempArr);
    var newArr = [];
        while (newArr.length < 40) {
          var index = parseInt(Math.random() * tempArr.length);
          newArr = newArr.concat(tempArr.splice(index, 1)) 
        }
    // console.log(newArr);
    tempArr = []
    app.globalData.Questions.data[1].DuoXuan.forEach(item =>{
      tempArr.push(item)
    })    
    while (newArr.length < 60) {
      var index = parseInt(Math.random() * tempArr.length);
      newArr = newArr.concat(tempArr.splice(index, 1)) 
    }
    tempArr = []
    app.globalData.Questions.data[2].PanDuan.forEach(item =>{
      tempArr.push(item)
    })    
    while (newArr.length < 100) {
      var index = parseInt(Math.random() * tempArr.length);
      newArr = newArr.concat(tempArr.splice(index, 1)) 
    }
    console.log(newArr);
    this.setData({
      KaoShi: newArr
    })
  },

  chooseAnswer(res){
    
    let chooseArr = this.data.KaoShi[this.data.tags].options;
    let index = res.currentTarget.dataset.index;    
    chooseArr.forEach(item => {
      item.checked = false
    })
    chooseArr[index].checked = true
    
    // temptitle = this.data.KaoShi[this.data.tags].title
    // i = temptitle.indexOf('、')
    // title = temptitle.substring(i)
    this.setData({
      KaoShi: this.data.KaoShi, 
    })    
  },

  beforeQuestion(){
    if(this.data.tags < 1){
      return
    }    
    this.setData({      
      tags: this.data.tags - 1,      
    })
  },
  afterQuestion(){
    if (this.data.tags + 2 > this.data.KaoShi.length){
      return
    }
      this.setData({        
        tags: this.data.tags + 1,        
      })
      if(this.data.tags==100){
        console.log('jaojuan');
      }
  },

})