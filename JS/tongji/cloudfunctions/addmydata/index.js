// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:'test-env-pi5z3'
})
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  
  console.log('cloud',event);
  // return event.result
  return    await db.collection("baohu").add({
    data:event
  }) ;
  
}