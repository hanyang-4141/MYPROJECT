// pages/shenqing/shenqing.js
const db = wx.cloud.database()
const cmd = db.command
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    selecteddata:{
      _id:'',
      neirong:'',
      jizu:'',
      sqr:'',
      shenqingdate:'',
      shenqingtime:'',
      sqpzr:'',
      shenqingpizhundate:'',
      shenqingpizhuntime:'',
      czr:'',
      caozuodate:'',
      caozuotime:'',
      hfpzr:'',
      huifupizhundate:'',
      huifupizhuntime:'',
      hfr:'',
      huifudate:'',
      huifutime:''
   },
    array:['#1机组','#2机组','#3机组','#4机组'],
  },
  submit(){
    var that = this
    // console.log(this.data.selecteddata);
    // console.log(this.data.selecteddata.shenqingdate);
    if (this.data.selecteddata.jizu == '') {
      wx.showToast({
        title: 'jizu为空',
      })
      return
    }
    if (this.data.selecteddata.neirong == '') {
      wx.showToast({
        title: '内容为空',
      })
      return
    }
    if (this.data.selecteddata.sqr == '') {
      wx.showToast({
        title: '申请人为空',
      })
      return
    }
    if (this.data.selecteddata.shenqingdate == '') {
      wx.showToast({
        title: '申请日期为空',
      })
      return
    }
    if (this.data.selecteddata.shenqingtime == '') {
      wx.showToast({
        title: '申请时间为空',
      })
      return
    }
    if (this.data.selecteddata.sqpzr == '') {
      wx.showToast({
        title: '申请批准人为空',
      })
      return
    }
    if (this.data.selecteddata.shenqingpizhundate == '') {
      wx.showToast({
        title: '申请批准日期为空',
      })
      return
    }
    if (this.data.selecteddata.shenqingpizhuntime == '') {
      wx.showToast({
        title: '申请批准时间为空',
      })
      return
    }
    if (this.data.selecteddata.czr == '') {
      wx.showToast({
        title: '操作人为空',
      })
      return
    }
    if (this.data.selecteddata.caozuodate == '') {
      wx.showToast({
        title: '操作日期为空',
      })
      return
    }
    if (this.data.selecteddata.caozuotime == '') {
      wx.showToast({
        title: '操作时间为空',
      })
      return
    }
    let gonext = false;
    if ((this.data.selecteddata.hfpzr == '' && this.data.selecteddata.huifupizhundate == '' && this.data.selecteddata.huifupizhuntime == '' &&
        this.data.selecteddata.hfr == '' && this.data.selecteddata.huifudate == '' && this.data.selecteddata.huifutime == '') || 
        (this.data.selecteddata.hfpzr != '' && this.data.selecteddata.huifupizhundate != '' && this.data.selecteddata.huifupizhuntime != '' &&
        this.data.selecteddata.hfr != '' && this.data.selecteddata.huifudate != '' && this.data.selecteddata.huifutime != '')){
          gonext = true
        }
    else{
      wx.showToast({
        title: '元素为空',
      })
      return
    }
    // 记录已经存在
    if (this.data.selecteddata._id != ''){
      console.log("记录已经存在,xiugai");
      wx.cloud.callFunction({
        name:"changemydata",
        data:{
          _id:this.data.selecteddata._id,
          neirong: this.data.selecteddata.neirong,
          jizu:this.data.selecteddata.jizu,
          sqr: this.data.selecteddata.sqr,
          shenqingdate: this.data.selecteddata.shenqingdate,
          shenqingtime:this.data.selecteddata.shenqingtime,
          sqpzr: this.data.selecteddata.sqpzr,
          shenqingpizhundate:this.data.selecteddata.shenqingpizhundate,
          shenqingpizhuntime:this.data.selecteddata.shenqingpizhuntime,
          czr: this.data.selecteddata.czr,
          caozuodate:this.data.selecteddata.caozuodate,
          caozuotime:this.data.selecteddata.caozuotime,
          hfpzr: this.data.selecteddata.hfpzr,
          huifupizhundate:this.data.selecteddata.huifupizhundate,
          huifupizhuntime:this.data.selecteddata.huifupizhuntime,
          hfr: this.data.selecteddata.hfr,
          huifudate:this.data.selecteddata.huifudate,
          huifutime:this.data.selecteddata.huifutime,
        }
      }).then(res=>{
        wx.navigateTo({
          url: '../tongji/tongji',
        })
      })
      
      // db.collection("baohu").where({
      //   _id:this.data.selecteddata._id
      // })
      // .update({
      //   data:{
      //     neirong: this.data.selecteddata.neirong,
      //     jizu:this.data.selecteddata.jizu,
      //     sqr: this.data.selecteddata.sqr,
      //     shenqingdate: this.data.selecteddata.shenqingdate,
      //     shenqingtreturnime:this.data.selecteddata.shenqingtime,
      //     sqpzr: this.data.selecteddata.sqpzr,
      //     shenqingpizhundate:this.data.selecteddata.shenqingpizhundate,
      //     shenqingpizhuntime:this.data.selecteddata.shenqingpizhuntime,
      //     czr: this.data.selecteddata.czr,
      //     caozuodate:this.data.selecteddata.caozuodate,
      //     caozuotime:this.data.selecteddata.caozuotime,
      //     hfpzr: this.data.selecteddata.hfpzr,
      //     huifupizhundate:this.data.selecteddata.huifupizhundate,
      //     huifupizhuntime:this.data.selecteddata.huifupizhuntime,
      //     hfr: this.data.selecteddata.hfr,
      //     huifudate:this.data.selecteddata.huifudate,
      //     huifutime:this.data.selecteddata.huifutime,
      //   }
      // })
    }
    else{
      console.log("记录不存在，新增");
      wx.cloud.callFunction({
        name:"addmydata",
        data:{
          neirong: this.data.selecteddata.neirong,
          jizu:this.data.selecteddata.jizu,
          sqr: this.data.selecteddata.sqr,
          shenqingdate: this.data.selecteddata.shenqingdate,
          shenqingtime:this.data.selecteddata.shenqingtime,
          sqpzr: this.data.selecteddata.sqpzr,
          shenqingpizhundate:this.data.selecteddata.shenqingpizhundate,
          shenqingpizhuntime:this.data.selecteddata.shenqingpizhuntime,
          czr: this.data.selecteddata.czr,
          caozuodate:this.data.selecteddata.caozuodate,
          caozuotime:this.data.selecteddata.caozuotime,
          hfpzr: this.data.selecteddata.hfpzr,
          huifupizhundate:this.data.selecteddata.huifupizhundate,
          huifupizhuntime:this.data.selecteddata.huifupizhuntime,
          hfr: this.data.selecteddata.hfr,
          huifudate:this.data.selecteddata.huifudate,
          huifutime:this.data.selecteddata.huifutime,
        }
      }).then(res=>{
        console.log('addmydata返回', res);
        wx.showToast({
          title: '添加成功',
        })
        for( let i in this.data.selecteddata){
        this.data.selecteddata[i]='';
        }
        this.setData({
          selecteddata:this.data.selecteddata
        })
        wx.navigateTo({
          url: '../tongji/tongji',
        })
        // console.log(this.data.selecteddata);
      })
      // db.collection("baohu").add({      
      //   data:{
      //     neirong: this.data.selecteddata.neirong,
      //     jizu:this.data.selecteddata.jizu,
      //     sqr: this.data.selecteddata.sqr,
      //     shenqingdate: this.data.selecteddata.shenqingdate,
      //     shenqingtreturnime:this.data.selecteddata.shenqingtime,
      //     sqpzr: this.data.selecteddata.sqpzr,
      //     shenqingpizhundate:this.data.selecteddata.shenqingpizhundate,
      //     shenqingpizhuntime:this.data.selecteddata.shenqingpizhuntime,
      //     czr: this.data.selecteddata.czr,
      //     caozuodate:this.data.selecteddata.caozuodate,
      //     caozuotime:this.data.selecteddata.caozuotime,
      //     hfpzr: this.data.selecteddata.hfpzr,
      //     huifupizhundate:this.data.selecteddata.huifupizhundate,
      //     huifupizhuntime:this.data.selecteddata.huifupizhuntime,
      //     hfr: this.data.selecteddata.hfr,
      //     huifudate:this.data.selecteddata.huifudate,
      //     huifutime:this.data.selecteddata.huifutime,
      //   }
      // }).then(res =>{
      //   console.log(res);
      //   wx.showToast({
      //     title: '添加成功',
      //   })
      //   for( let i in this.data.selecteddata){
      //     this.data.selecteddata[i]='';
      //   }
      //   this.setData({
      //     selecteddata:this.data.selecteddata
      //   })
      //   console.log(this.data.selecteddata);
      // })
    }
    
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    
    const eventChannel = this.getOpenerEventChannel()
    let mydata={}
    eventChannel.on('acceptDataFromOpenerPage', mydata => {
      // console.log(mydata)
      this.setData({

        selecteddata:mydata.data
      })
      // console.log(this.data.selecteddata);
      // console.log(this.data.selecteddata.neirong);
      
      
    })
    
    
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
  change_sqr(e){
    this.data.selecteddata.sqr = e.detail.value
    this.setData({
      selecteddata:this.data.selecteddata
    })
  },
  change_sq_date(e){
    this.data.selecteddata.shenqingdate = e.detail.value
    this.setData({
      selecteddata:this.data.selecteddata
    })
  },
  change_sq_time(e){
    this.data.selecteddata.shenqingtime = e.detail.value
    this.setData({
      selecteddata:this.data.selecteddata
    })
  },
  change_sqpzr(e){
    this.data.selecteddata.sqpzr = e.detail.value
    this.setData({
      selecteddata:this.data.selecteddata
    })
  },
  change_sqpz_date(e){
    this.data.selecteddata.shenqingpizhundate = e.detail.value
    this.setData({
      selecteddata:this.data.selecteddata
    })
  },
  change_sqpz_time(e){
    this.data.selecteddata.shenqingpizhuntime = e.detail.value
    this.setData({
      selecteddata:this.data.selecteddata
    })
  },
  change_czr(e){
    this.data.selecteddata.czr = e.detail.value
    this.setData({
      selecteddata:this.data.selecteddata
    })
  },
  change_czr_date(e){
    this.data.selecteddata.caozuodate = e.detail.value
    this.setData({
      selecteddata:this.data.selecteddata
    })
  },
  change_czr_time(e){
    this.data.selecteddata.caozuotime = e.detail.value
    this.setData({
      selecteddata:this.data.selecteddata
    })
  },
  change_hfpzr(e){
    this.data.selecteddata.hfpzr = e.detail.value
    this.setData({
      selecteddata:this.data.selecteddata
    })
  },
  change_hfpz_date(e){
    this.data.selecteddata.huifupizhundate = e.detail.value
    this.setData({
      selecteddata:this.data.selecteddata
    })
  },
  change_hfpz_time(e){
    this.data.selecteddata.huifupizhuntime = e.detail.value
    this.setData({
      selecteddata:this.data.selecteddata
    })
  },
  change_hfr(e){
    this.data.selecteddata.hfr = e.detail.value
    this.setData({
      selecteddata:this.data.selecteddata
    })
  },
  change_hfr_date(e){
    this.data.selecteddata.huifudate = e.detail.value
    this.setData({
      selecteddata:this.data.selecteddata
    })
  },
  change_hfr_time(e){
    this.data.selecteddata.huifutime = e.detail.value
    this.setData({
      selecteddata:this.data.selecteddata
    })
  },
  change_jizu(e){
    // '#' + (Number(this.data.index) + 1) + '机组'
    // this.data.selecteddata.jizu = e.detail.value
    this.data.selecteddata.jizu = '#' + (Number(e.detail.value) + 1) + '机组'
    this.setData({
      selecteddata:this.data.selecteddata
    })
    console.log(this.data.selecteddata.jizu);
    
  },
  change_content(e){
    this.data.selecteddata.neirong = e.detail.value
    this.setData({
      selecteddata:this.data.selecteddata
    })
  },
  delitem(){
    wx.cloud.callFunction({
      name:"delmydata",
      data:this.data.selecteddata
    }).then(res=>{
      console.log(res);
      wx.showToast({
        title: '删除成功！',
      })
      wx.redirectTo({
        url: '../tongji/tongji',
      })
      
    }).catch(res=>{
      wx.showToast({
        title: '删除失败！',
      })
    })
  }
})