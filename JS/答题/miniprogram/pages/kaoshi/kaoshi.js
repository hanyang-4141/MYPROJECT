// pages/kaoshi/kaoshi.js
const gongju = require('../../utils/tools')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    danxuanSum:35,
    duoxuanSum:30,
    panduanSum:35,
    KaoShi: null,
    tags: 0,
    DaTiKa: [],
    FenShu: 0,
    modalName: null,    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.danxuanSum = app.globalData.danxuanSum
    this.data.duoxuanSum = app.globalData.duoxuanSum
    this.data.panduanSum = app.globalData.panduanSum
    let json_str = options.questionIndex=='1'?JSON.stringify(app.globalData.Questions_dianqi.data[0].DanXuan): JSON.stringify(app.globalData.Questions.data[0].DanXuan)
    let json_arry = JSON.parse(json_str)    //深拷贝
    var newArr = []
    var tempArr = gongju.shuffle(json_arry)    
    newArr = newArr.concat(tempArr.slice(0, this.data.danxuanSum))      
    json_str = options.questionIndex=='1'?JSON.stringify(app.globalData.Questions_dianqi.data[1].DuoXuan):JSON.stringify(app.globalData.Questions.data[1].DuoXuan)
    json_arry = JSON.parse(json_str)    //深拷贝
    tempArr = gongju.shuffle(json_arry)    
    newArr = newArr.concat(tempArr.slice(0, this.data.duoxuanSum))
    json_str = options.questionIndex=='1'?JSON.stringify(app.globalData.Questions_dianqi.data[2].PanDuan):JSON.stringify(app.globalData.Questions.data[2].PanDuan)
    json_arry = JSON.parse(json_str)    //深拷贝
    tempArr = gongju.shuffle(json_arry)
    newArr = newArr.concat(tempArr.slice(0, this.data.panduanSum))
    gongju.shuffle(newArr)
    //选项随机排列
    newArr.forEach(item=>{
      let pos = item.title.indexOf('、')
      item.title = item.title.substr(pos + 1)
      gongju.shuffle(item.options)
    })
    let sum = this.data.danxuanSum + this.data.duoxuanSum + this.data.panduanSum
    let tempDaTiKa = []
    for(let i=0; i < sum; i++){
      tempDaTiKa.push(false)
    }
    this.setData({
      KaoShi: newArr,
      DaTiKa:tempDaTiKa
    })
    // console.log(this.data.DaTiKa);
    // console.log(this.data.KaoShi);
  },

  chooseAnswer(res){    
    let chooseArr = this.data.KaoShi[this.data.tags].options;
    let index = res.currentTarget.dataset.index;  
    if(this.data.KaoShi[this.data.tags].type == 'DuoXuan'){
      //多选   
      chooseArr[index].checked = !chooseArr[index].checked 
      let tempanswer_list = []
      chooseArr.forEach(item =>{
      if(item.checked == true){
        tempanswer_list.push(item.value)
      }
    })
    var tempanswer_str = tempanswer_list.sort().join('')
      // console.log(temp);
      if(this.data.KaoShi[this.data.tags].answer == tempanswer_str){
        this.data.DaTiKa[this.data.tags] = true
        // console.log('dui');
      }else{
        this.data.DaTiKa[this.data.tags] = false
        // console.log('cuo');
      }
    }else{
      // 单选题 或 判断
      // console.log('danxuan  huo  panduan');      
      chooseArr.forEach(item => {
        item.checked = false
      })
      chooseArr[index].checked = true
      if(this.data.KaoShi[this.data.tags].answer == res.currentTarget.dataset.value){
        // console.log('zhengque');
        this.data.DaTiKa[this.data.tags] = true
      }else{
        // console.log('cuowu');
        this.data.DaTiKa[this.data.tags] = false
      }
    }   
    this.setData({
      KaoShi: this.data.KaoShi, 
      DaTiKa: this.data.DaTiKa
    })    
    // console.log(this.data.DaTiKa);
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
      //交卷
      var sum = this.data.DaTiKa.filter(Boolean).length
      this.setData({
        FenShu: Math.round(sum * 100 /this.data.KaoShi.length),
        modalName: 'bottomModal',
      })
      return
    }   
      this.setData({        
        tags: this.data.tags + 1,        
      })      
  },

  showModal(res) { 
    var sum = this.data.DaTiKa.filter(Boolean).length      
    this.setData({
      FenShu: Math.round(sum * 100 /this.data.KaoShi.length),
      modalName: res.currentTarget.dataset.target,      
    })
  },

  hideModal(res) {
    this.setData({
      modalName: null
    })
  },

  cardClick: function(res) {    
    var cardIndex = res.currentTarget.dataset.index;   
    this.setData({
      tags: cardIndex,
      modalName: null,
    })
  },
  goMain(res){
    var cardIndex = res.currentTarget.dataset.index;
    this.setData({
      tags: cardIndex,
      modalName: null,
    })
    wx.showModal({
      title: '提示',
      content: '是否退出考试？',
      success (res) {
        if (res.confirm) {
          // console.log('用户点击确定')
          wx.reLaunch({
            url: '../index/index',
          })
        } else if (res.cancel) {
          // console.log('用户点击取消')
        }
      }
    })
  },
  ArryRandom(arr){
    arr.sort(function(){
        return Math.random()-0.5;
    });    
},
})