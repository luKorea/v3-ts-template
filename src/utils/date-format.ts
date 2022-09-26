/*
 * @Author: korealu
 * @Date: 2022-02-08 09:29:11
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-08-12 11:01:45
 * @Description: file content
 * @FilePath: /pofi-admin/src/utils/date-format.ts
 */
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

const DATE_TIME_FORMAT = 'YYYY/MM/DD HH:mm:ss'

export function formatUtcString(
  utcString: string,
  format: string = DATE_TIME_FORMAT
) {
  return dayjs.utc(utcString).utcOffset(8).format(format)
}
export function formatDateString(utcString: string, format = 'YYYY/MM/DD') {
  return dayjs.utc(utcString).utcOffset(8).format(format)
}

export function getExpirationTime(utcString: string) {
  const nowTime = dayjs().valueOf()
  const lastTime = dayjs.utc(utcString).utcOffset(8).valueOf()
  if (nowTime >= lastTime) return '已过期'
  else {
    const date = dayjs(lastTime)
    return '剩余' + Number(date.diff(dayjs(nowTime), 'day')) + '天'
  }
}

// export function getRemainingDays(time: any) {
//   console.log(1)
// }

// export const reduceEditTime = (time: any) => {
//   const nowTime = dayjs().valueOf()
//   const endTime = dayjs(time).valueOf()
//   console.log(nowTime, endTime)
//   let res = false
//   if (nowTime < endTime) {
//     res = true
//   } else res = false
//   return res
// }
export const reduceEditTime = (start: any, end: any) => {
  const nowTime = dayjs().valueOf()
  const startTime = dayjs(start).valueOf()
  const endTime = dayjs(end).valueOf()
  let res = false
  if (nowTime > startTime && nowTime < endTime) {
    res = true
  } else res = false
  return res
}

// 活动时间小于当前时间
export const reduceTimeLessStartTime = (time: any) => {
  const nowTime = dayjs().valueOf()
  const endTime = dayjs(time).valueOf()
  console.log(nowTime, endTime)
  let res = false
  if (endTime < nowTime) {
    res = true
  } else res = false
  return res
}

// 映射活动状态
export const reduceActiveStatus = (start: any, end: any, status: any) => {
  let str = '已结束'
  if (!status) {
    str = '已关闭'
  } else {
    const nowTime = dayjs().valueOf()
    const startTime = dayjs(start).valueOf()
    const endTime = dayjs(end).valueOf()
    console.log(nowTime, startTime, endTime)
    // 未开始, 当前时间小于开始时间
    if (nowTime < startTime) {
      str = '未开始'
    } else if (endTime > nowTime) {
      str = '促销中'
    } else if (nowTime > endTime) {
      str = '已结束'
    }
  }
  return str
}

// 设置默认时间点59:59
export const setDefaultTime = () => {
  return dayjs().set('minute', 59).set('second', 59)
}
// 设置默认时间范围
export const setDefaultTimeRange = () => {
  return [dayjs(), dayjs().set('minute', 59).set('second', 59)]
}
