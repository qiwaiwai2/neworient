export function formatDate (date) { // 时间格式化
    date = new Date(date)
    var y = date.getFullYear()
    var m = date.getMonth() + 1
    var d = date.getDate()
    var h = date.getHours()
    var m1 = date.getMinutes()
    var s = date.getSeconds()
    m = m < 10 ? ('0' + m) : m
    d = d < 10 ? ('0' + d) : d
    h = h < 10 ? ('0' + h) : h
    m1 = m1 < 10 ? ('0' + m1) : m1
    s = s < 10 ? ('0' + s) : s
    return y + '-' + m + '-' + d + ' ' + h + ':' + m1 + ':' + s
}
