// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  // var res = await db.collection("shoucang").get().then(hehe=>{
  //   return hehe
  // }).catch(hehe=>{
  //   return hehe
  // })
  //不存在记录
  // if(res.data.length == 0){
  //   await db.collection("shoucang").add({
  //     data:{
  //       DanXuan: event.shoucang
  //     }

  //   })
  // }else{
    // var hehe
    // await db.collection("shoucang").update({
    //   data:{
    //     DanXuan: event.shoucang
    //   }
    // }).then(res=>{
    //   console.log('success', res);
    //   hehe = res
     
    // }).catch(res=>{
    //   console.log('fail',res);
    //   hehe = res
    //   db.collection("shoucang").add({
    //     data:{
    //       DanXuan: event.shoucang
    //     }
    //   }).then(res=>{
        
    //   })

    // })
    await db.collection("shoucang").where({
      _openid: wxContext.OPENID
    }).get().then(res=>{
        if(res.data.length == 0){
          db.collection("shoucang").add({
            data:{
              DanXuan: event.shoucang,
              _openid: wxContext.OPENID
            }
          })
        }else{
          db.collection("shoucang").where({
            _openid: wxContext.OPENID
          }).update({
            data:{
              DanXuan: event.shoucang,
            }
          })
        }
    })
  return{
    event
  }



  // return {
  //   res,
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
}