// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var hehe = false
  await db.collection("users").where({
    _openid: wxContext.OPENID,
    jsmember: true
  }).get().then(res=>{
    if(res.data.length == 0){
      hehe = false
    }else{
      hehe = true
    }
  }).catch(res=>{
    hehe = false
  })
  
  return {
    event, 
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
    jsmember: hehe
  }
}