// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:'test-env-pi5z3'
})
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  return await db.collection("baohu").where({
    _id:event._id
  })
  .update({
    data:{
      neirong: event.neirong,
      jizu:event.jizu,
      sqr: event.sqr,
      shenqingdate: event.shenqingdate,
      shenqingtime:event.shenqingtime,
      sqpzr: event.sqpzr,
      shenqingpizhundate:event.shenqingpizhundate,
      shenqingpizhuntime:event.shenqingpizhuntime,
      czr: event.czr,
      caozuodate:event.caozuodate,
      caozuotime:event.caozuotime,
      hfpzr: event.hfpzr,
      huifupizhundate:event.huifupizhundate,
      huifupizhuntime:event.huifupizhuntime,
      hfr: event.hfr,
      huifudate:event.huifudate,
      huifutime:event.huifutime,
    }
  })
}