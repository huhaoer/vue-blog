// 防抖函数
/**
 * @param fn 要防抖的函数
 * @param duration 规定时间内重新执行函数
 */
export default function (fn, duration = 100) {
  let timer = null;
  return (...arg) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...arg)
    }, duration);
  }
}

