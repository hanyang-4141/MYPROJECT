// miniprogram/pages/dati/dati.js

var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    DanXuan: [],
    // chooseArr: [],    
    tags : 0,   
    afterclick: false,
    hidden: true,
    answererror: false,

    // questions: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
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
    if (this.data.tags + 2 > this.data.DanXuan.length){
      return
    }
      this.setData({
        afterclick: false,
        tags: this.data.tags + 1,
        answererror: false,
        hidden: true
      })
  },
  chooseAnswer(res){
    
    let chooseArr = this.data.DanXuan[this.data.tags].options;
    let index = res.currentTarget.dataset.index;    
    chooseArr.forEach(item => {
      item.checked = false
    }
    )
    chooseArr[index].checked = true
    if(chooseArr[index].value != this.data.DanXuan[this.data.tags].answer){
      // console.log('error');
      this.setData({
        answererror: true
      })
    }
    this.setData({
      DanXuan: this.data.DanXuan,
      afterclick: true,
      hidden: false
    })    
  },
  onLoad: function (options) {
    var tempArr = []    
    app.globalData.Questions.data[0].DanXuan.forEach(item =>{
      tempArr.push(item)
    })    
    // console.log(tempArr);
    var newArr = [];
        while (tempArr.length) {
          var index = parseInt(Math.random() * tempArr.length);
          newArr = newArr.concat(tempArr.splice(index, 1)) 
        }
    this.setData({
      DanXuan: newArr
    })
    
          
          
    //     }
    // })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})