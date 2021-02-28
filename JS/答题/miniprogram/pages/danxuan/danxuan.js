// miniprogram/pages/dati/dati.js
const gongju = require('../../utils/tools')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    DanXuan: [],
    shoucang: [],
    shijiIndex: 0,
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

    var item = this.data.DanXuan[this.data.tags]   
    let pos = item.title.indexOf('、')
    var itemIndex = item.title.substring(0,pos)
    this.setData({      
      shijiIndex: itemIndex
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

    var item = this.data.DanXuan[this.data.tags]   
    let pos = item.title.indexOf('、')
    var itemIndex = item.title.substring(0,pos)
    this.setData({      
      shijiIndex: itemIndex
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
    
    setTimeout(this.afterQuestion, 500)
  },
  onLoad: function (options) {
    let json_str = JSON.stringify(app.globalData.Questions.data[0].DanXuan)
    let json_arry = JSON.parse(json_str)    //深拷贝  
    // for(let i=0; i<json_arry.length; i++){
    //   this.data.shoucang.push(false)
    // }
    // console.log(app.globalData.questionsXipai);
    if(app.globalData.optionsXipai){
      gongju.shuffle(json_arry)
    }
    // var newArr = gongju.shuffle(json_arry)
    //选项随机排列
    if(app.globalData.optionsXipai){
      json_arry.forEach(item=>{      
        gongju.shuffle(item.options)
      })
    }    
    this.setData({
      DanXuan: json_arry,
      shoucang: app.globalData.shoucang
    })

    var item = this.data.DanXuan[this.data.tags]   
    let pos = item.title.indexOf('、')
    var itemIndex = item.title.substring(0,pos)
    this.setData({      
      shijiIndex: itemIndex
    })
      


  },
  ShouCang(){
    
    this.data.shoucang[this.data.shijiIndex-1] = !this.data.shoucang[this.data.shijiIndex-1]
    this.setData({
      shoucang: this.data.shoucang,      
    }) 
    wx.cloud.callFunction({
      name: 'updateshoucang',
      data:{
        Type: 'DanXuan',
        shoucang: this.data.shoucang
      }
    })
  },
  
})