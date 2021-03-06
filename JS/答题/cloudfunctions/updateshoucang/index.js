// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
var myshoucang = db.collection("shoucang")
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext() 
  if(event.questionIndex == '0'){      //热机
    myshoucang.where({
      _openid:  wxContext.OPENID
    }).update({
      data:{
        热机安规: event.shoucang
      }
    })
  }else if(event.questionIndex == '1'){     //dianqi
    myshoucang.where({
      _openid:  wxContext.OPENID
    }).update({
      data:{
        电气安规: event.shoucang
      }
    })
  }
  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,   
  }
}