// pages/liangcheng/liangcheng.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chuanshu_kind: ['电流mA', '电流A', '电压V'],
    kind_index: 0,
    ma_l: 4,
    ma_h: 20,
    liangcheng_l: null,
    liangcheng_h: null,
    current_value: null,
    current_ma: null,
    xishu_k: null,
    xishu_b: null

  },

  king_change(e){
    this.setData({
      kind_index: e.detail.value
    })
    if(e.detail.value == 0){
      this.setData({
        ma_l:4,
        ma_h:20
      })
    }
    else if(e.detail.value == 1){
      this.setData({
        ma_l: 0.004,
        ma_h: 0.02
      })
    }
    else{
      this.setData({
        ma_l:1,
        ma_h:5
      })
    }
  },
  change_ma_l(e){
    this.setData({
      ma_l: e.detail.value
    })
  },
  change_ma_h(e){
    this.setData({
      ma_h: e.detail.value
    })
  },
  change_liangcheng_h(e){
    this.setData({
      liangcheng_h: e.detail.value
    })
  },
  change_liangcheng_l(e){
    this.setData({
      liangcheng_l: e.detail.value
    })
  },
  change_xishu_k(e){
    this.setData({
      xishu_k: e.detail.value
    })
  },
  change_xishu_b(e){
    this.setData({
      xishu_b: e.detail.value
    })
  },
  change_current_value(e){
    this.setData({
      current_value: e.detail.value
    })
  },
  change_current_ma(e){
    this.setData({
      current_ma: e.detail.value
    })
  },
  from_kb(){
    let k = this.data.xishu_k
    let b = this.data.xishu_b
    let h = this.data.ma_h
    let l = this.data.ma_l
    if((k != null && k != '') && (b != null && b != '')){ 
      let temp_h = k * h + b
      let temp_l = k * l + b
      this.setData({
        liangcheng_h: temp_h,
        liangcheng_l: temp_l
      })
    }
  },
  from_hl(){
    let h = this.data.liangcheng_h
    let l = this.data.liangcheng_l
    let ma_h = this.data.ma_h
    let ma_l = this.data.ma_l
    if((h != null && h != '') && (l != null && l != '')){ 
      let k = (h - l)/(ma_h - ma_l)
    let b = h - k * ma_h
    this.setData({
      xishu_k: k,
      xishu_b: b
    })
    }    
  },
  from_current(){
    let h = this.data.liangcheng_h
    let l = this.data.liangcheng_l
    let ma_h = this.data.ma_h
    let ma_l = this.data.ma_l
    let current_value = this.data.current_value
    let current_ma = this.data.current_ma
    if((current_value != null && current_value != '') && (current_ma != null && current_ma != '')){ 
      //上限为空，计算下限
      if((h == null || h == '') && (l != null && l != '')){
        let k = (current_value - l)/(current_ma - ma_l)
        let b = l - k * ma_l
        this.setData({
          xishu_k: k,
          xishu_b: b,
          liangcheng_h: k * ma_h + b
        })
      }
      //下限为空，计算上限
      else if((l == null || l == '') && (h != null && h != '')){
        let k = (current_value - h)/(current_ma - ma_h)
        let b = h - k * ma_h
        this.setData({
          xishu_k: k,
          xishu_b: b,
          liangcheng_l: k * ma_l + b
        })
      }

          
    }   
  },
  calc_current_ma(){

    if(this.data.current_value != null && this.data.current_value != ''){
      this.setData({
        current_ma: (this.data.current_value - this.data.xishu_b)/this.data.xishu_k
      })
    }
  },
  calc_current_value(){
    if(this.data.current_ma != null && this.data.current_ma != ''){
      this.setData({
        current_ma: this.data.current_ma * this.data.xishu_k + this.data.xishu_b
      })
    }

  },
  
  /**
   * 生命周期函数--监听页面加载
   */
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