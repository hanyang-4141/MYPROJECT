// components/tongji-item/tongji-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tongjiitems:Object
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // tap_change(e){
    //   wx.navigateTo({
    //     url: '../../pages/shenqing/shenqing',
    //     success:(res) => {
    //       res.eventChannel.emit('acceptDataFromOpenerPage', this.properties.tongjiitems)
    //     }
    //   })
    //   console.log(this.properties.tongjiitems);
      
    // }
    handle_selectitem(){
      this.triggerEvent("itemselect", this.properties.tongjiitems)
    }
  }
})
