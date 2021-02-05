//index.js
const app = getApp()
let util = require('../../utils/util')
Page({
  data: {
    
  },
  onLoad: function (options) {
    console.log(util.formatTime(new Date));
    
  },  
})