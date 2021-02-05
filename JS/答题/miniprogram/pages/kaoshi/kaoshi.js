// pages/kaoshi/kaoshi.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    danxuanSum:5,
    duoxuanSum:2,
    panduanSum:5,
    KaoShi: null,
    tags: 0,
    DaTiKa: [],
    FenShu: 100
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var tempArr = []
    app.globalData.Questions.data[0].DanXuan.forEach(item =>{
      tempArr.push(item)
      
    })    
    // console.log(tempArr);
    var newArr = [];
        while (newArr.length < this.data.danxuanSum) {
          var index = parseInt(Math.random() * tempArr.length);
          newArr = newArr.concat(tempArr.splice(index, 1)) 
          this.data.DaTiKa.push(false)
        }
    // console.log(newArr);
    tempArr = []
    app.globalData.Questions.data[1].DuoXuan.forEach(item =>{
      tempArr.push(item)      
    })    
    while (newArr.length < (this.data.danxuanSum + this.data.duoxuanSum)) {
      var index = parseInt(Math.random() * tempArr.length);
      newArr = newArr.concat(tempArr.splice(index, 1)) 
      this.data.DaTiKa.push(false)
    }
    tempArr = []
    app.globalData.Questions.data[2].PanDuan.forEach(item =>{
      tempArr.push(item)      
    })    
    while (newArr.length < (this.data.danxuanSum + this.data.duoxuanSum + this.data.panduanSum)) {
      var index = parseInt(Math.random() * tempArr.length);
      newArr = newArr.concat(tempArr.splice(index, 1)) 
      this.data.DaTiKa.push(false)
    }
    console.log(newArr);
    this.setData({
      KaoShi: newArr,
      DaTiKa:this.data.DaTiKa
    })
    console.log(this.data.DaTiKa);
  },

  chooseAnswer(res){
    
    let chooseArr = this.data.KaoShi[this.data.tags].options;
    let index = res.currentTarget.dataset.index;  
    
  
    
    if(this.data.tags >= this.data.danxuanSum && this.data.tags < (this.data.danxuanSum + this.data.duoxuanSum)){
      //多选
      console.log('duo xuan');
      chooseArr[index].checked = !chooseArr[index].checked
      // console.log(chooseArr);
      var temp = ''
      chooseArr.forEach(item =>{
        if(item.checked == true){
          temp += item.value
        }
        
      })
      console.log(temp);
      if(this.data.KaoShi[this.data.tags].answer == temp){
        this.data.DaTiKa[this.data.tags] = true
        console.log('dui');
      }else{
        this.data.DaTiKa[this.data.tags] = false
        console.log('cuo');
      }

    }else{
      // 单选题 或 判断
      console.log('danxuan  huo  panduan');      
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
    // temptitle = this.data.KaoShi[this.data.tags].title
    // i = temptitle.indexOf('、')
    // title = temptitle.substring(i)
    this.setData({
      KaoShi: this.data.KaoShi, 
      DaTiKa: this.data.DaTiKa
    })    
    console.log(this.data.DaTiKa);
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
    // var answer = this.data.KaoShi[tags].answer

    if (this.data.tags + 2 > this.data.KaoShi.length){
      //交卷
      var sum = this.data.DaTiKa.filter(Boolean).length
      this.setData({
        FenShu: Math.round(sum * 100 /this.data.KaoShi.length)
      })
      console.log('总分：',this.data.FenShu);
      return
    }
    // console.log(this.data.DaTiKa);
      this.setData({        
        tags: this.data.tags + 1,        
      })
      
  },

})