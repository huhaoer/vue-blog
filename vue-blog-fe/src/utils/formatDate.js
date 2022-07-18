// 传入时间戳，格式化日期
/**
 * 
 * @param {String | Number} timeStamp 传递的时间戳
 * @param {Boolean} isDetail 是否显示时间详细信息(时分秒)
 */
 export default function (timeStamp, isDetail = false) {
    const date = new Date(+timeStamp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 两位月份，用0填充
    const day = date.getDate().toString().padStart(2, '0');
    if (!isDetail) {
      return `${year}-${month}-${day}`;
    }
    const hour = date.getHours().toString().padStart(2, '0'); // 小时
    const minute = date.getMinutes().toString().padStart(2, '0'); // 分钟
    const second = date.getSeconds().toString().padStart(2, '0'); // 秒
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  }