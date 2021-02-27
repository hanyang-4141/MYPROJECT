// pages/test/test.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  ArryRandom(arr){
    arr.sort(function(){
        return Math.random()-0.5;
    });    
},

  test(){
    
    var tempstr = JSON.stringify(app.globalData.Questions.data[0].DanXuan)
    var temparr = JSON.parse(tempstr)
    var temp = []
    temparr.forEach(item=>{
      temp.push(item)
    })
    // var hehe = [0,1,2,3,4,5,6,7]
    // this.method3(hehe)
    temparr.forEach(item=>{
      this.ArryRandom(item.options)
    })
    // console.log(temparr);
    var gaga = ['B','D','C','A']
    var heihei = gaga.sort()
  console.log(heihei);
  var str = heihei.join('')
  console.log(str);
    

    
  },
  onLoad: function (options) {

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