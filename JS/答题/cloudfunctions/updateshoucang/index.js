// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
var myshoucang = db.collection("shoucang")
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  
  // var exist = true
  var shoucang 
  var back
  if (event.type == 'init') {
    
  } else if (event.type == 'danxuan') {
    if(event.exist){
      await myshoucang.where({
        _openid: wxContext.OPENID
      }).update({
        data:{
          danxuan: event.shoucang,
        }
      })
    }else{
      await myshoucang.add({
        data:{
          danxuan: event.shoucang,
        }
      })
    }  
  } else if (event.type == 'duoxuan') {
    await myshoucang.where({
      _openid: wxContext.OPENID
    }).get().then(res => {
      if (res.data.length == 0) {
        myshoucang.add({
          data: {
            duoxuan: event.shoucang,
            _openid: wxContext.OPENID
          }
        })
      } else {
        myshoucang.where({
          _openid: wxContext.OPENID
        }).update({
          data: {
            duoxuan: event.shoucang,
          }
        })
      }
    })

  } else if (event.type == 'panduan') {
    await db.collection("shoucang").where({
      _openid: wxContext.OPENID
    }).get().then(res => {
      if (res.data.length == 0) {
        db.collection("shoucang").add({
          data: {
            panduan: event.shoucang,
            _openid: wxContext.OPENID
          }
        })
      } else {
        db.collection("shoucang").where({
          _openid: wxContext.OPENID
        }).update({
          data: {
            panduan: event.shoucang,
          }
        })
      }
    })
  }else if(event.type == 'test'){
    
      
      var heihei = await db.collection("shoucang")
      var test = heihei.where({
        _openid: wxContext.OPENID
      }).get()
      if(test.data.length == 0){
        
        gaga = await heihei.add({
          data:{
            test:1111
          }
        })
      }
    }
  return{
    event
  }


  shoucang = await  db.collection('shoucang').get()
  return {
    // gaga,
    // test,
    shoucang,
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
    // shoucang: await db.collection("shoucang").get()
  }
}