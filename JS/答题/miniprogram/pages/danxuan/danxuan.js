// miniprogram/pages/dati/dati.js
const gongju = require('../../utils/tools')
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
    let json_str = JSON.stringify(app.globalData.Questions.data[0].DanXuan)
    let json_arry = JSON.parse(json_str)    //深拷贝
    //------------------------------------------
    // let tempArr = []    
    // json_arry.forEach(item =>{
    //   tempArr.push(item)
    // })    
    // // console.log(tempArr);
    // var newArr = [];
    //     while (tempArr.length) {
    //       var index = parseInt(Math.random() * tempArr.length);
    //       newArr = newArr.concat(tempArr.splice(index, 1)) 
    //     }
      
    //------------------------------------------
    var newArr = gongju.shuffle(json_arry)
    //选项随机排列
    newArr.forEach(item=>{
      // this.ArryRandom(item.options)
      gongju.shuffle(item.options)
    })
    this.setData({
      DanXuan: newArr
    })
  },
//   ArryRandom(arr){
//     arr.sort(function(){
//         return Math.random()-0.5;
//     });    
// },
  
})