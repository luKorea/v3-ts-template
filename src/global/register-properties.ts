/*
 * @Author: korealu
 * @Date: 2022-02-08 09:29:12
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-08-09 15:31:24
 * @Description: file content
 * @FilePath: /pofi-admin/src/global/register-properties.ts
 */
import type { App } from 'vue'
import { mapSelectListTitle } from '@/utils'

import {
  formatUtcString,
  formatDateString,
  getExpirationTime
} from '@/utils/date-format'

export default function registerProperties(app: App) {
  const APP = app.config.globalProperties
  APP.$filters = {
    // 日期时间过滤器
    formatTime(value: string) {
      if (value) {
        return formatUtcString(value)
      }
    },
    formatDate(value: string) {
      return formatDateString(value)
    },
    getExpiration(value: string) {
      return getExpirationTime(value)
    },
    formatMoney(value: any) {
      return value ? (+value / 100).toFixed(2) + 'P币' : 0 + 'P币'
    },
    // 映射表格数据
    formatSelectTitle(type: any, list: any) {
      return mapSelectListTitle(type, list)
    }
  }
}
