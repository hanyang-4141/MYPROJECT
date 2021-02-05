//index.js
const app = getApp()
const db =wx.cloud.database()
const cmd = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img_url:'',
    userinfo:'',
    username:'default',
    input1:'',
    input2:'',
    input3:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.cloud.init({
    //   env: 'test-env-pi5z3',
    //   traceUser: true
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
    
  },

  onGetUserInfo(e){
    console.log(e);
    this.setData({
      img_url: e.detail.userInfo.avatarUrl,
      userinfo: e.detail.userInfo,
      username:e.detail.userInfo.nickName
    })
  },
  GetuserInfo(e){
    console.log(e);
    this.setData({
      img_url: e.detail.userInfo.avatarUrl,
      username: e.detail.userInfo.nickName
    })
  },
  tapfunction1(){
    console.log("chaxun");
    db.collection("students")
    .where({
      name: new db.RegExp({
        regexp: '小.*',
        options:'i'
      })
    })
    // .field({
    //   name:true
    // })
    // .where({
    //   '成绩': cmd.gte(500)
    // })
    .get().then(console.log)  
  },

  tapfunction2(){
    console.log("插入");
    console.log(this.data.input1);
    
    db.collection("students").add({
      data:{
        name:this.data.input1,
        age:this.data.input2,
        成绩:this.data.input3
      }
    }).then(console.log)
    
  },
  inputfunction1(e){
    console.log(e);
    this.setData({
      input1: e.detail.value
    })
    
  },
  inputfunction2(e){
    console.log(e);
    this.setData({
      input2: e.detail.value
    })
  },
  inputfunction3(e){
    console.log(e);
    this.setData({
      input3: e.detail.value
    })
  },
  getid(e){
    wx.cloud.callFunction({
      name:'add2'
    }).then(res =>{
      console.log(res);
      
    })
    
  },
  addfunction(){
    wx.cloud.callFunction({
      name: 'add',
      data:{
        a: 11,
        b: 22
      }
    }).then(res =>{
      console.log(res);
      
      wx.showToast({
        title: 'title' ,
      })
    })
  },
  shenqing(){
    wx.redirectTo({
      url: '../shenqing/shenqing',
    })
  }
})