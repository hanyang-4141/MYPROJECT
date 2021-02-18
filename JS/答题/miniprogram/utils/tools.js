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
module.exports = {
  formatTime: formatTime,
  formatDate: formatDate
}