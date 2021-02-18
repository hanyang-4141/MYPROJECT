// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:'environment-s8hfl'
})
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  
  console.log('cloud',event);
  // return event.result
  return    await db.collection("jobs").add({
    data:event
  }) ;
  
}