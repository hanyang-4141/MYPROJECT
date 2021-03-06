// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  var hehe
  const wxContext = cloud.getWXContext()
  await db.collection("users").where({
    _openid: wxContext.OPENID
  }).get().then(res => {
    hehe = res
    if (res.data.length == 0) {
      db.collection("users").add({
        data: {
          jsmember: false,
          nickName: event.nickName,
          avatarUrl: event.avatarUrl,
          gender: event.gender,
          country: event.country,
          province: event.province,
          city: event.city,
          _openid: wxContext.OPENID
        }
      })
    }

  })
  
  return {
    hehe,
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}