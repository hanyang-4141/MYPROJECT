const formatDate = date => {
  const day = date.getDate()
  const year = date.getFullYear()
  const month = date.getMonth()
  return [year, month+1, day].map(formatNum).join('-')
}
const formatTime = date => {
  const hours = date.getHours()
  const minutes = date.getMinutes()
  // const month = date.getMonth()
  return [hours, minutes].map(formatNum).join(':')
}

const formatNum = num => {
  num = num.toString()
  return num[1]?num : '0'+num
}
//洗牌算法，随机排序
const shuffle = arr=> {
  let m = arr.length;
  while (m){
      let index = Math.floor(Math.random() * m--);
      let cur = arr[m];
      arr[m] = arr[index];
      arr[index] = cur;
  }
  return arr;
}



module.exports = {
  formatTime: formatTime,
  formatDate: formatDate,
  shuffle:shuffle
}