//index.js
const app = getApp()

Page({
  data: {
    elements:[
      {
        title:'单选题',
        name:'danxuan',
        icon:'question',
        color:'blue'
      },
      {
        title: '多选题',
        name: 'duoxuan',
        icon: 'like',
        color: 'red'
      },
      {
        title: '判断题',
        name: 'panduan',
        icon: 'copy',
        color: 'cyan'
      },
      {
        title: '考试',
        name: 'kaoshi',
        icon: 'settings',
        color: 'pink'
      },
    ]
  },

  onLoad: function() {
    
  }
})
