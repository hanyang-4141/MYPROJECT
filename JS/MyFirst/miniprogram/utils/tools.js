const formatTime = date => {
  const day = date.getDate()
  const year = date.getFullYear()
  const month = date.getMonth()
  return [year, month, day].map(formatNum).join('-')
}
const formatNum = num => {
  num = num.toString()
  return num[1]?num : '0'+num
}
module.exports = {
  formatTime: formatTime
}