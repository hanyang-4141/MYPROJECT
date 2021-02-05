// pages/register/register.js
var app = getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    usernameArry:['','张三','李四','王五'],
    usernameIndex:0,
    username:'',
    banzuArray:['','自动043','自动053','自动063','自动073'],
    banzuIndex:0,
    banzu:'',
    openid:'',
    realname:'',
    member:['规划','的风格','弱覆盖','让他','钢铁化工','地方','你们','法国人'],
    need_member:[],
    showmember:false
  },
  show_member(){
    console.log('dianji');
    
    this.setData({
      showmember:!this.data.showmember
    })
  },
  handle_member(e){
    console.log(e);
    
    this.setData({
      need_member:[...this.data.need_member, e.target.dataset.name],
      showmember:false
    })
    console.log(this.data.need_member);
    
  },
  handle_del_member(e){
    console.log(e.currentTarget.dataset.id);
    wx.showModal({
      title: '提示',
      content: '这是一个模态弹窗',
      success:res=>{
        if (res.confirm) {
          console.log('用户点击确定')
          this.data.need_member.splice(e.currentTarget.dataset.id, 1)        
          this.setData({
            need_member:this.data.need_member
            // need_member:this.data.need_member.splice(e.currentTarget.dataset.id, 1)
    })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

    
    
  },

  onLoad: function (options) {
   
    
    
  },
})