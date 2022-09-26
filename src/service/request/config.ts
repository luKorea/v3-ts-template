/*
 * @Author: korealu
 * @Date: 2022-02-08 09:30:49
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-08-12 10:16:58
 * @Description: file content
 * @FilePath: /pofi-admin/src/service/request/config.ts
 */
// 1.方式一: 手动的切换不同的环境(不推荐)
// const BASE_URL = 'http://coderwhy.org/dev'
// const BASE_NAME = 'coderwhy'

// const BASE_URL = 'http://coderwhy.org/prod'
// const BASE_NAME = 'kobe'

// const BASE_URL = 'http://coderwhy.org/test'
// const BASE_NAME = 'james'

// 2.根据process.env.NODE_ENV区分
// 开发环境: development
// 生成环境: production
// 测试环境: test

let BASE_URL = ''
const TIME_OUT = 50000
const QINIU = 'http://up.qiniu.com'
const OSSURL = 'http://f3.pofiart.com' // 图片视频上传地址
const IMG_URL = 'https://f3.pofiart.com'
const EXCEL_BASE_URL = 'https://f2.pofiart.com/cms/excel'
const EXCEL_URL = EXCEL_BASE_URL + '/template.xlsx' // 兑换码Excel地址
const EXCEL_ROLL_URL = EXCEL_BASE_URL + '/BlackTemplate.xlsx' // 黑白名单Excel地址

if (process.env.NODE_ENV === 'development') {
  BASE_URL = '/api'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = '/api'
} else {
  BASE_URL = '/api'
}

export { BASE_URL, TIME_OUT, QINIU, OSSURL, IMG_URL, EXCEL_URL, EXCEL_ROLL_URL }
