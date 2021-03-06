// pages/shoucang/shoucang.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    KaoShi:'',
    tags: 0,
    answererror: '',
    hidden: true

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('shoucangoptions', options);
    var newArr = []
    let json_str = options.questionIndex=='1'?JSON.stringify(app.globalData.Questions_dianqi.data[0].DanXuan): JSON.stringify(app.globalData.Questions.data[0].DanXuan)
    let json_arry = JSON.parse(json_str)
    app.globalData.shoucang.danxuan.forEach((item, index)=>{
      if(item){
        newArr.push(json_arry[index])
      }
    })
    console.log(newArr);
    json_str = options.questionIndex=='1'?JSON.stringify(app.globalData.Questions_dianqi.data[1].DuoXuan):JSON.stringify(app.globalData.Questions.data[1].DuoXuan)
    json_arry = JSON.parse(json_str)
    app.globalData.shoucang.duoxuan.forEach((item, index)=>{
      if(item){
        newArr.push(json_arry[index])
      }
    })
    json_str = options.questionIndex=='1'?JSON.stringify(app.globalData.Questions_dianqi.data[2].PanDuan):JSON.stringify(app.globalData.Questions.data[2].PanDuan)
    json_arry = JSON.parse(json_str)
    app.globalData.shoucang.panduan.forEach((item, index)=>{
      if(item){
        newArr.push(json_arry[index])
      }
    })

    this.setData({
      KaoShi: newArr,      
    })

  },
  chooseAnswer(res){    
    let chooseArr = this.data.KaoShi[this.data.tags].options;
    let index = res.currentTarget.dataset.index;  
    if(this.data.KaoShi[this.data.tags].type == 'DuoXuan'){
      //多选   
      chooseArr[index].checked = !chooseArr[index].checked 
      this.setData({
        KaoShi: this.data.KaoShi
      })
    }else{
          
      chooseArr.forEach(item => {
        item.checked = false
      })
      chooseArr[index].checked = true      
      if(chooseArr[index].value != this.data.KaoShi[this.data.tags].answer){
        // console.log('error');
        this.setData({
          answererror: true,
          hidden: false
        })
      }
    }   
    
    this.setData({
      KaoShi: this.data.KaoShi,       
    })        
  },

  submitclick(){
    // console.log(this.data.questions[this.data.tags].answer);
    let chooseArr = this.data.KaoShi[this.data.tags].options;
    let rightanswer = this.data.KaoShi[this.data.tags].answer
    let tempanswer_list = []
    chooseArr.forEach(item =>{
      if(item.checked == true){
        tempanswer_list.push(item.value)
      }
    })
    var tempanswer_str = tempanswer_list.sort().join('')    
    if(tempanswer_str === rightanswer){ 
      this.setData({
        hidden: false
      })
    }
    else{
      chooseArr.forEach(item =>{
        item.checked = false
        if(rightanswer.indexOf(item.value) != -1){
          item.checked = true
        }
      })
     
      this.setData({
        answererror: true,
        KaoShi:this.data.KaoShi,
        hidden: false
      })      
    }
    // setTimeout(this.afterQuestion, 500)
  },

  beforeQuestion(){
    if(this.data.tags < 1){
      return
    }    
    this.setData({      
      tags: this.data.tags - 1,    
      answererror: false, 
      hidden: true 
    })
  },
  afterQuestion(){
    if (this.data.tags + 2 > this.data.KaoShi.length){
      //交卷
      return      
    }   
      this.setData({        
        tags: this.data.tags + 1,    
        answererror: false,    
        hidden: true
      })      
  },

 
  
})