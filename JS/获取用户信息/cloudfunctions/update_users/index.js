// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  console.log(event);
  
  return await db.collection('users').where({
    _openid:event.openid
  }).update({
    data:{
      username:event.dissname,
      banzu:event.banzu
    }
  }),
  event
  }
