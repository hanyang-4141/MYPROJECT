// pages/tongji/tongji.js
// const App = App()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectedjizu:'全部',
    isrecover:false,
    content:[],
    hehe:'',
    options:[
      {
        id:'001',
        name:'#1机组'
      },
      {
        id:'002',
        name:'#2机组'
      },
      {
        id:'003',
        name:'#3机组'
      },
      {
        id:'004',
        name:'#4机组'
      }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.tapfun_search();
    
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
  tapfun_new(){
    wx.navigateTo({
      url: '../shenqing/shenqing',
    })
  },
  tapfun_search(){
    wx.cloud.callFunction({
      name:'getmydata',
      data:{
        selectedjizu:this.data.selectedjizu,
        isrecover:this.data.isrecover
      }
    }).then(res=>{
      this.setData({
        content:res.result.data
      })
      console.log(res);      
    }).catch(res=>{
      console.log(res);      
    })
  },
  handle_select(e){
    console.log(e);
    wx.navigateTo({
      url: '../shenqing/shenqing',
      success:res=>{
        res.eventChannel.emit('acceptDataFromOpenerPage', { data: e.detail })
      }
    })
  },
  //选择机组
  change(e){
    // console.log(e.detail.name);
    this.setData({
      selectedjizu:e.detail.name
      
    })
    // console.log(this.data.selectedjizu);
    this.tapfun_search()
  },
  switch_change(e){
    // console.log(e.detail.value);
    this.setData({
      isrecover:e.detail.value
    })
    // console.log(this.data.isrecover);
    this.tapfun_search()
  }

})