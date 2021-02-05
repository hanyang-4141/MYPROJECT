// pages/duoxuan/duoxuan.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    questions: [],
    tags : 0,
    afterclick: false,
    currentanswer: null,
    answererror: false,
    hidden: true
    

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    db.collection('questionBank').get({
      success: res=> {
        console.log(res);
        this.setData({
          questions: res.data[1].question
        })
        
        
      }
  })
  },
  beforeQuestion(){
    if(this.data.tags < 1){
      return
    }    
    this.setData({
      afterclick: false,
      tags: this.data.tags - 1,
      answererror: false,
      hidden:true
    })
  },
  afterQuestion(){
    if (this.data.tags + 2 > this.data.questions.length){
      return
    }
      this.setData({
        afterclick: false,
        tags: this.data.tags + 1,
        answererror: false,
        hidden:true
      })
  },
  submitclick(){
    // console.log(this.data.questions[this.data.tags].answer);
    let chooseArr = this.data.questions[this.data.tags].options;
    let rightanswer = this.data.questions[this.data.tags].answer
    let tempanswer = ''
    chooseArr.forEach(item =>{
      if(item.checked == true){
        tempanswer += item.value
      }
    })
    console.log(tempanswer,rightanswer);
    if(tempanswer === rightanswer){
      console.log("回答正确");
      this.setData({
        hidden: false
      })
    }
    else{
      console.log("回答错误");
      chooseArr.forEach(item =>{
        item.checked = false
        if(rightanswer.indexOf(item.value) != -1){
          item.checked = true
        }
      })
      console.log(chooseArr);
      this.setData({
        answererror: true,
        questions:this.data.questions,
        hidden: false
      })
      
    }
  },
  chooseAnswer(res){
    let chooseArr = this.data.questions[this.data.tags].options;
    let index = res.currentTarget.dataset.index;        
    chooseArr[index].checked = !chooseArr[index].checked

    // console.log(index);
    
    this.setData({
      questions: this.data.questions,
      // afterclick: true
    })
    // console.log('当前选择为:' + chooseArr[index].value);
    // console.log('正确答案:' + this.data.questions[this.data.tags].answer);
  },

})