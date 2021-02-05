// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:'test-env-pi5z3'
})
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  // const wxContext = cloud.getWXContext()
  var res = null;
  if (event.selectedjizu == "全部"){
    
    if (event.isrecover == true){
      res = await db.collection("baohu").where({hfr:''}).get()
    }
    else{
      res = await db.collection("baohu").get()
    }
  }
  else{
    if (event.isrecover == true){
      res = await db.collection("baohu").where({
        jizu:event.selectedjizu,
        hfr:''
      }).get();
    }
    else{
      res = await db.collection("baohu").where({
        jizu:event.selectedjizu
      }).get();
    }


    
  }
  return res
}