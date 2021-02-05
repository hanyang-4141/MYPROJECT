// Componet/Componet.js
Component({
  /**
   * 组件的属性列表
   */
    properties: {
        propArray:{
            type:Array,
        }
    },
  /**
   * 组件的初始数据
   */
    data: {
        selectShow:false,//初始option不显示
        nowText:"请选择",//初始内容
        // animationData:{}//右边箭头的动画
    },
  /**
   * 组件的方法列表
   */
    methods: {
　　　//option的显示与否
        selectToggle:function(){
            this.setData({
                selectShow: !this.data.selectShow
            })
        },
        //设置内容
        setText:function(e){
            var nowData = this.properties.propArray;//当前option的数据是引入组件的页面传过来的，所以这里获取数据只有通过this.properties
            var nowIdx = e.target.dataset.id;//当前点击的索引
            var nowText = nowData[nowIdx-1].text;//当前点击的内容                       
            this.setData({
                selectShow: false,
                nowText:nowText                
            })
            this.triggerEvent("selectlistTap", e.target.dataset)
        }
    }
})