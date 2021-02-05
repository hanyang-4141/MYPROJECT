// pages/simple/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color: '#F00',
    idx: 0,
    buttontext: '下一个',
    score: 0,
    score_arr: [0,0,0,0,0,0,0,0,0,0],
    code_arr: ['M','M','M','M','M','M','M','M','M','M'],
    options: [],
    rightCode: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSource().then((res)=>{
      this.setData({
        source: res
      })
    });
    this.getResult().then(res=>{
      this.setData({
        score_arr: res
      })
    });
    this.getCodeResult().then(res=>{
      this.setData({
        code_arr: res
      })
    });
    let idx = this.data.idx;
    this.generate().then(res=>{
      let arr = res;
      this.setData({
        arr
      }, function() {
        // this is setData callback
        this.getQuestion(arr[idx]);
        this.getOptions(arr[idx]);
      })
    });

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
  getResult: function(){
    return new Promise(function (resolve, reject) {
      resolve(wx.getStorageSync('score_arr'))
    }).catch(res=>{
      console.log('catch',res)
    });
  },
  getCodeResult: function(){
    return new Promise(function (resolve, reject) {
      resolve(wx.getStorageSync('code_arr'))
    }).catch(res=>{
      console.log('catch',res)
    });
  },
  generate: function(){
    return new Promise(function (resolve, reject) {
      resolve(wx.getStorageSync('arr'))
    }).catch(res=>{
      console.log('catch',res)
    });
  },
  getSource: function(){
    return new Promise(function (resolve, reject) {
      resolve(wx.getStorageSync('source'))
    }).catch(res=>{
      console.log('catch',res)
    });
  },  
  radioChange: function(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);
    let score = this.data.score;
    score += parseInt(e.detail.value);
    this.setData({
      score
    });
  },  
  onNextTap: function(){
    let source = this.data.source;
    let score = this.data.score;
    let arr = this.data.arr;

    let idx = this.data.idx;
    let buttontext = this.data.buttontext;
    idx++;
    if(idx==9){
      buttontext = '返回';
    }
    if(idx==10){
      switch(source){
        case 'score':
            this.bindgohome();
            break;
        case 'history':
            this.bindgoHistory();
            break;
        default:
            console.log('其他异常情况');
      }
      return;
    }
    this.setData({
      idx,
      buttontext
    })
    
    this.getQuestion(arr[idx]);
    this.getOptions(arr[idx]);    
  },
  bindgohome: function(){
    let url = '/pages/home/index';
    wx.switchTab({
      url: url
    })
  },  
  bindgoHistory: function(){
    let url = '/pages/history/index';
    wx.redirectTo({
      url: url
    })
  },    
  getQuestion: function(id){
    let _this = this;
    wx.request({
      url: 'https://www.xiaomutong.com.cn/web/index.php?r=question/getquestionbyid',
      method: 'post',
      data: {
        id: id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log(res.data);
        let question = res.data.result;
        _this.setData({
          question: question
        })
      }
    });
  },
  getOptions: function(id){
    let _this = this;
    wx.request({
      url: 'https://www.xiaomutong.com.cn/web/index.php?r=answer/getanswersbyqid',
      method: 'post',
      data: {
        qid: id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        let rightCode = _this.data.rightCode;
        console.log(res.data);
        let options = res.data.result;
        let format_options = options.map(function(item){
          item.checked = item.value == 1 ? true : false;
          if(item.checked){
            rightCode = item.code;
          }
          return item;
        });
        console.log("格式化");
        console.log(format_options);
        _this.setData({
          rightCode,
          options: format_options
        })
      }
    });
  }
})